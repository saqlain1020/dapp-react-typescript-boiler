import { parseUnits, formatUnits, getAddress } from "viem";

export const truncateAddress = (address?: string) => {
  return address ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : undefined;
};

export const toWei = (value: `${number}`, decimals = 18) => {
  return parseUnits(value, decimals);
};

export const toEth = (value: bigint | string, decimals = 18) => {
  return formatUnits(BigInt(value), decimals);
};

export const toAddress = (address: string) => {
  return getAddress(address);
};

type AwaitTransactionResponse = { status: true; txHash: string } | { status: false; error: string };

export const awaitTransaction = async (tx: Promise<`0x${string}`>): Promise<AwaitTransactionResponse> => {
  try {
    const txHash = await tx;
    return {
      status: true,
      txHash,
    };
  } catch (error: any) {
    console.log("Await Transaction Error: ", error);
    return {
      status: false,
      error: error.shortMessage as string,
    };
  }
};
