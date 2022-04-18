import { Button, Grid, Spacer, Text, VStack } from "@chakra-ui/react"
import { FaGalacticSenate } from "react-icons/fa"

export const AddWallet = () => {
  return (
    <>
      <VStack spacing={10}>
        <Spacer />
        <FaGalacticSenate size={100} />
        <Grid gridGap={2}>
          <Text fontSize="2xl" fontWeight="bold">ForkWallet</Text>
          <Text fontSize="xl">Your Gateway to ForkWallet</Text>
        </Grid>
        <Grid gridGap={5}>
          <Button variant='solid' mt={20}>Create Wallet</Button>
          <Button variant='outline'>Import with Seed Phrase</Button>
        </Grid>
      </VStack>
    </>
  )
}