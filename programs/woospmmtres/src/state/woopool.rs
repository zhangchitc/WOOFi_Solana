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

use anchor_lang::prelude::*;
use crate::{
    constants::*,
    errors::ErrorCode, wooracle,
};

#[account]
pub struct WooPool {
    pub woopool_bump: [u8; 1],  // 1

    pub fee_authority: Pubkey,  // 32

    pub cloracle: Pubkey,       // 32

    pub wooracle: Pubkey,       // 32
    // Stored as hundredths of a basis point
    // u16::MAX corresponds to ~6.5%
    // 1 in 100_000; 10 = 1bp = 0.01%; max = 65535
    // Max fee rate supported is u16::MAX around 65.5%.
    pub fee_rate: u16,          // 2

    // balance reserve
    pub reserve: u128,          // 16

    // maximum balance cap in token amount
    pub cap_balance: u128,              // 16

    // 1 in 100000, 0.1 bps  max = 65535
    pub shift_max: u16,             // 2

    // target balance for swap fee
    pub tgt_balance: u128,              // 16

    pub protocol_fee_owed: u64, // 8

    pub token_mint: Pubkey,     // 32

    pub token_vault: Pubkey,    // 32
}

impl WooPool {
    pub const LEN : usize = 8 + (1+ 32 + 32 + 32 + 2 + 16 + 16 + 2 + 16 + 8 + 32 + 32);

    pub fn initialize(
        &mut self,
        bump: u8,
        cloracle: Pubkey,
        wooracle: Pubkey,
        fee_authority: Pubkey,
        token_mint: Pubkey,
        token_vault: Pubkey,
    ) -> Result<()> {
        self.woopool_bump = [bump];

        self.cloracle = cloracle;
        self.wooracle = wooracle;
        self.fee_authority = fee_authority;

        self.fee_rate = 0;
        self.reserve = 0;
        self.cap_balance = 0;
        self.tgt_balance = 0;
        self.shift_max = 0;

        self.token_mint = token_mint;
        self.token_vault = token_vault;

        Ok(())
    }

    pub fn set_pool_state(&mut self, fee_rate: u16, cap_balance: u128, tgt_balance: u128, shift_max: u16) -> Result<()> {
        if 2 * tgt_balance > cap_balance {
            return Err(ErrorCode::CapBalanceSmallerThanTargetBalance.into());
        }

        self.fee_rate = fee_rate;
        self.cap_balance = cap_balance;
        self.tgt_balance = tgt_balance;
        self.shift_max = shift_max;
        
        Ok(())
    }

    pub fn set_fee_rate(&mut self, fee_rate: u16) -> Result<()> {
        if fee_rate > MAX_FEE_RATE {
            return Err(ErrorCode::FeeRateMaxExceeded.into());
        }
        self.fee_rate = fee_rate;

        Ok(())
    }

    pub fn set_cap_balance(&mut self, cap_balance: u128) -> Result<()> {
        if 2 * self.tgt_balance > cap_balance {
            return Err(ErrorCode::CapBalanceSmallerThanTargetBalance.into());
        }
        self.cap_balance = cap_balance;

        Ok(())
    }

    pub fn set_tgt_balance(&mut self, tgt_balance: u128) -> Result<()> {
        if 2 * tgt_balance > self.cap_balance {
            return Err(ErrorCode::CapBalanceSmallerThanTargetBalance.into());
        }
        self.tgt_balance = tgt_balance;

        Ok(())
    }

    pub fn set_shift_max(&mut self, shift_max: u16) -> Result<()> {
        self.shift_max = shift_max;

        Ok(())
    }
}