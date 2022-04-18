import { Button, Divider, Flex, Grid, HStack, Input, Spacer, Text, VStack } from "@chakra-ui/react"

export const CreateWallet = () => {
  return (
    <Grid p={3} templateRows='4rem 1fr 3rem'>
      <VStack spacing={1}>
        <Text borderBottom=''>Create Wallet</Text>
        <Divider />
      </VStack>
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
      <Grid templateColumns='5rem 1fr 5rem'>
        <Button variant='outline'>Cancel</Button>
        <Spacer />
        <Button variant='solid'>Next</Button>
      </Grid>
    </Grid>
  )
}