import { ethers } from "ethers";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useWallet } from "./useWallet";

export type BalanceState = {
  balance: string | undefined;
  balanceLoading: boolean;
}

const balanceState = atom<BalanceState>({
  key: 'balanceState',
  default: {
    balance: undefined,
    balanceLoading: true
  }
});

export function useBalance(): BalanceState {
  const { wallet } = useWallet();
  const setBalanceState = useSetRecoilState(balanceState);

  useEffect(() => {
    const fetchBalance = async ({ address }) => {
      const provider = ethers.providers.getDefaultProvider();
      console.log('PROVIDER ===> ', provider);
      const _balance = await provider.getBalance(address)
      const balance = ethers.utils.formatEther(_balance)
      setBalanceState({ balance, balanceLoading: false })
    }
    if (!!wallet) {
      const {provider, address} = wallet.wallet;
      fetchBalance({ address }).catch(console.error);
    }
  }, [wallet]);
  return useRecoilValue(balanceState);
}