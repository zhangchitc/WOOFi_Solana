use std::cmp::max;

use anchor_lang::prelude::*;

use crate::{
    constants::*,
    state::*,
    instructions::*,
    util::*
};

use pyth_solana_receiver_sdk::price_update::PriceUpdateV2;

#[derive(Accounts)]
pub struct TryQuery<'info> {
    #[account(
        constraint = oracle_from.key() == woopool_from.oracle
    )]
    oracle_from: Account<'info, Oracle>,
    #[account(
        seeds = [
            WOORACLE_SEED.as_bytes(),
            oracle_from.feed_account.as_ref(),
            oracle_from.price_update_account.as_ref()
        ],
        bump,
        constraint = wooracle_from.key() == woopool_from.wooracle
    )]
    wooracle_from: Account<'info, WOOracle>,
    woopool_from: Box<Account<'info, WooPool>>,

    #[account(
        constraint = oracle_to.key() == woopool_to.oracle
    )]
    oracle_to: Account<'info, Oracle>,
    #[account(
        seeds = [
            WOORACLE_SEED.as_bytes(),
            oracle_to.feed_account.as_ref(),
            oracle_to.price_update_account.as_ref()
        ],
        bump,
        constraint = wooracle_to.key() == woopool_to.wooracle
    )]
    wooracle_to: Account<'info, WOOracle>,
    woopool_to: Box<Account<'info, WooPool>>,

    // Add this account to any instruction Context that needs price data.
    // Warning: 
    // users must ensure that the account passed to their instruction is owned by the Pyth pull oracle program.
    // Using Anchor with the Account<'info, PriceUpdateV2> type will automatically perform this check. 
    // However, if you are not using Anchor, it is your responsibility to perform this check.
    pub price_update: Account<'info, PriceUpdateV2>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, Copy)]
pub struct QueryResult {
    pub to_amount: u128,
    pub swap_fee_amount: u128,
    pub swap_fee: u128,
}

pub fn handler(ctx: Context<TryQuery>, from_amount: u128) -> Result<QueryResult> {

    let price_update = &mut ctx.accounts.price_update;

    let oracle_from = &mut ctx.accounts.oracle_from;
    let wooracle_from = &ctx.accounts.wooracle_from;
    let woopool_from = &ctx.accounts.woopool_from;

    let mut state_from = get_price::get_state_impl(oracle_from, wooracle_from, price_update)?;

    let oracle_to = &mut ctx.accounts.oracle_to;
    let wooracle_to = &ctx.accounts.wooracle_to;
    let woopool_to = &ctx.accounts.woopool_to;

    let mut state_to = get_price::get_state_impl(oracle_to, wooracle_to, price_update)?;

    let spread = max(state_from.spread, state_to.spread);
    let fee_rate = max(woopool_from.fee_rate, woopool_to.fee_rate);

    state_from.spread = spread;
    state_to.spread = spread;

    let decimals_from = Decimals::new(
        oracle_from.decimals as u32, 
        DEFAULT_QUOTE_DECIMALS,
        woopool_from.base_decimals as u32);

    let swap_fee_amount = checked_mul_div(from_amount, fee_rate as u128, TE5U128)?;
    let swap_fee = checked_mul_div(swap_fee_amount, state_from.price_out, decimals_from.price_dec as u128)?;
    let remain_amount = from_amount.checked_sub(swap_fee_amount).unwrap();
    
    let (remain_usd_amount, from_new_price) = swap_math::calc_usd_amount_sell_base(
        remain_amount, 
        woopool_from, 
        &decimals_from, 
        &state_from)?;
    
    // TODO Prince: we currently subtract fee on coin, can enable below when we have base usd
    // let (usd_amount, _) = swap_math::calc_usd_amount_sell_base(
    //     from_amount, 
    //     woopool_from, 
    //     &decimals_from, 
    //     wooracle_from.coeff, 
    //     spread, 
    //     &price_from)?;
    
    // let swap_fee = checked_mul_div(usd_amount, fee_rate as u128, TE5U128)?;
    // let remain_amount = usd_amount.checked_sub(swap_fee).unwrap();

    let decimals_to = Decimals::new(
        oracle_to.decimals as u32, 
        DEFAULT_QUOTE_DECIMALS,
        woopool_to.base_decimals as u32);

    let (to_amount, to_new_price) = swap_math::calc_base_amount_sell_usd(
        remain_usd_amount, 
        woopool_to, 
        &decimals_to, 
        &state_to)?;
    
    Ok(QueryResult {
        to_amount,
        swap_fee_amount,
        swap_fee
    })
}