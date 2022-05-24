import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from 'ethers';
import { Web3Action, Web3ActionTypes } from "./action";

export const web3LoadSuccessful = ({ web3 }): Web3ActionTypes => ({
  type: Web3Action.WEB3_SUCCESS,
  web3
});

export const web3LoadFailed = (error: string): Web3ActionTypes => ({ type: Web3Action.WEB3_FAILURE, error });

export const LoadWeb3 = () => {
  return web3LoadSuccessful({ web3: ethers.providers.getDefaultProvider('https://evm.cronos.org/') });
} 

// export const loadWeb3 = createAsyncThunk(
//   'loadWeb3',
//   (_, thunkAPI) => {
//     thunkAPI.dispatch({ type: Web3Action.WEB3_LOADING });
//     try {
//       // bip39.setDefaultWordlist('english');
//       // const mnemonic = bip39.generateMnemonic();
//       // const hdWalletProvider = new HDWalletProvider({
//       //   mnemonic: {
//       //     phrase: mnemonic
//       //   },
//       //   providerOrUrl: "https://cronos-testnet-3.crypto.org:8545",
//       //   pollingInterval: 8000,
//       //   numberOfAddresses: 1
//       // });
//       const web3 = ethers.providers.getDefaultProvider();

//       // const accounts = await web3.eth.getAccounts();
//       // const networkId = await web3.eth.net.getId();
//       thunkAPI.dispatch(web3LoadSuccessful({ web3 }));
//     } catch (error) {
//       thunkAPI.dispatch(web3LoadFailed(error as string));
//     };
//   }
// );