import { VStack, Button, Text, Heading, Image } from "@chakra-ui/react"
import { GiGlassCelebration } from "react-icons/gi"
import { useNavigate } from "react-router"

export const CreateWalletSuccess = () => {

  const navigate = useNavigate()
  const done = () => navigate('/dashboard')

  return (
    <VStack justifyContent='space-evenly'>
      <Heading as='h5' size='md' color='white' fontFamily='Inter' fontWeight={600} fontSize='1rem'>
        Your wallet is ready! 🎉
      </Heading>
      <Text fontSize='0.8rem' color='#586BAF' fontWeight={600}>Remember to keep your secret recovery phrase safe.</Text>
      <Image mt={20} src='/divider.svg' />
      <GiGlassCelebration size='xl' color="teal" />
      <Image mt={20} src='/divider.svg' />
      <Text fontSize='0.8rem' color='#586BAF' fontWeight={600}>✨ If you need to check your secret recovery phrase again, you can find it in Settings -&gt; Security.</Text>
      <Button height={12} borderRadius='4px' colorScheme='primary' variant='solid' width='100%' onClick={()=>{done()}}>Done</Button>
    </VStack>
  )
}