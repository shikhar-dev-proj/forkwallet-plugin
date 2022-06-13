import { Button, Grid, Heading, Input, InputGroup, InputRightAddon, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, useClipboard, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useBalance } from "hooks/useBalance";
import { useSetPassword } from "hooks/usePassword";
import { useTransfer } from "hooks/useTransfer";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { FooterNav } from "./FooterNav";
import { WalletHeader } from "./WalletHeader";

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
  const { balance, balanceLoading } = useBalance();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const wallet = walletState?.wallet?.wallet;
  const walletName = walletState?.wallet?.name;
  const walletAddress = wallet?.address;
  const { hasCopied, onCopy } = useClipboard(walletAddress!);
  const trimmedAddress = walletAddress?.slice(0,4) + '....' + walletAddress?.slice(walletAddress.length-4, walletAddress.length);

  const [sendAddress, setSendAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [sendComplete, setSendComplete] = useState(false);

  const lockWallet = () => setPassword(undefined);
  const [sendInProgress, setSendInProgress] = useState(false);
  const transfer = useTransfer();
  const toast = useToast()


  const initiateTransfer = async () => {
    setSendInProgress(true);
    try {
      const sendReceipt = await transfer(transferAmount, sendAddress);
      console.log('SEND RECEIPT =====> ', sendReceipt)
      if (!!sendReceipt) {
        setSendComplete(true);
        onClose()
        const txURL = `https://goerli.etherscan.io/tx/${sendReceipt.hash}`;
        setSendInProgress(false);
        toast({
          title: 'Transfer Complete',
          description: `Fetch transaction from: ${txURL}`,
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
          containerStyle: {
            maxWidth: '90%'
          }
        })
      }
    } catch (err) {
      console.error(err)
      setSendInProgress(false);
    }
  }

  return (
    <Grid templateRows='5rem 1fr 4rem'>
      <WalletHeader walletAddress={trimmedAddress} onCopy={onCopy} hasCopied={hasCopied} walletName={walletName} lockWallet={lockWallet} />
      <VStack m={2}>
        <Stat height='fit-content'>
          <StatLabel>Account Balance</StatLabel>
          <StatNumber>{balanceLoading ? <Spinner size='sm'/> : balance}</StatNumber>
          <StatHelpText>ETH</StatHelpText>
        </Stat>
        <Button variant='solid' mt={20} onClick={onOpen}>Send</Button>
      </VStack>
      <FooterNav />
      <SendModal 
        isOpen={isOpen}
        onClose={onClose}
        sendAddress={sendAddress}
        setSendAddress={setSendAddress}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        maxBalance={balance}
        initiateTransfer={initiateTransfer}
        sendInProgress={sendInProgress}
        sendComplete={sendComplete}
        />
    </Grid>
  )
}