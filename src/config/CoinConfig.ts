type CoinType = {
  [key: string]: {
    coinName: string;
    coinTicker: string;
    coinBalance: string;
    coinPrice: string;
    coinPercentChange: string;
    coinIcon: string;
  };
};

export const COINS: CoinType = {
  ETH: {
    coinName: 'Ethereum',
    coinTicker: 'ETH',
    coinBalance: '75000',
    coinPrice: '100',
    coinPercentChange: '+1.5',
    coinIcon: '/TokenIcons/ETHIcon.svg',
  },
  USDC: {
    coinName: 'USD Coin',
    coinTicker: 'USDC',
    coinBalance: '2.5',
    coinPrice: '1',
    coinPercentChange: '-2.5',
    coinIcon: '/TokenIcons/UCDCIcon.svg',
  },
  DAI: {
    coinName: 'Dai',
    coinTicker: 'DAI',
    coinBalance: '20000',
    coinPrice: '0.9998',
    coinPercentChange: '0',
    coinIcon: '/TokenIcons/DAIIcon.svg',
  },
};
