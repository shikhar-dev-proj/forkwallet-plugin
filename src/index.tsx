import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import './polyfill'
import { Provider } from "react-redux"
// import {store} from "./store"
import { RecoilRoot } from "recoil"

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ColorModeScript initialColorMode="light" />
      <ChakraProvider theme={theme}>
        {/* <Provider store={store}> */}
          <RecoilRoot>
            <App />
          </RecoilRoot>
        {/* </Provider> */}
      </ChakraProvider>
  </StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
