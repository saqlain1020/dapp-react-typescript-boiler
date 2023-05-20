import { parseUnits, formatUnits, getAddress } from "viem";

export const truncateAddress = (address?: string) => {
  return address ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : undefined;
};

export const toWei = (value: `${number}`, decimals = 18) => {
  return parseUnits(value, decimals);
};

export const toEth = (value: bigint, decimals = 18) => {
  return formatUnits(value, decimals);
};

export const toAddress = (address: string) => {
  return getAddress(address);
};
