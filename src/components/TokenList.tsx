import { Grid, Spacer, VStack } from "@chakra-ui/react"
import { FooterNav } from "./FooterNav"
import { WalletHeader } from "./WalletHeader"

export const TokenList = () => {

  const walletName = 'shikhar\'s wallet';
  const walletAddress = 'terra1m3tz4...qqpov';

  return (
    <Grid templateRows='5rem 1fr 4rem'>
      <WalletHeader walletAddress={walletAddress} walletName={walletName}/>
      <Spacer/>
      <FooterNav/>
    </Grid>
  )
}