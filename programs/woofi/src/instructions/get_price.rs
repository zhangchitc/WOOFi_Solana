use anchor_lang::prelude::*;

use crate::{constants::*, errors::ErrorCode, state::wooracle::*};

use pyth_solana_receiver_sdk::price_update::PriceUpdateV2;

#[derive(Accounts)]
pub struct GetPrice<'info> {
    #[account(
        has_one = price_update,
        has_one = quote_price_update,
    )]
    pub oracle: Account<'info, WOOracle>,
    pub price_update: Account<'info, PriceUpdateV2>,
    pub quote_price_update: Account<'info, PriceUpdateV2>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, Copy)]
pub struct GetPriceResult {
    pub price_out: u128,
    pub feasible_out: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, Copy)]
pub struct GetStateResult {
    pub price_out: u128,
    pub spread: u64,
    pub coeff: u64,
    pub feasible_out: bool,
}

pub fn handler(ctx: Context<GetPrice>) -> Result<GetPriceResult> {
    let oracle = &ctx.accounts.oracle;
    let price_update = &mut ctx.accounts.price_update;
    let quote_price_update = &mut ctx.accounts.quote_price_update;

    get_price_impl(oracle, price_update, quote_price_update)
}

pub fn get_price_impl<'info>(
    oracle: &Account<'info, WOOracle>,
    price_update: &mut Account<'info, PriceUpdateV2>,
    quote_price_update: &mut Account<'info, PriceUpdateV2>,
) -> Result<GetPriceResult> {
    let now = Clock::get()?.unix_timestamp;

    let pyth_result = price_update.get_price_no_older_than(
        &Clock::get()?,
        oracle.maximum_age,
        &oracle.feed_account.key().to_bytes(),
    )?;

    let quote_price_result = quote_price_update.get_price_no_older_than(
        &Clock::get()?,
        oracle.maximum_age,
        &oracle.quote_feed_account.key().to_bytes(),
    )?;

    let base_price = pyth_result.price as u128;
    let quote_price = quote_price_result.price as u128;
    let quote_decimal = quote_price_result.exponent.abs().try_into().unwrap();
    let clo_price = base_price
        .checked_mul(10_u128.pow(quote_decimal))
        .unwrap()
        .checked_div(quote_price)
        .unwrap();

    let wo_price = oracle.price;
    let wo_timestamp = oracle.updated_at;
    let bound = oracle.bound as u128;

    let wo_feasible = clo_price != 0 && now <= (wo_timestamp + oracle.stale_duration);
    let wo_price_in_bound = clo_price != 0
        && ((clo_price * (TENPOW18U128 - bound)) / TENPOW18U128 <= wo_price
            && wo_price <= (clo_price * (TENPOW18U128 + bound)) / TENPOW18U128);
    // TODO: check upper and low bound

    let price_out: u128;
    let feasible_out: bool;
    if wo_feasible {
        price_out = wo_price;
        feasible_out = wo_price_in_bound;
    } else {
        if oracle.outer_preferred {
            price_out = clo_price;
        } else {
            price_out = 0;
        }
        feasible_out = price_out != 0;
    }

    if feasible_out {
        if price_out < oracle.range_min {
            return Err(ErrorCode::WooOraclePriceRangeMin.into());
        }
        if price_out > oracle.range_max {
            return Err(ErrorCode::WooOraclePriceRangeMax.into());
        }
    }
    // TODO Prince: consider, if not feasible, just return ErrorCode here

    Ok(GetPriceResult {
        price_out,
        feasible_out,
    })
}

pub fn get_state_impl<'info>(
    oracle: &Account<'info, WOOracle>,
    price_update: &mut Account<'info, PriceUpdateV2>,
    quote_price_update: &mut Account<'info, PriceUpdateV2>,
) -> Result<GetStateResult> {
    let price_result = get_price_impl(oracle, price_update, quote_price_update)?;
    Ok(GetStateResult {
        price_out: price_result.price_out,
        spread: oracle.spread,
        coeff: oracle.coeff,
        feasible_out: price_result.feasible_out,
    })
}