import { BN } from "@coral-xyz/anchor";
import { NATIVE_MINT, createAssociatedTokenAccountInstruction, createSyncNativeInstruction, getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { SwapParams, swapIx } from "./instructions/swap-ix"
import { WoospmmtresContext } from "./context";
import { TryQuerySwapParams, tryQuerySwapIx } from "./instructions/try-query-swap-ix";
import { WOOSPMM_TOKENS, TOKEN_MINTS, CHAINLINK_FEED_ACCOUNT, WOOPOOL_VAULTS } from "./utils/constants";
import { generatePoolParams, QueryResult, tryCalculate } from "./utils/contract";

export class WoospmmtresClient {

  public static async tryQuery(
    ctx: WoospmmtresContext,
    fromAmount: BN,
    fromToken: WOOSPMM_TOKENS,
    toToken: WOOSPMM_TOKENS
  ): Promise<QueryResult> {
    return tryCalculate(
      ctx, 
      fromAmount,
      new PublicKey(TOKEN_MINTS[fromToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[fromToken]),
      new PublicKey(TOKEN_MINTS[toToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[toToken])
    )
  }

  public static async tryQueryOnChain(
    ctx: WoospmmtresContext,
    fromAmount: BN,
    fromToken: WOOSPMM_TOKENS,
    toToken: WOOSPMM_TOKENS
  ): Promise<TransactionInstruction> {
    return WoospmmtresClient.tryQueryOnChainInner(
      ctx, 
      fromAmount,
      new PublicKey(TOKEN_MINTS[fromToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[fromToken]),
      new PublicKey(TOKEN_MINTS[toToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[toToken])
    )
  }

  private static async tryQueryOnChainInner(
    ctx: WoospmmtresContext,
    amount: BN,
    fromTokenMint: PublicKey,
    fromOracleFeedAccount: PublicKey,
    toTokenMint: PublicKey,
    toOracleFeedAccount: PublicKey,
  ): Promise<TransactionInstruction> {
    const fromPoolParams = await generatePoolParams(fromOracleFeedAccount, fromTokenMint, ctx.program);
    const toPoolParams = await generatePoolParams(toOracleFeedAccount, toTokenMint, ctx.program);

    const tryQuerySwapParams: TryQuerySwapParams = {
      amount,
      oracleFrom: fromPoolParams.oracle,
      wooracleFrom: fromPoolParams.wooracle,
      woopoolFrom: fromPoolParams.woopool,
      oracleTo: toPoolParams.oracle,
      wooracleTo: toPoolParams.wooracle,
      woopoolTo: toPoolParams.woopool
    }

    const tx = tryQuerySwapIx(ctx.program, tryQuerySwapParams);
    return tx;
  }

  public static async swap(
    ctx: WoospmmtresContext,
    fromAmount: BN,
    fromToken: WOOSPMM_TOKENS,
    toToken: WOOSPMM_TOKENS
  ): Promise<TransactionInstruction[]> {
    return WoospmmtresClient.swapInner(
      ctx,
      fromAmount,
      new PublicKey(TOKEN_MINTS[fromToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[fromToken]),
      new PublicKey(WOOPOOL_VAULTS[fromToken]),
      new PublicKey(TOKEN_MINTS[toToken]),
      new PublicKey(CHAINLINK_FEED_ACCOUNT[toToken]),
      new PublicKey(WOOPOOL_VAULTS[toToken])
    )
  }

  // Example usage: swap(ctx, amount, TOKEN_MINTS["SOL"], CHAINLINK_FEED_ACCOUNT["SOL"], WOOPOOL_VAULTS["SOL"],
  // TOKEN_MINTS["USDC"], CHAINLINK_FEED_ACCOUNT["USDC"], WOOPOOL_VAULTS["USDC"])
  /**
   * Swap instruction builder method with resolveATA & additional checks.
   * @param ctx - WoospmmtresContext object for the current environment.
   * @param amount - {@link SwapAsyncParams}
   * @returns
   */
  private static async swapInner(
    ctx: WoospmmtresContext,
    amount: BN,
    fromTokenMint: PublicKey,
    fromOracleFeedAccount: PublicKey,
    fromPoolVault: PublicKey,
    toTokenMint: PublicKey,
    toOracleFeedAccount: PublicKey,
    toPoolVault: PublicKey
  ): Promise<TransactionInstruction[]> {
    const instructions: TransactionInstruction[] = [];

    const fromPoolParams = await generatePoolParams(fromOracleFeedAccount, fromTokenMint, ctx.program);
    const toPoolParams = await generatePoolParams(toOracleFeedAccount, toTokenMint, ctx.program);

    const tokenOwnerAccountFrom = getAssociatedTokenAddressSync(fromTokenMint, ctx.wallet.publicKey);
    const tokenOwnerAccountTo = getAssociatedTokenAddressSync(toTokenMint, ctx.wallet.publicKey);

    // Create an instruction to create the tokenOwnerAccountFrom if it does not exist
    const createFromAccountInstruction = createAssociatedTokenAccountInstruction(
      ctx.wallet.publicKey,
      tokenOwnerAccountFrom,
      ctx.wallet.publicKey,
      fromTokenMint
    )

    // Create an instruction to create the tokenOwnerAccountTo if it does not exist
    const createToAccountInstruction = createAssociatedTokenAccountInstruction(
      ctx.wallet.publicKey,
      tokenOwnerAccountTo,
      ctx.wallet.publicKey,
      toTokenMint
    )

    // Check if the tokenOwnerAccountFrom exists
    try {
      let tokenAccount = await getAccount(
        ctx.connection,
        tokenOwnerAccountFrom,
        'confirmed'
      )
    } catch (e) {
      // If the account does not exist, add the create account instruction to the transaction
      instructions.push(createFromAccountInstruction)
    }

    // Check if the tokenOwnerAccountTo exists
    try {
      let tokenAccount = await getAccount(
        ctx.connection,
        tokenOwnerAccountTo,
        'confirmed'
      )
    } catch (e) {
      // If the account does not exist, add the create account instruction to the transaction
      instructions.push(createToAccountInstruction)
    }

    // Woo router logic, handle sol and wsol, do the transfer
    if (fromTokenMint.equals(NATIVE_MINT)) {
      instructions.push(
        // trasnfer SOL to WSOL into ata account
        SystemProgram.transfer({
          fromPubkey: ctx.wallet.publicKey,
          toPubkey: tokenOwnerAccountFrom,
          lamports: amount.toNumber(),
        }),
        // sync wrapped SOL balance
        createSyncNativeInstruction(tokenOwnerAccountFrom)
      );
    }

    // TODO Prince: if (toTokenMint == NATIVE_MINT), need double check the wsol to sol logic
    // consider have a flag to do the transfer

    const swapParams : SwapParams = {
      amount,
      owner: ctx.wallet.publicKey,
      oracleFrom: fromPoolParams.oracle,
      wooracleFrom: fromPoolParams.wooracle,
      woopoolFrom: fromPoolParams.woopool,
      tokenOwnerAccountFrom,
      tokenVaultFrom: fromPoolVault,
      oracleTo: toPoolParams.oracle,
      wooracleTo: toPoolParams.wooracle,
      woopoolTo: toPoolParams.woopool,
      tokenOwnerAccountTo,
      tokenVaultTo: toPoolVault
    }

    const tx = await swapIx(ctx.program, swapParams);
    instructions.push(tx);
    return instructions;
  }
}