import {
  Box, Grid
} from "@chakra-ui/react";
import { useInitPasswordState, usePassword } from "hooks/usePassword";
import { useWallet } from "hooks/useWallet";
import React, { useState } from "react";
import { AddWallet } from "./components/AddWallet";
import { TokenList } from "./components/TokenList";
import { UnlockWallet } from './components/UnlockWallet';

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

  const password = usePassword();
  const { wallet, hasWallet } = useWallet();

  const [walletAvailable, setWalletAvailable] = useState(false);
  const backToMain = () => setWalletAvailable(true);

  return (
    <Box 
      background='linear-gradient(180deg, #0F1D4E 0%, #070F2C 100%)'
      textAlign="center"
      fontSize="xl"
      width={320}
      height={600}>
      <Grid height='100%' p={3}>
        {/* <HashRouter> */}
          {/* <Route 
            path="/"
            component={RenderPageBasedOnState}>
          </Route> */}
        {/* </HashRouter> */}
        {/* <UnlockWallet/> */}
        { !hasWallet && !walletAvailable ? 
            <AddWallet back={backToMain}/>
            : hasWallet && !password ?
              <UnlockWallet></UnlockWallet> 
              : hasWallet && !!wallet && !!password ?
                <TokenList/>
                : null
        }
      </Grid>
    </Box>
  );
}
