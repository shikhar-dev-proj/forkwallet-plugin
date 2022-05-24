import { Reducer } from "@reduxjs/toolkit";
import { WalletAction, WalletActionTypes } from "./action";
import { WalletState } from "./types";

export const WalletInitialState: WalletState = {
  loading: true,
  locked: true
};

export const walletReducer: Reducer<WalletState, WalletActionTypes> = (state: WalletState = WalletInitialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case WalletAction.WALLET_CREATE:
      return {
        ...state,
        loading: true
      }
    case WalletAction.WALLET_CREATED:
      return {
        ...state,
        loading: false,
        locked: false,
        wallet: action.wallet
      }
    default:
      return state
  }
}