import { Grid, VStack, Input, Divider } from "@chakra-ui/react"

export const WalletCredentials = () => {
  return (
    <Grid templateRows='repeat(3, 6rem)'>
      <VStack spacing={2}>
        <Input placeholder='Wallet Name' size='lg' />
        <Divider />
      </VStack>
      <VStack>
        <Input placeholder='Password' size='lg' />
        <Divider />
      </VStack>
      <VStack>
        <Input placeholder='Re-enter Password' size='lg' />
        <Divider />
      </VStack>
    </Grid>
  )
}