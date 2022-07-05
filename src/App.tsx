import {
  Box, Grid
} from "@chakra-ui/react";
import { useInitPasswordState, usePassword } from "hooks/usePassword";
import { useWallet } from "hooks/useWallet";
import { useEffect, useState } from "react";
import { AddWallet } from "./components/AddWallet";
import { TokenList } from "./components/TokenList";
import { UnlockWallet } from './components/UnlockWallet';
import { BrowserRouter, Route, useNavigate, Routes } from "react-router-dom";

export const App = () => {

  useInitPasswordState();
  const password = usePassword();
  const { wallet, hasWallet } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasWallet) {
      navigate('/add');
    } else if (!password) {
      navigate('/lock');
    } else {
      navigate('/dashboard');
    }
  }, [])

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
              <Route path='add' element={<AddWallet />}/>
              <Route path='dashboard' element={<TokenList/>} />
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
