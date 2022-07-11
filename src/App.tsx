import {
  Box, Grid
} from "@chakra-ui/react";
import { useInitPasswordState, usePassword } from "hooks/usePassword";
import { useWallet } from "hooks/useWallet";
import { useEffect, useState } from "react";
import { AddWallet } from "./pages/AddWallet";
import { TokenList } from "./pages/TokenList";
import { UnlockWallet } from './pages/UnlockWallet';
import { BrowserRouter, Route, useNavigate, Routes } from "react-router-dom";
import { NoRouteFound } from "pages/NoRouteFound";

export const App = () => {


  useInitPasswordState();
  const password = usePassword();
  const { wallet, hasWallet } = useWallet();
  const navigate = useNavigate();
  const [createdWallet, setCreatedWallet] = useState(false);

  useEffect(() => {
    if (!hasWallet && !createdWallet) {
      navigate('/add', {replace: true});
    } else if (!password) {
      navigate('/lock', {replace: true});
    } else if (hasWallet && !!wallet && !!password) {
      navigate('/dashboard', {replace: true});
    } else {
      console.error('No route Defined')
    }
  }, [wallet, hasWallet, password, createdWallet])

  return (
      <Box 
        background='linear-gradient(180deg, #0F1D4E 0%, #070F2C 100%)'
        textAlign="center"
        fontSize="xl"
        width={320}
        height={600}>
        <Grid height='100%' p={3}>
          <Routes>
            <Route path='lock' element={<UnlockWallet/>}/>
            <Route path='add' element={<AddWallet onCreation={setCreatedWallet}/>}/>
            <Route path='dashboard' element={<TokenList/>} />
            <Route path='*' element={<NoRouteFound/>}></Route>
          </Routes>
          {/* { !hasWallet && !walletAvailable ? 
              <AddWallet back={backToMain}/>
              : hasWallet && !password ?
                <UnlockWallet></UnlockWallet> 
                : hasWallet && !!wallet && !!password ?
                  <TokenList/>
                  : null
          } */}
        </Grid>
      </Box>
  );
}
