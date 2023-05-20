import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/state";
import { fetchDecimals } from "src/state/decimals/decimalsReducer";
import useWallet from "./useWallet";
import { CONTRACTS } from "src/config/constants/contracts";

const useDecimals = () => {
  const dispatch = useAppDispatch();
  const { chainId, publicClient } = useWallet();
  const { isLoading, decimals: decimalsByChainId, isFetched } = useAppSelector((state) => state.decimals);

  const decimals = useMemo(() => {
    if (!chainId) return undefined;
    return decimalsByChainId[chainId];
  }, [chainId, decimalsByChainId]);

  const reloadDecimals = useCallback(() => {
    if (!chainId) return;
    const addresses: string[] = Object.values(CONTRACTS[chainId]);
    dispatch(fetchDecimals({ addresses, publicClient, chainId }));
  }, [chainId, dispatch, publicClient]);

  return { isLoading: isLoading && !isFetched, isFetched, isFetching: isLoading, decimals, reloadDecimals };
};

export default useDecimals;
