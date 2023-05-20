import { CHAIN_ID } from "src/types/enums";

export interface Addresses {
  wethAddress: string;
  usdcAddress: string;
  usdtAddress: string;
}

const mainnetAddresses: Addresses = {
  wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  usdtAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
};

const arbitrumAddresses: Addresses = {
  wethAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  usdcAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  usdtAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
};

const polygonAddresses: Addresses = {
  wethAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  usdcAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  usdtAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
};

export const CONTRACTS: { [key: number]: Addresses } = {
  [CHAIN_ID.MAINNET]: mainnetAddresses,
  [CHAIN_ID.ARBITRUM]: arbitrumAddresses,
  [CHAIN_ID.POLYGON]: polygonAddresses,
};
