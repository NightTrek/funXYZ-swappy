/* eslint-disable no-param-reassign */
import { configureEnvironment, FunWallet } from '@fun-wallet/sdk';
import { Eoa } from '@fun-wallet/sdk/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { API_KEY } from '../../seceret';

const options = {
  chain: 'ethereum-goerli',
  apiKey: API_KEY,
  gasSponsor: false,
};

const minABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

type ConnectWeb3Payload = {
  wallet: FunWallet | null;
  signer: ethers.providers.JsonRpcSigner | null;
  eoa: Eoa | null;
  account: string | null;
  error: string | null;
};

export const ConnectWeb3 = createAsyncThunk(
  'web3/connect',
  // Declare the type your function argument here:
  async () => {
    try {
      await configureEnvironment(options);
      const provider = new ethers.providers.Web3Provider(
        window?.ethereum,
        'any'
      );
      const signer = provider.getSigner();
      const auth = new Eoa({ signer });
      const uniqueId = await auth.getUniqueId();
      const wallet = new FunWallet({ uniqueId, salt: 1 });

      return {
        wallet,
        signer,
        eoa: auth,
        account: await wallet.getAddress(options),
        error: null,
      } as ConnectWeb3Payload;
    } catch (err) {
      console.log('error', err);
      const Error = err as Error;
      return { error: Error.message } as ConnectWeb3Payload;
    }
  }
);

interface EthBalanceRequest {
  signer: ethers.providers.JsonRpcSigner;
  walletAddress: string;
}
export const getEthBalance = createAsyncThunk(
  'web3/eth_balance',
  // Declare the type your function argument here:
  async (req: EthBalanceRequest, thunkApi) => {
    try {
      const balance = await req.signer.provider.getBalance(req.walletAddress);
      return balance;
    } catch (err) {
      console.log('error', err);
      const Error = err as Error;
      return thunkApi.rejectWithValue(Error.message);
    }
  }
);

interface Erc20BalanceRequest {
  coinTicker: string;
  contractAddress: string;
  walletAddress: string;
  signer: ethers.providers.JsonRpcSigner;
}

export const getERC20Balance = createAsyncThunk(
  'web3/ERC20_balance',
  // Declare the type your function argument here:
  async (request: Erc20BalanceRequest, thunkApi) => {
    console.log(request);
    if (!request.walletAddress || !request.contractAddress) return;
    try {
      const contract = new ethers.Contract(
        request.contractAddress,
        minABI,
        request.signer
      );
      const balance = await contract.balanceOf(request.walletAddress);
      return { [request.coinTicker]: balance };
    } catch (err) {
      const Error = err as Error;
      return thunkApi.rejectWithValue(Error.message);
    }
  }
);

interface GetPriceRequest {
  coinTo: string;
  coinFrom: string;
}

export const getPrice = createAsyncThunk(
  'web3/price',
  async (req: GetPriceRequest, thunkApi) => {
    try {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${req.coinTo}&tsyms=${req.coinFrom}&api_key=abed159250da6c8c80fa9fa339936ce37717aab04009ea59352babe0d019d4a5`
      );
      if (!res.ok) return thunkApi.rejectWithValue('Failed to fetch');
      const data = await res.json();
      console.log(data);
      return {
        [`${req.coinTo}_${req.coinFrom}`]: data[req.coinTo][req.coinFrom],
      };
    } catch (err) {
      console.log(err);
      const Error = err as Error;
      return thunkApi.rejectWithValue(Error.message);
    }
  }
);

export type Web3SliceState = {
  wallet: FunWallet | null;
  signer: ethers.providers.JsonRpcSigner | null;
  eoa: Eoa | null;
  account: string | null;
  error: string | null;
  totalWalletBalance: number;
  balance: ethers.BigNumber | null;
  ERC20: { [key: string]: ethers.BigNumber };
  prices: { [key: string]: string };
};

// Define the initial state using that type
const initialState: Web3SliceState = {
  wallet: null,
  signer: null,
  eoa: null,
  account: null,
  error: null,
  totalWalletBalance: 0,
  balance: null,
  ERC20: { WETH: ethers.BigNumber.from(0) },
  prices: {},
};

export const web3Slice = createSlice({
  name: 'wallet',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToTotalBalance: (state, action: PayloadAction<string>) => {
      state.totalWalletBalance += parseFloat(action.payload);
    },
    resetTotalBalance: (state) => {
      state.totalWalletBalance = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ConnectWeb3.fulfilled, (state, { payload }) => {
      state.wallet = payload?.wallet;
      state.signer = payload?.signer;
      state.eoa = payload?.eoa;
      state.account = payload?.account;
    });
    builder.addCase(ConnectWeb3.rejected, (state, action) => {
      const errorMessage = action.payload as ConnectWeb3Payload;
      state.error = errorMessage.error;
    });
    builder.addCase(getEthBalance.fulfilled, (state, { payload }) => {
      state.balance = payload;
    });
    builder.addCase(getEthBalance.rejected, (state, action) => {
      if (action.payload) {
        const errorMessage = action.payload as string;
        state.error = errorMessage;
      } else {
        state.error = action.error as string;
      }
    });
    builder.addCase(getERC20Balance.fulfilled, (state, { payload }) => {
      state.ERC20 = { ...state.ERC20, ...payload };
    });
    builder.addCase(getERC20Balance.rejected, (state, action) => {
      if (action.payload) {
        const errorMessage = action.payload as string;
        state.error = errorMessage;
      } else {
        state.error = action.error as string;
      }
    });
    builder.addCase(getPrice.fulfilled, (state, { payload }) => {
      state.prices = { ...state.prices, ...payload };
    });
    builder.addCase(getPrice.rejected, (state, action) => {
      state.error = action.error as string;
    });
  },
});

export const { addToTotalBalance, resetTotalBalance } = web3Slice.actions;

export default web3Slice.reducer;
