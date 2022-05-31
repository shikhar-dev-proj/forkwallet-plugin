import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import extension from 'extensionizer';
import { decrypt, encrypt } from '../utils/crypto';
import * as bip39 from 'bip39';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { usePassword } from './usePassword';

const WALLET_KEY = 'wallet'
const MNEMONIC_KEY = 'mnemonic'
const WALLET_LAST_INDEX_KEY = 'lastIndex'
const ENCODING = 'hex'
const DERIVATION_PATH = "m/44'/60'/0'/0";
const rpcURL = 'https://mainnet.infura.io/v3/';

export type InitWalletParams = {
  mnemonic: string;
  name: string;
  password: string;
}

export type ForkWallet = {
  name: string;
  index: number;
  wallet: ethers.Wallet
}

const walletState = atom<ForkWallet | undefined>({
  key: 'walletState',
  default: undefined,
});

export type UseWalletReturnType = {
  wallet: ForkWallet | undefined;
  hasWallet: boolean;
}



export function useWallet(): UseWalletReturnType {
  const password = usePassword()
  const [wallet, setWallet] = useRecoilState(walletState)
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    extension.storage.local.get([WALLET_KEY], (data) => {
      const encryptedWallet = data[WALLET_KEY]
      console.log('encrypted wallet ... : ', encryptedWallet);
      if (!!encryptedWallet) {
        setHasWallet(true);
      } else {
        setHasWallet(false);
      }
      if (!!encryptedWallet && !!password) {
        console.log('encrypted wallet and password present ... :', encryptedWallet, password);
        try {
          const walletStr = decrypt(encryptedWallet, password)
          console.log('decrypted wallet str ... : ', walletStr);
          const decryptedWallet = JSON.parse(walletStr);
          console.log('decrypted wallet ... : ', decryptedWallet);
          setWallet(decryptedWallet);
        } catch (err) {
          console.log(err);
        }
      }
    })
  }, [password]);
  return {wallet, hasWallet};
}

export function initWallet({ mnemonic, name, password }: InitWalletParams): void {
  // store mnemonic
  storeMnemonic(mnemonic, password)

  // create wallet address based on mnemonic
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(DERIVATION_PATH + '/' + 0)
  const _wallet: ethers.Wallet = new ethers.Wallet(hdNode.privateKey)
  const provider = ethers.providers.getDefaultProvider();
  const wallet: ForkWallet = { name, index: 0, wallet: _wallet.connect(provider) }
  window['wallet'] = wallet;

  console.log('created wallet at 0 index ... : ', wallet);

  storeLastIndex();
  storeWallet(wallet, password);
}

export function storeWallet(forkWallet: ForkWallet, password: string) {
  const encryptedWallet = encrypt(JSON.stringify(forkWallet), password);
  console.log('storing encrypted wallet .... : ', encryptedWallet);
  extension.storage.local.set({
    [WALLET_KEY]: encryptedWallet
  });
}

export function storeMnemonic(mnemonic: string, password: string): void {
  console.log('storing encrypted mnemonic ... : ', encrypt(mnemonic, password));
  extension.storage.local.set({
    [MNEMONIC_KEY]: encrypt(mnemonic, password)
  });
}

export function storeLastIndex() {
  console.log('storing last index ..');
  extension.storage.local.get([WALLET_LAST_INDEX_KEY], (data) => {
    console.log('fetching last index saved ... : ', data[WALLET_LAST_INDEX_KEY]);
    const idx = data[WALLET_LAST_INDEX_KEY];
    const newIdx = !idx && idx !== 0 ? 0 : idx+1;
    console.log('storing new last index ... : ', newIdx);
    extension.storage.local.set({[WALLET_LAST_INDEX_KEY]: newIdx})
  });
}

export function useMnemonic(password: string): string {
  const [mnemonic, setMnemonic] = useState<string>('');

  useEffect(() => {
    password &&
      extension.storage.local.get([MNEMONIC_KEY], (data) => {
        const encryptedMnemonic = data[MNEMONIC_KEY] ?? '';
        const mnemonic = decrypt(encryptedMnemonic, password);
        setMnemonic(mnemonic);
      });
  }, [password]);
  return mnemonic;
}

export function generateMnemonic() {
  return bip39.generateMnemonic();
}


