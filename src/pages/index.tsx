import { BigNumber } from 'ethers';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rocketship, { RocketshipSize } from '@/components/Rocketship';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { COINS } from '@/config/CoinConfig';
import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
import {
  addToTotalBalance,
  getERC20Balance,
  getEthBalance,
  getPrice,
} from '@/redux/web3Slice';
import { Main } from '@/templates/Main';
import Text from '@/utils/text';

type IWalletHeroProps = {
  TotalBalance: string;
};
const WalletHero = (props: IWalletHeroProps) => (
  <div className="flex items-center justify-center py-4">
    <div className="flex flex-col items-center justify-start">
      <Rocketship size={RocketshipSize.MEDIUM} />
      <div className="mt-4 text-lg leading-6 text-slate-400	">
        Wallet Balance
      </div>
      <div className="text-4xl font-bold leading-10 text-black">
        {' '}
        $ {props.TotalBalance}{' '}
      </div>
    </div>
  </div>
);

const WalletButtons = () => (
  <div className="flex w-full items-center justify-between pb-6">
    <StyledButton
      buttonLink="/swap"
      buttonText="Swap"
      buttonIcon="/Icons/Swap.svg"
      buttonColor={ButtonColor.LIGHT}
      className="mr-2"
    />
    <StyledButton
      buttonLink="/"
      buttonText="Send"
      buttonIcon="/Icons/Arrow-Up-Circle.svg"
      buttonColor={ButtonColor.DARK}
      innerStyles="opacity-90"
    />
  </div>
);

type IWalletCoinBalanceListItemProps = {
  coinName: string;
  coinTicker: string;
  coinBalance: string;
  coinPrice: string;
  coinPercentChange: string;
  coinIcon: string;
};

const walletChangeColor = (percentChange: string) => {
  if (percentChange[0] === '-') return 'bg-red-200 text-funAlert-200';
  if (percentChange[0] === '+') return 'bg-green-200 text-funAlert-100';
  return 'bg-gray-200 text-funGrey-200';
};

