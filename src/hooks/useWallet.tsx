import { useContext } from "react";
import { WalletContext } from "src/context/WalletProvider";

const useWallet = () => {
  return useContext(WalletContext);
};

export default useWallet;
