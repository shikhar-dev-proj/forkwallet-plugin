import { Grid, VStack, Input, Divider } from "@chakra-ui/react"

export const WalletCredentials = ({ setName, setPassword, setRepeatPassword }) => {
  return (
    <Grid templateRows='repeat(3, 6rem)'>
      <VStack spacing={2}>
        <Input onChange={(e) => setName(e.target.value)} placeholder='Wallet Name' size='lg' />
        <Divider />
      </VStack>
      <VStack>
        <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' size='lg' />
        <Divider />
      </VStack>
      <VStack>
        <Input onChange={(e) => setRepeatPassword(e.target.value)} type='password' placeholder='Re-enter Password' size='lg' />
        <Divider />
      </VStack>
    </Grid>
  )
}