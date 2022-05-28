import { Button, extendTheme, Grid, Spacer, Spinner, Stat, StatHelpText, StatLabel, StatNumber, VStack } from "@chakra-ui/react"
import { FooterNav } from "./FooterNav"
import { WalletHeader } from "./WalletHeader"
import CronosMock from '../abis/CronosMock.json';
import BEEFY_UNISWAP_ABI from '../abis/BeefyZapUniswapV2.json';
import BEEFY_VAULT_ABI from '../abis/BeefyVaultV6.json';
import ERC20_ABI from '../abis/ERC20.json';
import { ethers, Signer, BigNumber } from "ethers";
import { CreateWalletFromMnemonic } from "../store/wallet/action-creator";
import { useEffect, useState } from "react";
import BEEFY_ROUTER_ABI from '../abis/BeefyRouter.json';
import { useWallet } from "hooks/useWallet";

export const TokenList = () => {

  const walletState = useWallet();
  const wallet = walletState?.wallet;

  const walletName = walletState?.name;
  const walletAddress = walletState?.wallet.address;
  const trimmedAddress = walletAddress?.slice(0,4) + '....' + walletAddress?.slice(walletAddress.length-4, walletAddress.length);

  const [balance, setBalance] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinName, setCoinName] = useState('');
  const [balanceLoading, setBalanceLoading] = useState(true);

  // useEffect(() => {
  //   const loadTokenBalance = async () => {
  //     if (provider) {

  //       const balance: BigNumber = await provider?.getBalance('0x9DA3d18d1ae468Fe266D1E60b27Cd24f86FAe343');
  //       const tokenBalance = ethers.utils.formatEther(balance);
  //       console.log('balance ====> ', tokenBalance);
  //       setBalance(tokenBalance);
  //       setBalanceLoading(false);
  //     }
  //   }
  //   loadTokenBalance()
  // }, [connectedWallet]);

  return (
    <Grid templateRows='5rem 1fr 4rem'>
      <WalletHeader walletAddress={trimmedAddress} walletName={walletName} />
      <VStack>
        {/* {balanceLoading ?
          <Spinner size='xl' />
          : <Stat height='fit-content'>
              <StatLabel>Account Balance</StatLabel>
              <StatNumber>{balance}</StatNumber>
              <StatHelpText>CRO</StatHelpText>
            </Stat>
        } */}
        {/* <Button variant='solid' width="90%" justifySelf="flex-end" mt={20} onClick={() => deposit()}>Deposit in LP</Button> */}
      </VStack>
      <FooterNav />
    </Grid>
  )
}