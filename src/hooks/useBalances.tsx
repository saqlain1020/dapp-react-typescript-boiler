import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/state";
import useWallet from "./useWallet";
import { CONTRACTS } from "src/config/constants/contracts";
import { fetchBalances, resetBalances } from "src/state/balances/balancesReducer";

const useBalances = () => {
  const dispatch = useAppDispatch();
  const { chainId, publicClient, currentAddress } = useWallet();
  const { isLoading, balances: balancesByChainId, isFetched } = useAppSelector((state) => state.balances);

  const balances = useMemo(() => {
    if (!chainId) return undefined;
    return balancesByChainId[chainId];
  }, [chainId, balancesByChainId]);

  const reloadBalances = useCallback(() => {
    if (!chainId || !currentAddress || !CONTRACTS[chainId]) {
      dispatch(resetBalances);
      return;
    }
    const addresses: string[] = Object.values(CONTRACTS[chainId]);
    dispatch(fetchBalances({ addresses, publicClient, chainId, currentAddress }));
  }, [chainId, dispatch, publicClient, currentAddress]);

  return {
    /** Only true for first time data fetching */
    isLoading: isLoading && !isFetched,
    isFetched,
    /** True whenever data is being fetched */
    isFetching: isLoading,
    balances,
    reloadBalances,
  };
};

export default useBalances;
