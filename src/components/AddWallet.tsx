import { Button, Grid, Spacer, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { FaGalacticSenate } from "react-icons/fa"
import { CreateWallet } from "./CreateWallet"
import { ImportWallet } from "./ImportWallet"

const AddWalletOptions = ({ setAddWalletOption }) => {
  return (
    <VStack spacing={10}>
      <Spacer />
      <FaGalacticSenate size={100} />
      <Grid gridGap={2}>
        <Text fontSize="2xl" fontWeight="bold">ForkWallet</Text>
        <Text fontSize="xl">Your Gateway to ForkWallet</Text>
      </Grid>
      <Grid gridGap={5}>
        <Button variant='solid' mt={20} onClick={() => {setAddWalletOption('create')}}>Create Wallet</Button>
        <Button variant='outline' onClick={() => {setAddWalletOption('import')}}>Import with Seed Phrase</Button>
      </Grid>
    </VStack>
  )
}

export const AddWallet = () => {

  const [addWalletOption, setAddWalletOption] = useState('');
  return (
    <>
      { !addWalletOption ? 
        <AddWalletOptions setAddWalletOption={setAddWalletOption}/>
        : addWalletOption === 'create' ?
          <CreateWallet setAddWalletOption={setAddWalletOption}/>
          : <ImportWallet setAddWalletOption={setAddWalletOption}/>
      }
    </>
  )
}