import { etherScanAPIKey } from "const";
import { ethers } from "ethers";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useChain } from "./useChain";

const explorer = atom<ethers.providers.EtherscanProvider | undefined>({
  key: 'chain',
  default: undefined,
});

export function useExplorer(): ethers.providers.EtherscanProvider | undefined {
  const [selectedChain, ] = useChain();
  const setExplorer = useSetRecoilState(explorer);

  useEffect(() => {
    if (selectedChain) {
      setExplorer(
        new ethers.providers.EtherscanProvider(selectedChain.networkType, etherScanAPIKey)
      )
    }
  }, [selectedChain])

  return useRecoilValue(explorer)

}