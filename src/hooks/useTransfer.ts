import { ethers } from "ethers";
import { useWallet } from "./useWallet";
import ERC20_ABI from './../abis/ERC20.json';
import { supportedChains } from "const";

// consume sendAddress, trasnferAmount
export function useTransfer() {

  const { wallet } = useWallet()
  const w = wallet?.wallet;

  const transfer = async (tokenAmount: string, toAddress: string, contractAddress?: string) => {
    if(!!w) {
      const provider = w?.provider;
      const gasPrice = await w?.provider?.getGasPrice()
      if (contractAddress) {
        let contract = new ethers.Contract(contractAddress, ERC20_ABI.abi, w)
        // How many tokens?
        let numberOfTokens = ethers.utils.parseUnits(tokenAmount, 18)
        console.log(`numberOfTokens: ${numberOfTokens}`)
  
        try {
          const tx = await contract.transfer(toAddress, numberOfTokens);
          const txReceipt = await tx.wait();
          console.log('transaction receipt .... : ', txReceipt);
          return txReceipt;
        } catch(e) {
          console.error('Error Message : ', e);
        }
  
      } else {
        const nonce = await w?.provider!.getTransactionCount(w!.address,"latest")
        try {
          const tx = {
            from: w?.address,
            to: toAddress,
            value: ethers.utils.parseEther(tokenAmount),
            nonce,
            gasLimit: ethers.utils.hexlify(100000),
            gasPrice
          }
          console.log('TX .... : ', tx)
          w!.sendTransaction(tx).then((receipt) => {
            console.log('sent transaction .... : ', receipt)
            return receipt
          })
        } catch (error) {
          console.error('Error ocurred .... ', error);
        }
      }
    }
  }

  return transfer;

  
}
// fetch latest of wallet
// estimate gas for transfer to sendAddress
// perform send transaction
// capture transaction response
// on transaction receipt display success
