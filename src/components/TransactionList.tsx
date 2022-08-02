import { Box, Flex, Grid, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import { useTransactions } from "hooks/useTransactions"
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi"
import { Transaction, TxType } from "types/common"
import { getTrimmedWalletAddress } from "utils/wallet"

export const Tx = ({ transaction }) => {
  return (
    <Grid width='100%' height='6rem' cursor='pointer' _hover={{background: "#131e42"}} gridTemplateColumns='2rem 1fr 3rem' padding='1rem' gap='1rem' borderBottom='1px solid #222B4B' >
      <Flex height='2rem' width='2rem' justifyContent='center' alignItems='center'  borderRadius='50%' backgroundColor='rgba(255, 255, 255, 0.1)' border='1px solid gba(126, 145, 212, 1)'>
        {transaction.type === TxType.IN ? <FiArrowDownLeft fontSize='1.125rem' color='#36c983'/> : <FiArrowUpRight fontSize='1.125rem' color='#c93774'/>}
      </Flex>
      <VStack alignItems='flex-start'>
        <Text opacity={0.5} fontWeight={400}>{ transaction.type === TxType.IN ? 'Received from' : 'Sent to' }</Text>
        <Text fontSize='1.2rem' fontWeight={500} marginTop='unset !important'>{ getTrimmedWalletAddress(transaction.type === TxType.IN ? transaction.from : transaction.to) }</Text>
        <Text opacity={0.5} fontWeight={400} textAlign='left'>{transaction.date.toString().slice(0, 16)}</Text>
      </VStack>
      <VStack>
        {/* <Text>value</Text> */}
        <Text fontSize='1.2rem' fontWeight={500}>{transaction.type === TxType.OUT ? '- ' : '' + transaction.value} ETH</Text>
      </VStack>
    </Grid>
  )
}

export const TransactionList = () => {

  const { transactions, loading, error } = useTransactions()

  return (
    <>
      {
        error ? 
          <Text color='#c93774'>{error}</Text>
          : loading ?
            <Spinner color='#c93774'/>
          : <VStack fontSize='0.8rem'>
              {
                !transactions.length ?
                  <Text color='white'>No transactions yet</Text>
                  :  transactions.map(t => <Tx transaction={t}/>)}
            </VStack>
      }
    </>
  )
}