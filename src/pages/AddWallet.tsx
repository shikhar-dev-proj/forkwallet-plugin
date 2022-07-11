import { Button, Divider, Grid, Image, Spacer, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useSetPassword } from "../hooks/usePassword"
import { initWallet, useWallet } from "../hooks/useWallet"
import { CreateWallet } from "../components/CreateWallet"
import { CreateWalletSuccess } from "../components/CreateWalletSuccess"
import { ImportWallet } from "../components/ImportWallet"
import '@fontsource/inter';
import { useNavigate } from "react-router"

const AddWalletOptions = ({ setAddWalletOption }) => {
  return (
    <VStack spacing={10}>
      <Spacer />
      <Image src="/LogoWithName.svg" height='8.75rem' width='5.375rem'  />
      <Grid gridGap={2}>
        <Text fontFamily='Inter' color='white' fontSize="xl">De-Fi wallet for earnings</Text>
      </Grid>
      <Grid gridGap={5} width='90%'>
        <Image mt={20} src='/divider.svg' />
        <Button height={12} borderRadius='4px' colorScheme='primary' variant='solid' onClick={() => {setAddWalletOption('create')}}>Create Wallet</Button>
        <Button height={12} borderRadius='4px' colorScheme='secondary' variant='solid' onClick={() => {setAddWalletOption('import')}}>Import with Seed Phrase</Button>
      </Grid>
    </VStack>
  )
}

export const AddWallet = ({ onCreation }) => {

  const [addWalletOption, setAddWalletOption] = useState('')
  // const dispatch = useDispatch()
  const { wallet } = useWallet();
  const setPassword = useSetPassword();
  const navigate = useNavigate();

  console.log('Wallet Created State === > ', wallet);

  const createWallet = (name: string, password: string, mnemonic: string) => {
    console.log('create wallet initiated with ... : ', name, password, mnemonic);
    initWallet({mnemonic, name, password});
    setPassword(password);
  }

  const onDone = () => {
    navigate('/dashboard', {replace: true})
    onCreation(true)
  }

  return (
    <>
      { !wallet ?
        !addWalletOption ? 
          <AddWalletOptions setAddWalletOption={setAddWalletOption}/>
          : addWalletOption === 'create' ?
            <CreateWallet setAddWalletOption={setAddWalletOption} createWallet={createWallet}/>
            : <ImportWallet setAddWalletOption={setAddWalletOption}/>
        : <CreateWalletSuccess onDone={onDone}/>
      }
    </>
  )
}