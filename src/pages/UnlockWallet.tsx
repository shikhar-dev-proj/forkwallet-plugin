import { Box, Button, Flex, Grid, Link, Spacer, Text, VStack } from "@chakra-ui/react"
import { useSetPassword } from "hooks/usePassword"
import { useTestPassword } from "hooks/useWallet"
import { useState } from "react"
import { BsFillShieldLockFill } from "react-icons/bs"
import { FaGalacticSenate } from "react-icons/fa"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { PasswordInput } from "../reusables/PasswordInput"

export const UnlockWallet = () => {
  const [password, setPassword] = useState('');
  const testPassword = useTestPassword();
  const unlockWalletWithPassword = useSetPassword();
  const [error, setError] = useState(false);
  const submitPassword = (password: string) => {
    if (testPassword(password)) {
      unlockWalletWithPassword(password);
      setError(false);
    } else {
      setError(true);
    }
  }
  return (
    <Box p={3} color='white'>
      <Flex>
        <FaGalacticSenate size={50} />
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <VStack spacing={8}>
        <BsFillShieldLockFill size={100} />
        <Grid textAlign="center" mt={20}>
          <Text paddingBottom={8} fontWeight="bold">Unlock Wallet</Text>
          <PasswordInput hasError={error} value={password} setValue={setPassword} />
          <Link
            justifySelf="flex-end"
            color="teal.500"
            href="https://chakra-ui.com"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="sm"
          >
            Forgot Password?
          </Link>
        </Grid>
        <Button 
          variant='solid'
          width="90%"
          justifySelf="flex-end"
          mt={20}
          disabled={!password}
          onClick={() => submitPassword(password)}>Unlock</Button>
      </VStack>
    </Box>
  )
}