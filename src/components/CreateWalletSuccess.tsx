import { VStack, Button, Text } from "@chakra-ui/react"
import { GiGlassCelebration } from "react-icons/gi"

export const CreateWalletSuccess = ({done}) => {
  return (
    <VStack justifyContent='space-evenly'>
      <Text fontSize='sm'>You can continue using the wallet from the extension</Text>
      <GiGlassCelebration size='xl' color="teal" />
      <Button variant='solid' colorScheme="teal" size='lg' onClick={()=>{done()}}>Done</Button>
    </VStack>
  )
}