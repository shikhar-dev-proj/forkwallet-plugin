import { ethers } from "ethers";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useInterval } from "./common/useInterval";
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
  const currentBalanceState = useRecoilValue(balanceState).balance;
  useInterval(
    async () => {
      if (!!wallet) {
        const { address } = wallet.wallet;
        setBalanceState({ balance: currentBalanceState, balanceLoading: true })
        const provider = ethers.providers.getDefaultProvider()
        const _balance = await provider.getBalance(address)
        const balance = ethers.utils.formatEther(_balance)
        setBalanceState({ balance, balanceLoading: false });
      }
    },
    10000
  );
  return useRecoilValue(balanceState);
}