import { Divider, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaGalacticSenate, FaRegCopy } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

export const WalletHeader = ({ walletName, walletAddress, lockWallet }) => {
  return (
    <Grid templateRows='4rem 1rem'>
      <Flex justifyContent='space-evenly' alignItems='center'>
        <FaGalacticSenate size={40} />
        <Grid templateRows='1.5rem 1.5rem' ml='1rem' mr='1rem'>
          <Text fontSize='0.75rem' fontWeight={900}>{walletName}</Text>
          <Flex>
            <Text fontSize='0.75rem' mr='0.5rem'>{walletAddress}</Text>
            <FaRegCopy />
          </Flex>
        </Grid>
        <IconButton aria-label='Lock' icon={<BsFillShieldLockFill />} onClick={lockWallet} />
      </Flex>
      <Divider />
    </Grid>
  )
}