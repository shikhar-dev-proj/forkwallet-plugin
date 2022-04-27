import { Badge, Box, Button, Checkbox, Container, Divider, Flex, Grid, HStack, Input, List, ListIcon, ListItem, Spacer, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { MdContentCopy, MdSettings } from "react-icons/md"
import { GiGlassCelebration } from 'react-icons/gi';
import { WalletCredentials } from "./WalletCredentials";
import { CreateWalletSuccess } from "./CreateWalletSuccess";

const seedPhrase = 'student park weather snack suggest steel train copper surface warrior point good swing athlete speak zebra rare cup subject toddler afraid craft sample cotton';

const CreateWalletSeedPhrase = () => {
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
          {seedPhrase}
        </Box>
      </Container>
      <Button variant='solid' height={8} minW={8}>
        <MdContentCopy/>
      </Button>
      <Divider />
      <Checkbox fontSize='0.8rem'>
        I’ve saved my seed phrase
      </Checkbox>
    </VStack>
  )
}

const CreateWalletSeedPhraseConfirm = () => {

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');

  const seedPhraseWords = seedPhrase.split(' ');


  return (
    <VStack justifyContent='space-evenly'>
      <Text fontSize="xs">Select to confirm seed phrase</Text>
      <Divider/>
      <HStack>
        <Input onChange={(e) => setInputOne(e.target.value)} isInvalid={inputOne !== seedPhraseWords[2]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='3rd word' />
        <Input onChange={(e) => setInputOne(e.target.value)} isInvalid={inputTwo !== seedPhraseWords[11]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='12th word' />
        <Input onChange={(e) => setInputOne(e.target.value)} isInvalid={inputThree !== seedPhraseWords[5]} size="xs" variant='filled' errorBorderColor='crimson' placeholder='6th word' />
      </HStack>
      <Container>
        {seedPhrase.split(' ').map(w => <Badge p={1} m={1} cursor='pointer' variant='outline'>{w}</Badge>)}
      </Container>
    </VStack>
  );
}



const ActionBar = ({ createWalletScreen, setCreateWalletScreen, setAddWalletOption }) => {
  return (
    <Grid templateColumns='5rem 1fr 5rem'>
      <Button variant='outline' onClick={() => createWalletScreen !== 0 ? setCreateWalletScreen(createWalletScreen - 1) : setAddWalletOption('')}>Cancel</Button>
      <Spacer />
      <Button variant='solid' onClick={() => setCreateWalletScreen(createWalletScreen + 1)}>{createWalletScreen === 2 ? 'Submit' : 'Next'}</Button>
    </Grid>
  )
}

export const CreateWallet = ({ setAddWalletOption }) => {

  const [createWalletScreen, setCreateWalletScreen] = useState(0);

  return (
    <Grid p={3} templateRows='4rem 1fr 3rem'>
      <VStack spacing={1}>
        <Text borderBottom=''>{createWalletScreen !== 3 ? 'Create Wallet' : 'Wallet Created'}</Text>
        <Divider />
      </VStack>
      {createWalletScreen === 0 ? 
        <WalletCredentials/> 
        : createWalletScreen === 1 ?
          <CreateWalletSeedPhrase/>
          : createWalletScreen === 2 ?
            <CreateWalletSeedPhraseConfirm/>
            : <CreateWalletSuccess/>
      }
      {createWalletScreen !== 3 ?
        <ActionBar 
          createWalletScreen={createWalletScreen}
          setCreateWalletScreen={setCreateWalletScreen}
          setAddWalletOption={setAddWalletOption}/>
        : null
      }
    </Grid>
  )
}

