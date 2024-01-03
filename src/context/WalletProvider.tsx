import React from "react";
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  Chain,
  useBalance,
  useWalletClient,
  usePublicClient,
  PublicClient,
  WalletClient,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { truncateAddress } from "src/utils/common";
import { FetchBalanceResult } from "wagmi/actions";
import { providers } from "ethers";
import { Address } from "viem";

interface IWalletContext {
  /**
   * The current connect wallet address
   */
  currentAddress?: Address;

  /**
   * The current connected wallet address truncated
   */
  displayAccount?: string;

  /**
   * Connect wallet modal open for connecting any wallet
   * @returns void
   */
  connectWallet: () => void;

  /**
   * The current chain id in number form e.g 5
   */
  chainId?: number;

  /**
   * Disconnect wallet and logout user
   * @returns void
   */
  logout: () => void;
  publicClient: PublicClient;
  walletClient?: WalletClient;
  /**
   * Balance of the native eth that the user has
   */
  balance: FetchBalanceResult | undefined;
  switchNetworkAsync: ((chainId_?: number | undefined) => Promise<Chain>) | undefined;
  chains: Chain[];
  /**
   * Ether JS Signer for compatibility with ethers.js dependent libraries, advised against using this unless necessary
   */
  signer?: providers.JsonRpcSigner;
}

export const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

interface IProps {
  children: React.ReactNode;
}

const WalletProvider: React.FC<IProps> = ({ children }) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { switchNetworkAsync, chains } = useSwitchNetwork();
  const [signer, setSigner] = React.useState<providers.JsonRpcSigner | undefined>();
  const { address: currentAddress, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const [chainId, setChainId] = React.useState<number>();
  const { openConnectModal } = useConnectModal();
  const { data: balance } = useBalance({
    address: currentAddress,
    watch: true,
  });

  const connectWallet = async () => {
    if (openConnectModal) openConnectModal();

    return false;
  };

  async function logout() {
    disconnect();
  }

  const displayAccount = React.useMemo(() => truncateAddress(currentAddress), [currentAddress]);

  React.useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
    if (!currentAddress) {
      setChainId(undefined);
    }
  }, [chain]);

  React.useEffect(() => {
    (async function () {
      try {
        const _provider = await connector?.getProvider();
        if (!_provider) return setSigner(undefined);
        const provider = new providers.Web3Provider(_provider);

        const _signer = provider.getSigner();
        if (_signer) {
          setSigner(_signer);
        } else {
          setSigner(undefined);
        }
      } catch (error) {
        console.log(error);
        setSigner(undefined);
      }
    })();
  }, [connector, chainId, currentAddress]);

  return (
    <WalletContext.Provider
      value={{
        currentAddress,
        connectWallet,
        chainId,
        logout,
        displayAccount,
        publicClient,
        walletClient: walletClient ? walletClient : undefined,
        balance,
        switchNetworkAsync,
        chains,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
