import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import * as web3Slice from './web3Slice';

export const store: Store = configureStore({
  reducer: {
    web3: web3Slice.default,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'web3/connect/fulfilled',
          'web3/connect/rejected',
          'web3/eth_balance/pending',
          'web3/eth_balance/fulfilled',
          'web3/ERC20_balance/pending',
          'web3/ERC20_balance/fulfilled',
          'web3/ERC20_balance/rejected',
        ],
        ignoredActionPaths: ['payload.proto'],
        // Ignore these paths in the state
        ignoreState: true,
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  web3: web3Slice.Web3SliceState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
