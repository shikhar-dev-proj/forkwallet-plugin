import { Button, Flex, Grid, Link, Spacer, Text, VStack } from "@chakra-ui/react"
import { useSetPassword } from "hooks/usePassword"
import { useState } from "react"
import { BsFillShieldLockFill } from "react-icons/bs"
import { FaGalacticSenate } from "react-icons/fa"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { PasswordInput } from "./PasswordInput"

export const UnlockWallet = () => {
  const [password, setPassword] = useState('');
  const unlockWalletWithPassword = useSetPassword();
  return (
    <>
      <Flex>
        <FaGalacticSenate size={50} />
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <VStack spacing={8}>
        <BsFillShieldLockFill size={100} />
        <Grid textAlign="center" mt={20}>
          <Text paddingBottom={8} fontWeight="bold">Unlock Wallet</Text>
          <PasswordInput value={password} setValue={setPassword} />
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
          onClick={() => unlockWalletWithPassword(password)}>Unlock</Button>
      </VStack>
    </>
  )
}