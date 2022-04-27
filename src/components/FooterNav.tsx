import { HStack } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import { GiCrystalShine } from "react-icons/gi";
import { BiDirections } from 'react-icons/bi';
import { IoIosPulse, IoMdSettings } from 'react-icons/io';

export const FooterNav = () => {
  return (
    <HStack justifyContent='space-around' background='#25326a' borderRadius='0.625rem'>
      <FaCoins/>
      <GiCrystalShine/>
      <BiDirections/>
      <IoIosPulse/>
      <IoMdSettings/>
    </HStack>
  )
}