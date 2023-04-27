export type Coin = {
  coinName: string;
  coinTicker: string;
  coinBalance: string;
  coinPrice: string;
  coinPercentChange: string;
  coinIcon: string;
  address: string;
  decimals: number;
};

export type CoinType = {
  [key: string]: Coin;
};

export const COINS: CoinType = {
  ETH: {
    coinName: 'Ethereum',
    coinTicker: 'ETH',
    coinBalance: '75000',
    coinPrice: '100',
    coinPercentChange: '+1.5',
    coinIcon: '/TokenIcons/ETHIcon.svg',
    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    decimals: 18,
  },
  USDC: {
    coinName: 'USD Coin',
    coinTicker: 'USDC',
    coinBalance: '2.5',
    coinPrice: '1',
    coinPercentChange: '-2.5',
    coinIcon: '/TokenIcons/USDCIcon.svg',
    address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    decimals: 6,
  },
  DAI: {
    coinName: 'Dai',
    coinTicker: 'DAI',
    coinBalance: '20000',
    coinPrice: '0.9998',
    coinPercentChange: '0',
    coinIcon: '/TokenIcons/DAIIcon.svg',
    address: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
    decimals: 18,
  },
};
