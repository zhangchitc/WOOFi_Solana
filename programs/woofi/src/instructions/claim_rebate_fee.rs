use crate::{events::ClaimRebateFeeEvent, state::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

use crate::{constants::*, errors::ErrorCode, util::*};

#[derive(Accounts)]
pub struct ClaimRebateFee<'info> {
    pub quote_token_mint: Account<'info, Mint>,

    pub rebate_authority: Signer<'info>,

    #[account(
        seeds = [
          WOOPOOL_SEED.as_bytes(),
          quote_token_mint.key().as_ref(),
          quote_token_mint.key().as_ref(),
        ],
        bump,
        constraint = woopool_quote.token_mint == quote_token_mint.key(),
    )]
    pub woopool_quote: Box<Account<'info, WooPool>>,

    #[account(mut,
        has_one = rebate_authority,
        has_one = woopool_quote,
        seeds = [
          REBATEPOOL_SEED.as_bytes(),
          rebate_authority.key().as_ref(),
          woopool_quote.key().as_ref(),
          quote_token_mint.key().as_ref()
        ],
        bump,
        constraint = rebate_pool.enabled,
        constraint = rebate_pool.token_mint == quote_token_mint.key(),
        constraint = rebate_pool.authority == woopool_quote.authority,
    )]
    pub rebate_pool: Account<'info, RebatePool>,

    #[account(
        address = rebate_pool.token_vault,
        constraint = rebate_vault.mint == quote_token_mint.key(),
      )]
    pub rebate_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = claim_fee_to_account.mint == quote_token_mint.key())]
    pub claim_fee_to_account: Box<Account<'info, TokenAccount>>,

    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<ClaimRebateFee>, claim_amount: u128) -> Result<()> {
    let rebate_pool = &mut ctx.accounts.rebate_pool;
    let rebate_vault = &ctx.accounts.rebate_vault;
    let claim_fee_to_account = &ctx.accounts.claim_fee_to_account;

    require!(
        rebate_vault.amount as u128 >= claim_amount,
        ErrorCode::RebateFeeNotEnough
    );

    rebate_pool.sub_rebate_fee(claim_amount)?;

    transfer_from_rebate_vault_to_owner(
        rebate_pool,
        rebate_vault,
        claim_fee_to_account,
        &ctx.accounts.token_program,
        claim_amount as u64,
    )?;

    emit!(ClaimRebateFeeEvent {
        rebate_authority: ctx.accounts.rebate_authority.key(),
        woopool: ctx.accounts.woopool_quote.key(),
        rebate_pool: rebate_pool.key(),
        rebate_vault: rebate_vault.key(),
        claim_fee_to_account: claim_fee_to_account.key(),
        claim_amount,
    });

    Ok(())
}