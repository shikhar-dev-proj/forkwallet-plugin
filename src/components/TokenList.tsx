import { Button, extendTheme, Grid, Spacer, Spinner, Stat, StatHelpText, StatLabel, StatNumber, VStack } from "@chakra-ui/react"
import { FooterNav } from "./FooterNav"
import { WalletHeader } from "./WalletHeader"
import CronosMock from '../abis/CronosMock.json';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import BEEFY_UNISWAP_ABI from '../abis/BeefyZapUniswapV2.json';
import BEEFY_VAULT_ABI from '../abis/BeefyVaultV6.json';
import ERC20_ABI from '../abis/ERC20.json';
import { ethers, Signer, BigNumber } from "ethers";
import { CreateWalletFromMnemonic } from "../store/wallet/action-creator";
import { mnemonic } from "../mnemonic";
import { useEffect, useState } from "react";
import BEEFY_ROUTER_ABI from '../abis/BeefyRouter.json';

export const TokenList = () => {

  const walletState = useSelector((state: AppState) => state.wallet.wallet);
  const connectedWallet = walletState?.wallet;
  const provider = connectedWallet?.provider

  const walletName = walletState?.name;
  const walletAddress = walletState?.wallet.address;
  const trimmedAddress = walletAddress?.slice(0,4) + '....' + walletAddress?.slice(walletAddress.length-4, walletAddress.length);

  const deposit = async () => {
    // let wallet = web3.eth.accounts.wallet.create(1);
    // let keystore = wallet.encrypt('decodekey');
    // console.log({ wallet, keystore });
    // wallet.save('decodekey');
    // const networkId = await web3.eth.net.getId();
    // const accounts = await web3.eth.getAccounts();
    // const account = accounts[0];

    // const _cronosMockAddress = CronosMock.networks[networkId].address;
    // const _cronosMock = new web3.eth.Contract(CronosMock.abi as any, _cronosMockAddress);
    // const senderBalance = await _cronosMock.methods.balanceOf(account).call();

    // console.log('SENDER CRO BALANCE  ==== > ', account, senderBalance);


    // // debugger

    // // let _balance = await _cronosMock.methods.balanceOf(wallet[0].address).call();
    // // console.log(_balance, );
    // const ammount = web3.utils.toWei('1');
    // const transaction = await _cronosMock.methods.transfer(wallet[0].address, ammount).send({ from: account });
    // // await web3.eth.accounts.signTransaction(transaction, wallet[0].privateKey)
    // let _balance = await _cronosMock.methods.balanceOf(wallet[0].address).call();



    // console.log('BALANCE OF THE ACCOUNT ===> ', _balance);
    // console.log(web3);
    

    // const w = createdWallet?.wallet.connect(provider);
    // console.log(w);
    // debugger
    // connectedWallet.getSigner()
    // debugger
    if (connectedWallet) {

      // const gasLimit = await connectedWallet.estimateGas();
      // const gasPrice = await connectedWallet.getGasPrice()
      // const signer = connectedWallet.provider.getSigner(connectedWallet.address);
      try {

        const provider:any = connectedWallet.provider;
        const signer = provider.getSigner(connectedWallet.address);
        

        // ADDRESSES ================================================================================================================================

        const beefyVaultAddress = '0x6bBdC5cacB4e72884432E3d63745cc8e7A4392Ca';
        const wCroAddress = '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
        const beefiZapUniswapAddress = '0xE8f59c05Ff92CF1584CBc404B4527b4F1eaF6620'

        // CONTRACTS ================================================================================================================================

        const beefyZapUniswapV2Contract = new ethers.Contract(beefiZapUniswapAddress, BEEFY_UNISWAP_ABI, connectedWallet);
        // const beefyRouterAddress = await beefyZapUniswapV2Contract.router();
        // const beefyRouterContract = new ethers.Contract(beefyRouterAddress, BEEFY_ROUTER_ABI);
        const wCroContract = new ethers.Contract(wCroAddress, ERC20_ABI.abi, connectedWallet);


        // AMOUNTS ================================================================================================================================

        const depositAmount = BigNumber.from('3000000000000000000');
        const approveAmount = BigNumber.from('10000000000000000000');

        // APPROVAL ================================================================================================================================

        const approved = await wCroContract.approve(beefiZapUniswapAddress, approveAmount)
        console.log('APPROVAL ======> ', approved);


        // ESTIMATE SWAP ================================================================================================
        
        const swapEstimates = await beefyZapUniswapV2Contract.estimateSwap(beefyVaultAddress, wCroAddress, depositAmount);
        console.log('SWAP ESTIMATES ======> ', swapEstimates);
        console.log('Swap Amount in => ', swapEstimates.swapAmountIn.toString())
        console.log('Swap Amount out => ', swapEstimates.swapAmountOut.toString())
        console.log('Swap Token Out => ', swapEstimates.swapTokenOut.toString())

        // SET tokenAmountOutMin FOR DEPOSIT

        const swapEstimateAmountOut = +swapEstimates.swapAmountOut.toString();
        const actual = swapEstimateAmountOut - swapEstimateAmountOut*0.01;
        const tokenAmountOutMin = BigNumber.from(actual.toFixed(0));
        console.log('tokenAmountOutMin =====> ', tokenAmountOutMin);

        // DEPOSIT 
        const delay =  await new Promise((res) => setTimeout(res, 3000));
        const tx = await beefyZapUniswapV2Contract.beefInETH(beefyVaultAddress, tokenAmountOutMin, { value: depositAmount });
        console.log('TRANSACTION RESPONSE =====> ', tx);
        const txReceipt = await tx.wait();
        console.log('TRANSACTION RECEIPT =====> ', txReceipt);


        // FETCH REWARD BALANCE ================================================================================================

        const beefyVaultContract = new ethers.Contract(beefyVaultAddress, BEEFY_VAULT_ABI, signer);
        const earnedTokenBalance = await beefyVaultContract.balanceOf(connectedWallet.address);

        const formattedBalance = ethers.utils.formatEther(earnedTokenBalance);
        console.log('Vault Balance after deposit ====> ', formattedBalance);
      } catch (err) {
        console.error(err);
      }
    }

    

    

  }

  const [balance, setBalance] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinName, setCoinName] = useState('');
  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    const loadTokenBalance = async () => {
      // const cronosCoinAddress = '0xbe63ae080DCc40430E1b42F2A67A0199ee488E5A';
      // const tokenContract = new ethers.Contract(cronosCoinAddress, ERC20_ABI.abi, connectedWallet);
      // window['croContract'] = tokenContract;
      // const tokenBalance = await tokenContract.balanceOf('0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23');
      if (provider) {

        const balance: BigNumber = await provider?.getBalance('0x9DA3d18d1ae468Fe266D1E60b27Cd24f86FAe343');
        const tokenBalance = ethers.utils.formatEther(balance);
        console.log('balance ====> ', tokenBalance);
        // const tokenSymbol = await tokenContract.symbol();
        // const tokenName = await tokenContract.name();
        setBalance(tokenBalance);
        // setCoinSymbol(tokenSymbol);
        // setCoinName(tokenName);
        setBalanceLoading(false);
      }
    }
    loadTokenBalance()
  }, [connectedWallet]);

  return (
    <Grid templateRows='5rem 1fr 4rem'>
      <WalletHeader walletAddress={trimmedAddress} walletName={walletName} />
      <VStack>
        {balanceLoading ?
          <Spinner size='xl' />
          : <Stat height='fit-content'>
              <StatLabel>Account Balance</StatLabel>
              <StatNumber>{balance}</StatNumber>
              <StatHelpText>CRO</StatHelpText>
            </Stat>
        }
        <Button variant='solid' width="90%" justifySelf="flex-end" mt={20} onClick={() => deposit()}>Deposit in LP</Button>
      </VStack>
      <FooterNav />
    </Grid>
  )
}