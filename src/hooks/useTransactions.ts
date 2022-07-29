import { ethers, Transaction as ETHTransaction } from "ethers";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Transaction, TxType } from "types/common";
import { useExplorer } from "./useExplorer";
import { useWallet } from "./useWallet";


const transactions = atom<Transaction[]>({
  key: 'transactions',
	default: [],
});

export async function useTransactions(): Promise<Transaction[]> {

	const { wallet } = useWallet()
	const explorer = useExplorer()
	const setTransactions = useSetRecoilState(transactions);

	const setTxListForWallet = async (address: string, startBlock: string, endBlock: string) => {
		const history = await explorer?.getHistory(address, startBlock, endBlock)
		if (!history) {
			setTransactions([]);
		} else {
			const txList: Transaction[] = history?.map((t) => {
				return {
					nonce: t.nonce,
					gasPrice: (t.gasPrice!.toNumber() / Math.pow(10, 9)).toString(),
					gasLimit: t.gasLimit.toString(),
					value: ethers.utils.formatEther(t.value),
					from: t.from!,
					to: t.to!,
					type: t.from === address ? TxType.OUT : TxType.IN,
					date: new Date(t.timestamp! * 1000)
				};
			});
			setTransactions(txList);
		}
	}

	useEffect(() => {
		if (wallet && explorer) {
			const { address} = wallet.wallet;
			setTxListForWallet(address, 'earliest', 'latest')
		}
	}, [wallet, explorer])

	return useRecoilValue(transactions)
} 