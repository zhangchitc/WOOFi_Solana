use anchor_lang::prelude::*;

use crate::state::woopool::*;

#[derive(Accounts)]
pub struct SetPoolState<'info> {
    #[account(mut, has_one = fee_authority)]
    pub woopool: Account<'info, WooPool>,

    pub fee_authority: Signer<'info>,
}

pub fn set_pool_state_handler(ctx: Context<SetPoolState>, fee_rate: u16, cap_balance: u128, tgt_balance: u128, shift_max: u16) -> Result<()> {
    ctx.accounts.woopool.set_pool_state(
        fee_rate,
        cap_balance,
        tgt_balance,
        shift_max
    )?;

    Ok(())
}

pub fn set_fee_rate_handler(ctx: Context<SetPoolState>, fee_rate: u16) -> Result<()> {
    Ok(ctx.accounts.woopool.set_fee_rate(fee_rate)?)
}

pub fn set_cap_balance_handler(ctx: Context<SetPoolState>, cap_balance: u128) -> Result<()> {
    Ok(ctx.accounts.woopool.set_cap_balance(cap_balance)?)
}

pub fn set_tgt_balance_handler(ctx: Context<SetPoolState>, tgt_balance: u128) -> Result<()> {
    Ok(ctx.accounts.woopool.set_tgt_balance(tgt_balance)?)
}

pub fn set_shift_max_handler(ctx: Context<SetPoolState>, shift_max: u16) -> Result<()> {
    Ok(ctx.accounts.woopool.set_shift_max(shift_max)?)
}
