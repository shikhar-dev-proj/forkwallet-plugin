import { Divider, Flex, Grid, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaGalacticSenate, FaRegCopy } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export const WalletHeader = ({ walletName, walletAddress }) => {
  return (
    <Grid templateRows='4rem 1rem'>
      <Flex justifyContent='space-evenly' alignItems='center'>
        <FaGalacticSenate size={40} />
        <Grid templateRows='1.5rem 1.5rem' ml='1rem' mr='1rem'>
          <Text fontSize='0.75rem' fontWeight={900}>{walletName}</Text>
          <Flex>
            <Text fontSize='0.75rem' mr='0.5rem'>{walletAddress}</Text>
            <FaRegCopy/>
          </Flex>
        </Grid>
        <IconButton aria-label='Menu' icon={<GiHamburgerMenu />} />
      </Flex>
      <Divider/>
    </Grid>
  )
}