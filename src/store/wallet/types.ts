import { ethers } from 'ethers';

export interface Wallet {
  id: string
  name: string
  password: string
  wallet: ethers.Wallet
}

export interface WalletState {
  readonly locked: boolean;
  readonly loading: boolean;
  readonly wallet?: Wallet;
  readonly error?: string;
}