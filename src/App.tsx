// import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Body from "./Body";
import lightTheme from "./config/theme/light";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "./config/walletConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import WalletProvider from "./context/WalletProvider";
// import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains}>
                <WalletProvider>
                  <Body />
                </WalletProvider>
              </RainbowKitProvider>
            </WagmiConfig>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;


