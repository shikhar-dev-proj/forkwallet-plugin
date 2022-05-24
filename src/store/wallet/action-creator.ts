import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from 'ethers';
import { WalletAction, WalletActionTypes } from "./action";
import * as bip39 from 'bip39';
import HDWalletProvider from "@truffle/hdwallet-provider";
import { Wallet } from "./types";

export const CreateWalletFromMnemonic = (name: string, password: string, mnemonic: string): WalletActionTypes => {
  const chainRPCUrl = 'https://evm.cronos.org';
  const testnetRPCUrl = 'https://cronos-testnet-3.crypto.org:8545'
  const provider = ethers.providers.getDefaultProvider(chainRPCUrl);
  const createdWallet = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = createdWallet.connect(provider);
  return {
    type: WalletAction.WALLET_CREATED,
    wallet: {
      name,
      password,
      provider,
      wallet
    }
  }
}

// export const createWallet = createAsyncThunk(
//   'createWallet',
//   (name: string, password: string, thunkAPI) => {
//     try {
//       bip39.setDefaultWordlist('english')
//       const mnemonic = bip39.generateMnemonic()
//     //   const hdWalletProvider = new HDWalletProvider({
//     //     mnemonic: {
//     //       phrase: mnemonic
//     //     },
//     //     providerOrUrl: "https://cronos-testnet-3.crypto.org:8545",
//     //     pollingInterval: 8000,
//     //     numberOfAddresses: 1
//     //   });
    
//       const wallet = ethers.Wallet.fromMnemonic(mnemonic)


      

//       // const accounts = await web3.eth.getAccounts();
//       // const networkId = await web3.eth.net.getId();
//       thunkAPI.dispatch(web3LoadSuccessful({ web3 }));
//     } catch (error) {
//       thunkAPI.dispatch(web3LoadFailed(error as string));
//     };
//   }
// );