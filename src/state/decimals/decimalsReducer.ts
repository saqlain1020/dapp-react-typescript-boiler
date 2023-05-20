import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { erc20ABI } from "wagmi";
import { Decimals, FetchDecimalsActionArgs, StateInterface } from "./types";
import { toAddress } from "src/utils/common";
import { getContract } from "wagmi/actions";
import { ZeroAddress } from "src/config/constants";

const initialState: StateInterface = { decimals: {}, isLoading: false, isFetched: false };

export const fetchDecimals = createAsyncThunk(
  "decimals/fetchDecimals",
  async ({ addresses, chainId, publicClient }: FetchDecimalsActionArgs, thunkAPi) => {
    try {
      const addressesSet = new Set<`0x${string}`>();
      addresses.forEach((addr) => {
        addressesSet.add(toAddress(addr));
      });

      const addressesArray = Array.from(addressesSet);

      let promises = addressesArray.map((address) =>
        getContract({
          abi: erc20ABI,
          address,
          walletClient: publicClient,
          chainId,
        }).read.decimals()
      );
      const decimalsResponses = await Promise.all(promises);

      const decimals = decimalsResponses.reduce(
        (accum, decimals, index) => {
          accum[chainId][addressesArray[index]] = decimals;
          return accum;
        },
        { [chainId]: {} } as Decimals
      );

      decimals[chainId][ZeroAddress] = 18;

      return decimals;
    } catch (error) {
      console.log("fetchDecimals error", error);
      throw error;
    }
  }
);

const decimalsSlice = createSlice({
  name: "decimals",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDecimals.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDecimals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.decimals = { ...action.payload };
    });
    builder.addCase(fetchDecimals.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = false;
    });
  },
});

export default decimalsSlice.reducer;
