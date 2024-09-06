import * as anchor from "@coral-xyz/anchor";
import * as borsh from "borsh";
import { BN } from "@coral-xyz/anchor";
import { WoofiClient } from "../src/client";
import { WoofiContext } from "../src";
import { WOOFI_TOKENS } from '../src/utils/constants'
import { ConfirmOptions, Transaction, TransactionResponse } from "@solana/web3.js";

describe("woofi_sdk", async () => {

  const getReturnLog = (confirmedTransaction: TransactionResponse): (string | Buffer)[] => {
    const prefix = "Program return: ";
    let log: string = confirmedTransaction.meta?.logMessages?.find((ret: string) =>
      ret.startsWith(prefix)
    )!;
    log = log.slice(prefix.length);
    const [key, data] = log.split(" ", 2);
    const buffer = Buffer.from(data, "base64");
    return [key, data, buffer];
  };

  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const context = WoofiContext.from(provider.connection, provider.wallet);

  it("try_query", async ()=> {
    const result = await WoofiClient.tryQuery(
      context,
      new BN(100000),
      WOOFI_TOKENS['SOL'],
      WOOFI_TOKENS['USDC']
    )

    console.log('TryQuery to_amount:'+ result.to_amount);
    console.log('TryQuery swap_fee:'+ result.swap_fee);
  })

  it("try_query_on_chain", async ()=> {
    const ix = await WoofiClient.tryQueryOnChain(
      context,
      new BN(100000),
      WOOFI_TOKENS['SOL'],
      WOOFI_TOKENS['USDC']
    )

    const tx = new Transaction();
    tx.add(ix);
    const sig = await provider.sendAndConfirm(tx, [], { commitment: "confirmed" });

    let t = await provider.connection.getTransaction(sig, {
      commitment: "confirmed",
    })!;

    const [key, data, buffer] = getReturnLog(t!);
    const reader = new borsh.BinaryReader(buffer as Buffer);
    const to_amount = reader.readU128().toNumber();
    const swap_fee = reader.readU128().toNumber();

    console.log('TryQuery to_amount:', to_amount);
    console.log('TryQuery swap_fee:', swap_fee);
  })
});
