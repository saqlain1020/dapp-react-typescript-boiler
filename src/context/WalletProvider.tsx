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

interface IWalletContext {
  /**
   * The current connect wallet address
   */
  currentAddress?: `0x${string}`;

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
}

export const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

interface IProps {
  children: React.ReactNode;
}

const WalletProvider: React.FC<IProps> = ({ children }) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { switchNetworkAsync, chains } = useSwitchNetwork();
  const { address: currentAddress } = useAccount();
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
