import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { erc20ABI } from "wagmi";
import { Balances, FetchBalancesActionArgs, StateInterface } from "./types";
import { toAddress } from "src/utils/common";
import { getContract } from "wagmi/actions";
import { ZeroAddress } from "src/config/constants";

const initialState: StateInterface = { balances: {}, isLoading: false, isFetched: false };

export const fetchBalances = createAsyncThunk(
  "balances/fetchBalances",
  async ({ addresses, chainId, publicClient, currentAddress }: FetchBalancesActionArgs, thunkAPi) => {
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
        }).read.balanceOf([currentAddress])
      );
      const balancesResponses = await Promise.all(promises);

      const balances = balancesResponses.reduce(
        (accum, balance, index) => {
          accum[chainId][addressesArray[index]] = balance.toString();
          return accum;
        },
        { [chainId]: {} } as Balances
      );

      const bal = await publicClient.getBalance({ address: currentAddress });
      balances[chainId][ZeroAddress] = bal.toString();
      return balances;
    } catch (error) {
      console.log("fetchBalances error", error);
      throw error;
    }
  }
);

const balancesSlice = createSlice({
  name: "balances",
  initialState: initialState,
  reducers: {
    resetBalances: (state) => {
      state.balances = {};
      state.isFetched = false;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBalances.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBalances.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.balances = { ...action.payload };
    });
    builder.addCase(fetchBalances.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = false;
    });
  },
});

export const { resetBalances } = balancesSlice.actions;

export default balancesSlice.reducer;
