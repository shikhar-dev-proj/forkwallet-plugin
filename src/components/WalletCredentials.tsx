import { Grid, VStack, Input, Divider } from "@chakra-ui/react"

export const WalletCredentials = ({ setName, setPassword, setRepeatPassword }) => {
  return (
    <Grid templateRows='repeat(3, 5rem)'>
      {/* <VStack spacing={2}> */}
        <Input fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setName(e.target.value)} placeholder='Wallet Name' size='lg' />
      {/* </VStack> */}
      {/* <VStack> */}
        <Input fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' size='lg' />
      {/* </VStack> */}
      {/* <VStack> */}
        <Input fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setRepeatPassword(e.target.value)} type='password' placeholder='Re-enter Password' size='lg' />
      {/* </VStack> */}
    </Grid>
  )
}