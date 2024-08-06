/*

░██╗░░░░░░░██╗░█████╗░░█████╗░░░░░░░███████╗██╗
░██║░░██╗░░██║██╔══██╗██╔══██╗░░░░░░██╔════╝██║
░╚██╗████╗██╔╝██║░░██║██║░░██║█████╗█████╗░░██║
░░████╔═████║░██║░░██║██║░░██║╚════╝██╔══╝░░██║
░░╚██╔╝░╚██╔╝░╚█████╔╝╚█████╔╝░░░░░░██║░░░░░██║
░░░╚═╝░░░╚═╝░░░╚════╝░░╚════╝░░░░░░░╚═╝░░░░░╚═╝

*
* MIT License
* ===========
*
* Copyright (c) 2020 WooTrade
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

use crate::state::*;
use anchor_lang::prelude::*;

use crate::constants::*;

use pyth_solana_receiver_sdk::price_update::PriceUpdateV2;

#[derive(Accounts)]
pub struct CreateOraclePyth<'info> {
    #[account(
        init,
        payer = admin,
        space = Oracle::LEN,
        seeds = [
            PYTHORACLE_SEED.as_bytes(),
            feed_account.key().as_ref(),
            price_update.key().as_ref()
            ],
        bump,
    )]
    pythoracle: Account<'info, Oracle>,
    #[account(
        init,
        payer = admin,
        space = WOOracle::LEN,
        seeds = [
            WOORACLE_SEED.as_bytes(),
            feed_account.key().as_ref(),
            price_update.key().as_ref()
            ],
        bump,
    )]
    wooracle: Account<'info, WOOracle>,
    #[account(mut)]
    admin: Signer<'info>,
    system_program: Program<'info, System>,
    /// CHECK: This is the Pyth feed account
    feed_account: AccountInfo<'info>,
    // Add this account to any instruction Context that needs price data.
    // Warning: 
    // users must ensure that the account passed to their instruction is owned by the Pyth pull oracle program.
    // Using Anchor with the Account<'info, PriceUpdateV2> type will automatically perform this check. 
    // However, if you are not using Anchor, it is your responsibility to perform this check.
    pub price_update: Account<'info, PriceUpdateV2>,
}

pub fn handler(ctx: Context<CreateOraclePyth>) -> Result<()> {
    ctx.accounts.pythoracle.oracle_type = OracleType::Pyth;
    ctx.accounts.pythoracle.authority = ctx.accounts.admin.key();
    ctx.accounts.pythoracle.feed_account = ctx.accounts.feed_account.key();
    ctx.accounts.pythoracle.price_update = ctx.accounts.price_update.key();

    let price_update = &mut ctx.accounts.price_update;
    // get_price_no_older_than will fail if the price update is more than 30 seconds old
    // TODO Prince: move the 30s to config later
    // TODO Prince: need take action here, the sponsored feed's update time is not stable, change to 60s for now.
    let maximum_age: u64 = 60;
    // get_price_no_older_than will fail if the price update is for a different price feed.
    // This string is the id of the BTC/USD feed. See https://pyth.network/developers/price-feed-ids for all available ids.
    // let feed_id = get_feed_id_from_hex(ctx.accounts.feed_account.key().to_string().as_str())?;
    let price = price_update.get_price_no_older_than(&Clock::get()?, maximum_age, &ctx.accounts.feed_account.key().to_bytes())?;
    // Sample output:
    // The price is (7160106530699 ± 5129162301) * 10^-8
    // msg!("The price is ({} ± {}) * 10^{}", price.price, price.conf, price.exponent);

    ctx.accounts.pythoracle.decimals = price.exponent.abs().try_into().unwrap();
    ctx.accounts.pythoracle.round = price.price as i128;
    ctx.accounts.pythoracle.updated_at = price.publish_time;

    // Default set prefer clo to true
    ctx.accounts.pythoracle.outer_preferred = true;

    ctx.accounts.wooracle.authority = ctx.accounts.admin.key();
    ctx.accounts.wooracle.oracle = ctx.accounts.pythoracle.key();
    ctx.accounts.wooracle.stale_duration = DEFAULT_STALE_DURATION;
    // set default bound to 1e16 means 1%
    ctx.accounts.wooracle.bound = DEFAULT_BOUND;

    Ok(())
}