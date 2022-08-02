import { VStack, Stat, StatLabel, StatNumber, Spinner, StatHelpText, Button, useDisclosure, useToast } from "@chakra-ui/react"
import { useBalance } from "hooks/useBalance";
import { useTransfer } from "hooks/useTransfer";
import { SendModal } from "pages/TokenList"
import { useState } from "react";

export const Deposit = ({}) => {
  const { balance, balanceLoading } = useBalance();
  const { isOpen, onOpen, onClose } = useDisclosure()
 
  const [sendAddress, setSendAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [sendComplete, setSendComplete] = useState(false);

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
    <>
      <VStack m={2}>
        <Stat height='fit-content'>
          <StatLabel color='white'>Account Balance</StatLabel>
          <StatNumber color='white'>{balanceLoading ? <Spinner size='sm'/> : balance}</StatNumber>
          <StatHelpText color='white'>ETH</StatHelpText>
        </Stat>
        <Button variant='solid' mt={20} onClick={onOpen}>Send</Button>
      </VStack>
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
    </>
  )
}