import { supportedChains } from "const";
import { ethers } from "ethers";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useInterval } from "./common/useInterval";
import { useChain } from "./useChain";
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
  const [selectedChain,] = useChain();
  const setBalanceState = useSetRecoilState(balanceState);
  const currentBalanceState = useRecoilValue(balanceState).balance;
  useInterval(
    async () => {
      if (!!wallet && selectedChain) {
        const { address } = wallet.wallet;
        setBalanceState({ balance: currentBalanceState, balanceLoading: true })
        const infuraProvider = new ethers.providers.InfuraProvider(selectedChain.networkType, selectedChain.apikey);
        const _balance = await infuraProvider.getBalance(address)
        const balance = ethers.utils.formatEther(_balance)
        setBalanceState({ balance, balanceLoading: false });
      }
    },
    10000
  );
  return useRecoilValue(balanceState);
}