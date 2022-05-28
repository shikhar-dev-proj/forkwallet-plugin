import {
  Box, Grid
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddWallet } from "./components/AddWallet";
import { TokenList } from "./components/TokenList";
import { LoadWeb3 } from "./store/web3/action-creator";
import * as bip39 from 'bip39';
import { HashRouter, Route } from 'react-router-dom';
import { useInitPasswordState } from "hooks/usePassword";
import { useWallet } from "hooks/useWallet";

// export const RenderPageBasedOnState = () => {
//   const walletState = useSelector((state: AppState) => state.wallet);
//   // if (wallet.)
// }

export const App = () => {

  // const dispatch = useDispatch();
  // const web3Data = useSelector((state: AppState) => state.web3);
  // window.web3 = web3Data;
  // console.log(web3Data);
  
  // useEffect(() => {
  //   dispatch(LoadWeb3());
  // }, [dispatch]);
  useInitPasswordState();
  const wallet = useWallet();

  const [walletAvailable, setWalletAvailable] = useState(false);
  const backToMain = () => setWalletAvailable(true);

  return (
    <Box textAlign="center" fontSize="xl" width={320} height={600}>
      <Grid height='100%' p={3}>
        {/* <HashRouter> */}
          {/* <Route 
            path="/"
            component={RenderPageBasedOnState}>
          </Route> */}
        {/* </HashRouter> */}
        {/* <UnlockWallet/> */}
        { !wallet ? 
          <AddWallet back={backToMain}/>
          : <TokenList />
        }
      </Grid>
    </Box>
  );
}
