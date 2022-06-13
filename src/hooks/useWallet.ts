import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import extension from 'extensionizer';
import { decrypt, encrypt } from '../utils/crypto';
import * as bip39 from 'bip39';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { usePassword } from './usePassword';
import { supportedChains } from 'const';

const WALLET_KEY = 'wallet'
const MNEMONIC_KEY = 'mnemonic'
const WALLET_LAST_INDEX_KEY = 'lastIndex'
const ENCODING = 'hex'
const DERIVATION_PATH = "m/44'/60'/0'/0";
// const rpcURL = 'https://goerli.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7';

export type InitWalletParams = {
  mnemonic: string;
  name: string;
  password: string;
}

export type ForkWallet = {
  name: string;
  index: number;
  wallet: ethers.Wallet;
}

const walletState = atom<ForkWallet | undefined>({
  key: 'walletState',
  default: undefined,
});

export type UseWalletReturnType = {
  wallet?: ForkWallet;
  hasWallet: boolean;
}

export function useWallet(): UseWalletReturnType {
  const walletInState = useRecoilValue(walletState);
  const password = usePassword()
  const setWallet = useSetRecoilState(walletState)

  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (walletInState) {
      setHasWallet(true);
    } else {
      extension.storage.local.get([WALLET_KEY], (data) => {
        const encryptedWalletKey = data[WALLET_KEY]
        console.log('encrypted wallet ... : ', encryptedWalletKey);
        if (!!encryptedWalletKey) {
          setHasWallet(true);
        } else {
          setHasWallet(false);
        }
        if (!!encryptedWalletKey && !!password) {
          console.log('encrypted wallet and password present ... :', encryptedWalletKey, password);
          try {
            const walletStr = decrypt(encryptedWalletKey, password)
            console.log('decrypted wallet ... : ', JSON.parse(walletStr))
            const { name, index, key } = JSON.parse(walletStr)
            const etherWallet = new ethers.Wallet(key)
            console.log('decrypted wallet ... : ', name, index, key)
            const forkWallet = { name, index, wallet: etherWallet }
            setWallet(forkWallet)
          } catch (err) {
            console.log(err);
          }
        }
      })
    }
  }, [password]);
  return {
    wallet: useRecoilValue(walletState),
    hasWallet
  };
}

export function initWallet({ mnemonic, name, password }: InitWalletParams): void {
  // store mnemonic
  storeMnemonic(mnemonic, password)

  // create wallet address based on mnemonic
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(DERIVATION_PATH + '/' + 0)
  const infuraProvider = new ethers.providers.InfuraProvider('goerli', supportedChains[1].apikey);
  const _wallet: ethers.Wallet = new ethers.Wallet(hdNode.privateKey, infuraProvider)
  const wallet = { name, index: 0, key: _wallet.privateKey }
  window['wallet'] = _wallet;

  console.log('created wallet at 0 index ... : ', wallet);

  storeLastIndex();
  storeWallet(wallet, password);
}

export function storeWallet(wallet: {name: string, key: string, index: number }, password: string) {
  const encryptedWallet = encrypt(JSON.stringify(wallet), password);
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

export function useTestPassword(): (password: string) => boolean {
  const [seed, setSeed] = useState('');
  useEffect(() => {
    console.log('CALLING GET FOR MNEMONIC STORED');
    extension.storage.local.get([MNEMONIC_KEY], (data) => {
      const seed = data[MNEMONIC_KEY] ?? {};
      console.log('GOT STORED MNEMONIC ====> ', seed);
      setSeed(seed);
    });
  }, [])

  const testPassword = (password: string): boolean => {
    try {
      const decrypted = decrypt(seed, password);
      if (ethers.utils.isValidMnemonic(decrypted)) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };
  return testPassword;
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


