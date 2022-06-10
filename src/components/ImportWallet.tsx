import { Grid, VStack, Divider, Text, Button, Spacer, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { CreateWalletSuccess } from "./CreateWalletSuccess";
import { WalletCredentials } from "./WalletCredentials";

const ImportWalletSeedPhrase = () => {
  return (
    <VStack justifyContent='space-evenly'>
      <Text>Enter Seed Phrase</Text>
      <Textarea height='8rem' resize='none'></Textarea>
      <Spacer/>
    </VStack>
  )
}

const ActionBar = ({ importWalletScreen, setImportWalletScreen, setAddWalletOption }) => {
  return (
    <Grid templateColumns='5rem 1fr 5rem'>
      <Button variant='outline' onClick={() => importWalletScreen !== 0 ? setImportWalletScreen(importWalletScreen - 1) : setAddWalletOption('')}>Cancel</Button>
      <Spacer />
      <Button variant='solid' onClick={() => setImportWalletScreen(importWalletScreen + 1)}>{importWalletScreen === 2 ? 'Import' : 'Next'}</Button>
    </Grid>
  )
}

export const ImportWallet = ({ setAddWalletOption }) => {

    const [importWalletScreen, setImportWalletScreen] = useState(0);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword]
    = useState('');
    const [areCredentialsValid, setAreCredentialsValid] = useState(false);
  
    return (
      <Grid p={3} templateRows='4rem 1fr 3rem'>
        <VStack spacing={1}>
          <Text>{importWalletScreen !== 2 ? 'Import Wallet' : 'Wallet Imported'}</Text>
          <Divider />
        </VStack>
        {importWalletScreen === 0 ? 
          <WalletCredentials setName={setName} setPassword={setPassword} setRepeatPassword={setRepeatPassword}/> 
          : importWalletScreen === 1 ?
            <ImportWalletSeedPhrase/>
            : null
        }
        {importWalletScreen !== 2 ?
          <ActionBar 
            importWalletScreen={importWalletScreen}
            setImportWalletScreen={setImportWalletScreen}
            setAddWalletOption={setAddWalletOption}/>
          : null
        }
      </Grid>
    )
  }