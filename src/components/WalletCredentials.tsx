import { Grid, VStack, Input, Divider } from "@chakra-ui/react"

export const WalletCredentials = ({ setName, setPassword, setRepeatPassword }) => {
  return (
    <Grid templateRows='repeat(3, 5rem)'>
      {/* <VStack spacing={2}> */}
        <Input borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setName(e.target.value)} placeholder='Wallet Name' size='lg' />
      {/* </VStack> */}
      {/* <VStack> */}
        <Input borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' size='lg' />
      {/* </VStack> */}
      {/* <VStack> */}
        <Input borderWidth='0.8px' borderStyle='solid' borderColor='rgba(126, 145, 212, 1)' fontSize='md' fontWeight={600} variant='filled' color='white' _placeholder={{color: '#515A7D'}} background='rgba(255, 255, 255, 0.1)' onChange={(e) => setRepeatPassword(e.target.value)} type='password' placeholder='Re-enter Password' size='lg' />
      {/* </VStack> */}
    </Grid>
  )
}