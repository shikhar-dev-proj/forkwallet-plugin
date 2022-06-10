import { supportedChains } from "../const";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { IChain } from "types/common";
import { useWallet } from "./useWallet";

const passwordState = atom<IChain | undefined>({
  key: 'chain',
  default: undefined,
});

export function useChain() {

  const [selectedChain, setSelectedChain] = useRecoilState(passwordState);
  const { wallet } = useWallet();
  
  useEffect(() => {
    if (!!wallet) {
      if (!selectedChain) {
        setSelectedChain(supportedChains[0])
      }
    }
  }, [wallet]);
}