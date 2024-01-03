import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli, bsc, bscTestnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient } = configureChains(
  // More chains can be added here
  [mainnet, polygon, optimism, arbitrum, goerli, bsc, bscTestnet, sepolia],
  [
    // Input your alchemy key or use some other provider from wagmi/providers, publicProvider is unreliable
    // alchemyProvider({apiKey: "Your Api Key"}),
    publicProvider(),
  ],
  {
    batch: {
      multicall: {
        batchSize: 4096,
        wait: 500,
      },
    },
  }
);

const { connectors } = getDefaultWallets({
  // appName: should be name set in wallet connect dashboard
  appName: "dapp-typescript-template",
  // projectId can be obtained from https://cloud.walletconnect.com
  // Remove projectId and use your own
  projectId: "94c18b243cf8106f35fa1b73ebcfb242",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