const WalletCoinBalanceListItem = (props: IWalletCoinBalanceListItemProps) => {
  const dispatch = useDispatch();
  const { balance, ERC20, signer, address, prices } = useSelector(
    (state: RootState) => ({
      balance: state.web3.balance,
      ERC20: state.web3.ERC20,
      signer: state.web3.signer,
      address: state.web3.account,
      prices: state.web3.prices,
    })
  );
  const [loadingBalance, setloadingBalance] = React.useState(false);
  const [loadingPrice, setloadingPrice] = React.useState(false);
  const [addedToTotal, setAddedToTotal] = React.useState(false);
  // effect is used to get either the balance of ETH or the balance of ERC20 as well as the Dollar value.
  React.useEffect(() => {
    if (!signer || !address) return;
    // fetch ETH balance
    if (
      props.coinTicker === 'ETH' &&
      balance === null &&
      loadingBalance === false
    ) {
      dispatch(getEthBalance({ signer, walletAddress: address }));
      setloadingBalance(true);
    } else if (
      !ERC20[props.coinTicker] &&
      balance === null &&
      loadingBalance === false
    ) {
      // OR fetch ERC20 Balance
      dispatch(
        getERC20Balance({
          signer,
          walletAddress: address,
          contractAddress: COINS[props.coinTicker]?.address,
          coinTicker: props.coinTicker,
        })
      );
      setloadingBalance(true);
    } else if (
      !prices[`${props.coinTicker}_${'USD'}`] &&
      loadingPrice === false
    ) {
      // OR fetch Price
      dispatch(getPrice({ coinTo: props.coinTicker, coinFrom: 'USD' }));
      setloadingPrice(true);
    }
  }, [address, props.coinTicker, ERC20, balance, prices]);

  // effect is used to add the balance to the total balance
  React.useEffect(() => {
    if (addedToTotal) return; // no double adding
    if (!prices[`${props.coinTicker}_${'USD'}`]) return; // requires price

    if (props.coinTicker === 'ETH' && balance) {
      // add the ETHER value to total Balance
      const value = parseFloat(Text.prettyEthBalance(balance).toString());
      const price = parseFloat(prices[`${props.coinTicker}_${'USD'}`] || '0');
      dispatch(
        addToTotalBalance({
          value: (Math.round(value * price * 100) / 100).toString(),
          ticker: props.coinTicker,
        })
      );
      setAddedToTotal(true);
    } else if (ERC20[props.coinTicker]) {
      // add the ERC20 value to total Balance
      const value = parseFloat(
        Text.prettyBalance(
          ERC20[props.coinTicker] || '0',
          COINS[props.coinTicker]?.decimals
        ).toString()
      );
      const price = parseFloat(prices[`${props.coinTicker}_${'USD'}`] || '0');
      setAddedToTotal(true);
      dispatch(
        addToTotalBalance({
          value: (Math.round(value * price * 100) / 100).toString(),
          ticker: props.coinTicker,
        })
      );
    }
  }, [balance, ERC20, prices, addedToTotal]);

  // formating function which converts WEI and ERC20 into normal floating point numbers
  const getAvailableBalance = () => {
    if (props.coinTicker === 'ETH' && balance) {
      return Text.prettyEthBalance(balance).toString();
    }
    if (
      !props.coinTicker ||
      !ERC20[props.coinTicker] ||
      ERC20[props.coinTicker] === undefined
    )
      return '0';
    const decimal = COINS[props.coinTicker]?.decimals || 18;
    const fullBigNumber = ERC20[props.coinTicker]?.div(
      BigNumber.from(10).pow(decimal)
    );
    if (!fullBigNumber) return '0';
    return fullBigNumber.toString();
  };

  // formatting function which converts WEI or ERC20 to normal dollar values rounded to the nearest cent
  const getPrettyDollarTotal = () => {
    if (!prices[`${props.coinTicker}_${'USD'}`]) return '0';
    if (props.coinTicker === 'ETH' && balance) {
      // return Eth Value in total
      return (
        Math.round(
          parseFloat(Text.prettyEthBalance(balance).toString()) *
            parseFloat(prices[`${props.coinTicker}_${'USD'}`] || '0') *
            100
        ) / 100
      );
    }
    if (!ERC20[props.coinTicker]) return '0';
    const value = parseFloat(
      Text.prettyBalance(
        BigNumber.from(ERC20[props.coinTicker] || '0'),
        COINS[props.coinTicker]?.decimals
      ).toString()
    );
    const price = parseFloat(prices[`${props.coinTicker}_${'USD'}`] || '0');
    return Math.round(value * price * 100) / 100;
  };

  return (
    <div className="flex w-full items-center justify-between py-2">
      <Image
        src={props.coinIcon}
        alt={props.coinTicker}
        width={40}
        height={40}
      />
      <div className="flex w-full items-center justify-between pl-4">
        <div className="flex flex-col items-start justify-start">
          <span className="text-lg leading-6 text-black	">{props.coinName}</span>
          <span className="text-base leading-5 text-funGrey-200">{`${getAvailableBalance()} ${
            props.coinTicker
          }`}</span>
        </div>
        <div className="flex flex-col items-end justify-start">
          <span className="leading-6">{`$ ${getPrettyDollarTotal()}`}</span>
          <span
            className={`min-w-[48px] rounded-lg p-1 text-end text-base leading-5 ${walletChangeColor(
              props.coinPercentChange
            )}`}
          >
            {props.coinPercentChange}
          </span>
        </div>
      </div>
    </div>
  );
};
const DefaultBalanceData = [
  {
    coinName: 'Ethereum',
    coinTicker: 'ETH',
    coinBalance: '75000',
    coinPrice: '100',
    coinPercentChange: '+1.81',
    coinIcon: '/TokenIcons/ETHIcon.svg',
  },
  {
    coinName: 'USD Coin',
    coinTicker: 'USDC',
    coinBalance: '2.5',
    coinPrice: '1',
    coinPercentChange: '0',
    coinIcon: '/TokenIcons/USDCIcon.svg',
  },
  {
    coinName: 'DAI',
    coinTicker: 'DAI',
    coinBalance: '20000',
    coinPrice: '0.9998',
    coinPercentChange: '-0.01%',
    coinIcon: '/TokenIcons/DAIIcon.svg',
  },
];

const WalletBalanceList = () => (
  <div className="flex w-full flex-col justify-evenly">
    <div className="pb-2 text-xl font-bold">Coins</div>
    <div className="flex flex-col content-between items-center justify-start">
      {DefaultBalanceData.map((coin, index) => {
        return <WalletCoinBalanceListItem {...coin} key={index} />;
      })}
    </div>
  </div>
);

// AKA the wallet balance page
const Index = () => {
  // const router = useRouter();
  const { total } = useSelector((state: RootState) => ({
    total: state.web3.totalWalletBalance,
  }));
  return (
    <Main
      meta={
        <Meta
          title="Next.js n"
          description="Next js is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      displayWalletControls={true}
    >
      <div className="flex h-full max-h-[536px] flex-col items-center justify-start overflow-y-auto pb-48">
        <WalletHero TotalBalance={`${Math.round(total * 100) / 100}`} />
        <WalletButtons />
        <WalletBalanceList />
      </div>
    </Main>
  );
};

export default Index;
