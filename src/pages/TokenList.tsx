import { Button, Grid, Heading, Input, InputGroup, InputRightAddon, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, useClipboard, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Deposit } from "components/Deposit";
import { TransactionList } from "components/TransactionList";
import { supportedChains } from "const";
import { useBalance } from "hooks/useBalance";
import { useSetPassword } from "hooks/usePassword";
import { useTransfer } from "hooks/useTransfer";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useRecoilState } from "recoil";
import { getTrimmedWalletAddress } from "utils/wallet";
import { FooterNav } from "../components/FooterNav";
import { WalletHeader } from "../components/WalletHeader";

export const SendModal = ({
  isOpen,
  onClose,
  sendAddress,
  setSendAddress,
  transferAmount,
  setTransferAmount,
  maxBalance,
  initiateTransfer,
  sendInProgress,
  sendComplete
}) => {
  return (
    <Modal size='sm' isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='90%'>
          <ModalHeader>Send Ether</ModalHeader>
          <ModalBody>
            <Input placeholder='Enter Address' value={sendAddress} onChange={(e) => setSendAddress(e.target.value)}></Input>
            <InputGroup marginTop={2} size='md' borderRadius={2}>
              <Input placeholder='Enter Value' value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}/>
              <InputRightAddon children='ETH' />
            </InputGroup>
          </ModalBody>
  
          <ModalFooter>
            <Button 
              colorScheme='blue'
              mr={3}
              disabled={!sendAddress || !transferAmount || transferAmount >= maxBalance}
              isLoading={sendInProgress}
              onClick={() => {initiateTransfer()}}>
              Send
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export const TokenList = () => {

  const walletState = useWallet()
  const setPassword = useSetPassword()
  const wallet = walletState?.wallet?.wallet;
  const walletName = walletState?.wallet?.name;
  const walletAddress = wallet?.address;
  const { hasCopied, onCopy } = useClipboard(walletAddress!);
  const trimmedAddress = getTrimmedWalletAddress(walletAddress!)
  const lockWallet = () => setPassword(undefined);

  const [activeLink, setActiveLink] = useState('deposit')

  

  return (
    <Grid templateRows='4rem 1fr 4.8rem'>
      <WalletHeader
        walletAddress={trimmedAddress}
        onCopy={onCopy}
        hasCopied={hasCopied}
        walletName={walletName}
        lockWallet={lockWallet} />
      {
        activeLink === 'deposit' ?
          <Deposit/>
          : activeLink === 'activity' ?
            <TransactionList/>
            : null
      }
      
      <FooterNav activeLink={activeLink} setActiveLink={setActiveLink} />
      
    </Grid>
  )
}