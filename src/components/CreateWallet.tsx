import { Badge, Box, Button, Checkbox, Container, Divider, Grid, HStack, Input, List, ListIcon, ListItem, Spacer, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdContentCopy, MdSettings } from "react-icons/md";
import { mnemonic } from "../mnemonic";
import { CreateWalletSuccess } from "./CreateWalletSuccess";
import { WalletCredentials } from "./WalletCredentials";


const CreateWalletSeedPhrase = ({ setSeedPhraseCopied }) => {
  return (
    <VStack justifyContent='space-evenly'>
      <List spacing={3} textAlign='left' fontSize='0.8rem'>
        <ListItem>
          <ListIcon as={MdSettings} />
          Backup seed phrase to secure wallet
        </ListItem>
        <ListItem>
          <ListIcon as={MdSettings} />
          Seed phrase is the only way to recover a wallet with lost private keys
        </ListItem>
      </List>
      <Container maxW='2xl' bg='blue.600' centerContent>
        <Box padding='4' bg='blue.400' color='black' maxW='md' fontSize='0.8rem'>
          {mnemonic}
        </Box>
      </Container>
      <Button variant='solid' height={8} minW={8}>
        <MdContentCopy/>
      </Button>
      <Divider />
      <Checkbox fontSize='0.8rem' onChange={(e) => setSeedPhraseCopied(e.target.checked)}>
        I’ve saved my seed phrase
      </Checkbox>
    </VStack>
  )
}

const CreateWalletSeedPhraseConfirm = ({setSeedWordsEnteredCorrectly}) => {

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const seedPhraseWords = mnemonic.split(' ');

  const handleInputChange = (w: string) => {
    if (!inputOne) {
      setInputOne(w)
    } else if (!inputTwo) {
      setInputTwo(w)
    } else {
      setInputThree(w)
    }
  }

  useEffect(() => {
    setSeedWordsEnteredCorrectly(
      inputOne === seedPhraseWords[2]
      && inputTwo === seedPhraseWords[11]
      && inputThree === seedPhraseWords[5]
    )
  }, [inputOne, inputTwo, inputThree])


  return (
    <VStack justifyContent='space-evenly'>
      <Text fontSize="xs">Select to confirm seed phrase</Text>
      <Divider/>
      <HStack>
        <Input value={inputOne} onChange={(e) => setInputOne(e.target.value)} isInvalid={inputOne !== seedPhraseWords[2]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='3rd word' />
        <Input value={inputTwo} onChange={(e) => setInputTwo(e.target.value)} isInvalid={inputTwo !== seedPhraseWords[11]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='12th word' />
        <Input value={inputThree} onChange={(e) => setInputThree(e.target.value)} isInvalid={inputThree !== seedPhraseWords[5]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='6th word' />
      </HStack>
      <Container>
        {mnemonic.split(' ').map(w => <Badge p={1} m={1} cursor='pointer' variant='outline' onClick={() => {handleInputChange(w)}}>{w}</Badge>)}
      </Container>
    </VStack>
  );
}



const ActionBar = ({
  areCredentialsValid,
  createWalletScreen,
  setCreateWalletScreen,
  setAddWalletOption,
  seedPhraseCopied,
  seedWordsEnteredCorrectly,
  onSubmit
}) => {
  return (
    <Grid templateColumns='5rem 1fr 5rem'>
      <Button variant='outline' onClick={() => createWalletScreen !== 0 ? setCreateWalletScreen(createWalletScreen - 1) : setAddWalletOption('')}>Cancel</Button>
      <Spacer />
      <Button 
        variant='solid'
        disabled={
          createWalletScreen === 0 ? !areCredentialsValid 
          : createWalletScreen === 1 ? !seedPhraseCopied
          : !seedWordsEnteredCorrectly
        }
        onClick={() => createWalletScreen !== 2 ? setCreateWalletScreen(createWalletScreen + 1) : onSubmit()}
        >{createWalletScreen === 2 ? 'Submit' : 'Next'}</Button>
    </Grid>
  )
}

export const CreateWallet = ({ setAddWalletOption, createWallet }) => {

  const [createWalletScreen, setCreateWalletScreen] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [areCredentialsValid, setAreCredentialsValid] = useState(false);
  const [seedPhraseCopied, setSeedPhraseCopied] = useState(false);
  const [seedWordsEnteredCorrectly, setSeedWordsEnteredCorrectly] = useState(false);
  // const areCredentialsValid = !!name && password.length >= 8 && password === repeatPassword;

  const onSubmit = () => {
    createWallet(name, password, mnemonic)
  }

  useEffect(() => {
    setAreCredentialsValid(!!name && password.length >= 8 && password === repeatPassword);
  }, [name, password, repeatPassword])

  return (
    <Grid p={3} templateRows='4rem 1fr 3rem'>
      <VStack spacing={1}>
        <Text borderBottom=''>{createWalletScreen !== 3 ? 'Create Wallet' : 'Wallet Created'}</Text>
        <Divider />
      </VStack>
      {createWalletScreen === 0 ? 
        <WalletCredentials setName={setName} setPassword={setPassword} setRepeatPassword={setRepeatPassword}/> 
        : createWalletScreen === 1 ?
          <CreateWalletSeedPhrase setSeedPhraseCopied={setSeedPhraseCopied}/>
          : createWalletScreen === 2 ?
            <CreateWalletSeedPhraseConfirm setSeedWordsEnteredCorrectly={setSeedWordsEnteredCorrectly}/>
            : null
      }
      {createWalletScreen !== 3 ?
        <ActionBar 
          areCredentialsValid={areCredentialsValid}
          seedPhraseCopied={seedPhraseCopied}
          seedWordsEnteredCorrectly={seedWordsEnteredCorrectly}
          createWalletScreen={createWalletScreen}
          setCreateWalletScreen={setCreateWalletScreen}
          setAddWalletOption={setAddWalletOption}
          onSubmit={onSubmit}/>
        : null
      }
    </Grid>
  )
}

