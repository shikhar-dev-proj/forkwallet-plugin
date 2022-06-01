import { Box, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { BsCreditCard } from "react-icons/bs";
import { FaCoins, FaGem } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';

export const FooterNav = () => {
  return (
    <HStack justifyContent='space-evenly' background='#25326a' borderRadius='0.625rem'>
      <Tooltip hasArrow label='NFT' placement='top'>
        <Box>
          <FaGem color="white"/>
        </Box>
      </Tooltip>
      <Tooltip hasArrow label='Defi' placement='top'>
        <Box>
          <FaCoins color="white"/>
        </Box>
      </Tooltip>
      <Tooltip hasArrow label='Credit Card' placement='top'>
        <Box>
          <BsCreditCard color="white"/>
        </Box>
      </Tooltip>
      <Tooltip hasArrow label='Settings' placement='top'>
        <Box>
          <IoMdSettings color="white"/>
        </Box>
      </Tooltip>
        <IoMdSettings color="white"/>
    </HStack>
  )
}