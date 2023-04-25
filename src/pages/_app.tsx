import '@/styles/globals.css';

import { configureEnvironment, FunWallet } from '@fun-wallet/sdk';
import { Eoa } from '@fun-wallet/sdk/auth';
import { ethers } from 'ethers';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { API_KEY } from '../../seceret';
import { store } from '../redux/store';

const options = {
  chain: 'ethereum-goerli',
  apiKey: API_KEY,
  gasSponsor: false,
};


const makeWallet = async () => {
  await configureEnvironment(options);
  const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');
  await provider.send('eth_requestAccounts', []);
  const eoa = provider.getSigner();
  const auth = new Eoa({ signer: eoa });

  // Get FunWallet associated with EOA
  const uniqueId = await auth.getUniqueId();
  console.log(uniqueId);
  const wallet = new FunWallet({ uniqueId });
};

export default function App({ Component, pageProps }: AppProps) {
  makeWallet();
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
