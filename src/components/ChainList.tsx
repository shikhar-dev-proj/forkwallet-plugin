import { Box, Image, VStack, Text, Flex, Grid, Spacer } from "@chakra-ui/react";
import { supportedChains } from "const";
import { useChain } from "hooks/useChain";
import { FaCheck } from "react-icons/fa";
import { IChain } from "types/common";

export const ChainList = ({ setShowChains }) => {

  const [selectedChain, setSelectedChain] = useChain()

  const setChain = (chain: IChain) => {
    setSelectedChain(chain)
    setShowChains(false)
  }

  return (
    <Box position='fixed' background='rgb(37, 50, 106)' zIndex={10} top={0} bottom={0} left={0} right={0} height='100%' width='100%'>
      <VStack
        height='100%'
        width='100%'
        divider={<Image margin='unset !important' src='/divider.svg' />}
        spacing={4}
        align='stretch'
        background='rgb(37, 50, 106)'
      >
        {supportedChains.map(chain => (
          <Grid padding={2} gridTemplateColumns='2rem 1fr' alignItems='center' h='4rem' bg={chain.name === selectedChain.name ? 'primary.500' : 'rgb(37, 50, 106)'} cursor='pointer' onClick={() => setChain(chain)}>
            {chain.name === selectedChain.name ? <FaCheck color="#27ee27"/> : <Spacer/>}
            <Text textAlign='left' fontSize='1rem' color='white'>{chain.displayName}</Text>
          </Grid>
        ))}
      </VStack>
    </Box>
  )
}