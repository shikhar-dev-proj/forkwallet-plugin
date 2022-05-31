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
import { useSetPassword } from "hooks/usePassword";
import { useBalance } from "hooks/useBalance";

export const TokenList = () => {

  const walletState = useWallet()
  const setPassword = useSetPassword()
  const { balance, balanceLoading } = useBalance();
  const wallet = walletState?.wallet?.wallet;

  const walletName = walletState?.wallet?.name;
  const walletAddress = wallet?.address;
  const trimmedAddress = walletAddress?.slice(0,4) + '....' + walletAddress?.slice(walletAddress.length-4, walletAddress.length);

  const lockWallet = () => setPassword(undefined);

  // useEffect(() => {
  //   const loadTokenBalance = async () => {
  //     if (!!wallet?.provider) {
  //       const provider = wallet.provider;
  //       console.log(provider);
  //       debugger
  //       const balance: BigNumber = await provider.getBalance(wallet.address);
  //       const tokenBalance = ethers.utils.formatEther(balance);
  //       console.log('balance ====> ', tokenBalance);
  //       // setBalance(tokenBalance);
  //       setBalanceLoading(false);
  //     }
  //   }
  //   loadTokenBalance()
  // }, [wallet]);

  return (
    <Grid templateRows='5rem 1fr 4rem'>
      <WalletHeader walletAddress={trimmedAddress} walletName={walletName} lockWallet={lockWallet} />
      <VStack>
        {balanceLoading ?
          <Spinner size='xl' />
          : <Stat height='fit-content'>
              <StatLabel>Account Balance</StatLabel>
              <StatNumber>{balance}</StatNumber>
              <StatHelpText>CRO</StatHelpText>
            </Stat>
        }
        {/* <Button variant='solid' width="90%" justifySelf="flex-end" mt={20} onClick={() => deposit()}>Deposit in LP</Button> */}
      </VStack>
      <FooterNav />
    </Grid>
  )
}