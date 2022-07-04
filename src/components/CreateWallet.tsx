import { Badge, Box, Button, Checkbox, Container, Divider, Grid, Heading, HStack, Image, Input, List, ListIcon, ListItem, Spacer, Text, useClipboard, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdContentCopy, MdSettings } from "react-icons/md";
import { generateMnemonic } from "../hooks/useWallet";
import { CreateWalletSuccess } from "./CreateWalletSuccess";
import { WalletCredentials } from "./WalletCredentials";
import '@fontsource/inter';
import { IoMdArrowBack } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";


const CreateWalletSeedPhrase = ({ mnemonic, setSeedPhraseCopied }) => {

  const { hasCopied, onCopy } = useClipboard(mnemonic);

  return (
    <VStack color='white' justifyContent='space-evenly'>
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
      <Container border='0.8px solid rgba(126, 145, 212, 1)' borderRadius='6.4px' p={5} maxW='2xl' bg='rgba(255, 255, 255, 0.1)' centerContent>
        <Text fontFamily='Inter' fontWeight={500} fontSize='14px' lineHeight='24px' letterSpacing='0.02em' color='#FFFFFF'>{mnemonic}</Text>
      </Container>
      <Button onClick={()=> {onCopy()}} width='100%' color='white' leftIcon={hasCopied ? <FaClipboardCheck color="green"/> : <MdContentCopy/>} variant='solid' height={8} bg='rgba(255, 255, 255, 0.1)' borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)'>
        {hasCopied ? 'Copied' : 'Copy'}
      </Button>
      <Checkbox size='sm' onChange={(e) => setSeedPhraseCopied(e.target.checked)}>
        I understand that if I lose my recovery phrase, I’ll lose all of the crypto in my wallet.
      </Checkbox>
    </VStack>
  )
}

const CreateWalletSeedPhraseConfirm = ({mnemonic, setSeedWordsEnteredCorrectly}) => {

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
      <Heading as='h4' size='md' color='white'>
        Have you saved it? 👀
      </Heading>
      <Text color='white' fontSize="xs">Verify that you have saved our seed phrase by clicking on the appropriate word.</Text>
      <Divider/>
      <HStack>
        <Input value={inputOne} onChange={(e) => setInputOne(e.target.value)} isInvalid={inputOne !== seedPhraseWords[2]} borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' size="xs" errorBorderColor='crimson' placeholder='3rd word' />
        <Input value={inputTwo} onChange={(e) => setInputTwo(e.target.value)} isInvalid={inputTwo !== seedPhraseWords[11]} borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' size="xs" errorBorderColor='crimson' placeholder='12th word' />
        <Input value={inputThree} onChange={(e) => setInputThree(e.target.value)} isInvalid={inputThree !== seedPhraseWords[5]} borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' size="xs" errorBorderColor='crimson' placeholder='6th word' />
      </HStack>
      <Container>
        {mnemonic.split(' ').map(w => <Badge p={2} m={2} color='white' borderRadius='6.4px' backgroundColor='rgba(255, 255, 255, 0.1)' border='0.8px solid rgba(126, 145, 212, 1)' cursor='pointer' variant='filled' onClick={() => {handleInputChange(w)}}>{w}</Badge>)}
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
    <Grid templateRows='1rem 3rem 3rem' gap='1rem' width='100%'>
      <Image src='/divider.svg' />
      <Button 
        height={12} 
        borderRadius='4px' 
        colorScheme='primary' 
        variant='solid'
        disabled={
          createWalletScreen === 0 ? !areCredentialsValid 
          : createWalletScreen === 1 ? !seedPhraseCopied
          : !seedWordsEnteredCorrectly
        }
        onClick={() => createWalletScreen !== 2 ? setCreateWalletScreen(createWalletScreen + 1) : onSubmit()}
        >{createWalletScreen === 2 ? 'Submit' : 'Next'}</Button>
      <Button borderRadius='4px' colorScheme='secondary' variant='solid' height={12} onClick={() => createWalletScreen !== 0 ? setCreateWalletScreen(createWalletScreen - 1) : setAddWalletOption('')}>Cancel</Button>
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
  const [mnemonic, setMnemonic] = useState('');
  // const areCredentialsValid = !!name && password.length >= 8 && password === repeatPassword;
  
  
  useEffect(() => {
    console.log('setting mnemonic');
    setMnemonic(generateMnemonic());
    console.log('mneomnic : ', mnemonic);
  }, []);

  const onSubmit = () => {
    console.log('submitting create wallet form');
    createWallet(name, password, mnemonic)
  }


  useEffect(() => {
    setAreCredentialsValid(!!name && password.length >= 8 && password === repeatPassword);
  }, [name, password, repeatPassword])

  return (
    <Grid p={3} templateRows='3rem 1fr 9rem'>
      <VStack spacing={1}>
        <Grid gridTemplateColumns='1rem 4rem 7rem 5rem'>
          <IoMdArrowBack size='md' color='white' onClick={() => setAddWalletOption('')}/>
          <Spacer/>
          <Text fontSize="md" size="md" fontWeight={600} color='white'>{createWalletScreen !== 3 ? 'Create wallet' : 'Wallet Created'}</Text>
          <Spacer/>
        </Grid>
      </VStack>
      {createWalletScreen === 0 ? 
        <WalletCredentials setName={setName} setPassword={setPassword} setRepeatPassword={setRepeatPassword}/> 
        : createWalletScreen === 1 ?
          <CreateWalletSeedPhrase mnemonic={mnemonic} setSeedPhraseCopied={setSeedPhraseCopied}/>
          : createWalletScreen === 2 ?
            <CreateWalletSeedPhraseConfirm mnemonic={mnemonic} setSeedWordsEnteredCorrectly={setSeedWordsEnteredCorrectly}/>
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

