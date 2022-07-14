import { supportedChains } from "../const";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { IChain } from "types/common";
import { useWallet } from "./useWallet";

const chainState = atom<IChain>({
  key: 'chain',
  default: supportedChains[0],
});

export function useChain() {

  return useRecoilState(chainState);

}