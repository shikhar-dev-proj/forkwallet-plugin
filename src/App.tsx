import * as React from "react";
import {
  Box, ChakraProvider, Grid,
  theme
} from "@chakra-ui/react";
import { UnlockWallet } from "./components/UnlockWallet";
import { AddWallet } from "./components/AddWallet";
import { CreateWallet } from "./components/CreateWallet";
import { TokenList } from "./components/TokenList";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" width={320} height={600}>
      <Grid minH="100vh" p={3}>
        {/* <UnlockWallet/> */}
        {/* <AddWallet/> */}
        {<TokenList/>}
      </Grid>
    </Box>
  </ChakraProvider>
)
