import { Button, Grid, Spacer, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { FaGalacticSenate } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useSetPassword } from "../hooks/usePassword"
import { initWallet, useWallet } from "../hooks/useWallet"
import { CreateWallet } from "./CreateWallet"
import { CreateWalletSuccess } from "./CreateWalletSuccess"
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

export const AddWallet = ({back}) => {

  const [addWalletOption, setAddWalletOption] = useState('')
  // const dispatch = useDispatch()
  const createdWallet = useWallet();
  const setPassword = useSetPassword();

  console.log('Wallet Created State === > ', createdWallet);

  const createWallet = (name: string, password: string, mnemonic: string) => {
    console.log('create wallet initiated with ... : ', name, password, mnemonic);
    initWallet({mnemonic, name, password});
    setPassword(password);
  }

  return (
    <>
      { !createdWallet ?
        !addWalletOption ? 
          <AddWalletOptions setAddWalletOption={setAddWalletOption}/>
          : addWalletOption === 'create' ?
            <CreateWallet setAddWalletOption={setAddWalletOption} createWallet={createWallet}/>
            : <ImportWallet setAddWalletOption={setAddWalletOption}/>
        : <CreateWalletSuccess done={back}/>
      }
    </>
  )
}