import { PublicClient } from "wagmi";

export interface StateInterface {
  balances: Partial<Balances>;
  isLoading: boolean;
  isFetched: boolean;
}

export interface FetchBalancesActionArgs {
  chainId: number;
  addresses: string[];
  publicClient: PublicClient;
  currentAddress: `0x${string}`;
}

export interface Balances {
  [chainId: number]: {
    [address: string]: string;
  };
}
