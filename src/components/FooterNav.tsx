import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCoins } from "react-icons/fa";
import { FiActivity, FiCompass, FiSettings } from "react-icons/fi";


export const FooterNav = ({ activeLink, setActiveLink }) => {
  return (
    <VStack position='absolute' gap='0.5rem' left={0} right={0} bottom={0} height='4.8rem' background='#050B21'>
      <Image margin='unset !important' src='/divider.svg' />
      <HStack justifyContent='space-around' width='100%' height='100%' alignItems='center'>
        <VStack
          height='100%'
          justifyContent='flex-end'
          paddingBottom='0.8rem'
          borderBottom={activeLink === 'deposit' ? '3px solid #DDE5FF' : 'unset'}
          onClick={() => setActiveLink('deposit')}>
          <FiCompass color={activeLink === 'deposit' ? 'white' : '#758AD4'} />
          <Text color={activeLink === 'deposit' ? 'white' : '#758AD4'} fontSize='0.8rem'>Deposit</Text>
        </VStack>
        <VStack
          height='100%'
          justifyContent='flex-end'
          paddingBottom='0.8rem'
          borderBottom={activeLink === 'earnings' ? '3px solid #DDE5FF' : 'unset'}
          onClick={() => setActiveLink('earnings')}>
          <FaCoins color={activeLink === 'earnings' ? 'white' : '#758AD4'} />
          <Text color={activeLink === 'earnings' ? 'white' : '#758AD4'} fontSize='0.8rem'>Earnings</Text>
        </VStack>
        <VStack
          height='100%'
          justifyContent='flex-end'
          paddingBottom='0.8rem'
          borderBottom={activeLink === 'activity' ? '3px solid #DDE5FF' : 'unset'}
          onClick={() => setActiveLink('activity')}>
          <FiActivity color={activeLink === 'activity' ? 'white' : '#758AD4'} />
          <Text color={activeLink === 'activity' ? 'white' : '#758AD4'} fontSize='0.8rem'>Activity</Text>
        </VStack>
        <VStack
          height='100%'
          justifyContent='flex-end'
          paddingBottom='0.8rem'
          borderBottom={activeLink === 'settings' ? '3px solid #DDE5FF' : 'unset'}
          onClick={() => setActiveLink('settings')}>
          <FiSettings color={activeLink === 'settings' ? 'white' : '#758AD4'} />
          <Text color={activeLink === 'settings' ? 'white' : '#758AD4'} fontSize='0.8rem'>Settings</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}