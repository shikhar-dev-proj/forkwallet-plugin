import { Divider, Flex, Grid, IconButton, Image, Text } from "@chakra-ui/react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaClipboardCheck, FaGalacticSenate, FaRegCopy } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

export const WalletHeader = ({ walletName, walletAddress, lockWallet, onCopy, hasCopied }) => {
  return (
    <Grid templateRows='4rem 1rem'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Image height={8} width={8} src='./ForkLogo.svg' />
        <Grid templateRows='1.5rem 1.5rem' ml='1rem' mr='1rem'>
          <Text fontSize='0.8rem' color='white' fontWeight={900}>{walletName}</Text>
          <Flex>
            <Text fontSize='0.75rem' mr='0.5rem' color='#7680A4'>{walletAddress}</Text>
            {hasCopied ? <FaClipboardCheck color="green"/> : <FaRegCopy onClick={onCopy}/>}
          </Flex>
        </Grid>
        <IconButton aria-label='Lock' icon={<BsFillShieldLockFill />} onClick={lockWallet} />
      </Flex>
      <Divider />
    </Grid>
  )
}