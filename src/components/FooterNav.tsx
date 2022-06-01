import { HStack, Text, VStack } from "@chakra-ui/react";
import { BsCreditCard } from "react-icons/bs";
import { FaCoins, FaGem } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';

export const FooterNav = () => {
  return (
    <HStack justifyContent='space-evenly' background='#25326a' borderRadius='0.625rem'>
      <VStack justifyContent='space-evenly' alignContent='center'>
        <FaGem color="white"/>
        <Text color="white" fontSize='xs'>NFT</Text>
      </VStack>
      <VStack justifyContent='space-evenly' alignContent='center'>
        <FaCoins color="white"/>
        <Text color="white" fontSize='xs'>Defi</Text>
      </VStack>
      <VStack justifyContent='space-evenly' alignContent='center'>
        <BsCreditCard color="white"/>
        <Text color="white" fontSize='xs'>Credit Card</Text>
      </VStack>
      <VStack justifyContent='space-evenly' alignContent='center'>
        <IoMdSettings color="white"/>
        <Text color="white" fontSize='xs'>Settings</Text>
      </VStack>
    </HStack>
  )
}