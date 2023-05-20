import { PublicClient } from "wagmi";

export interface StateInterface {
  decimals: Partial<Decimals>;
  isLoading: boolean;
  isFetched: boolean;
}

export interface FetchDecimalsActionArgs {
  chainId: number;
  addresses: string[];
  publicClient: PublicClient;
}

export interface Decimals {
  [chainId: number]: {
    [address: string]: number;
  };
}
