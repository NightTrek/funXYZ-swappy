import Image from 'next/image';

import Rocketship, { RocketshipSize } from '@/components/Rocketship';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const WalletHero = () => (
  <div className="flex items-center justify-center py-4">
    <div className="flex flex-col items-center justify-start">
      <Rocketship size={RocketshipSize.MEDIUM} />
      <div className="my-2 text-lg text-slate-400"> Wallet Balance </div>
      <div className="text-4xl font-bold text-black"> $ 10,000 </div>
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
    />
    <StyledButton
      buttonLink="/"
      buttonText="Transfer"
      buttonIcon="/Icons/Arrow-Up-Circle.svg"
      buttonColor={ButtonColor.DARK}
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
  if (percentChange[0] === '-') return 'bg-red-200';
  if (percentChange[0] === '+') return 'bg-green-200';
  return 'bg-gray-200';
};

const WalletCoinBalanceListItem = (props: IWalletCoinBalanceListItemProps) => (
  <div className="flex w-full items-center justify-between py-2">
    <Image src={props.coinIcon} alt={props.coinTicker} width={48} height={48} />
    <div className="flex w-full items-center justify-between pl-4">
      <div className="flex flex-col items-start justify-start">
        <span>{props.coinName}</span>
        <span>{`${props.coinBalance} ${props.coinTicker}`}</span>
      </div>
      <div className="flex flex-col items-end justify-start">
        <span>{`$ ${
          parseFloat(props.coinBalance) * parseFloat(props.coinPrice)
        }`}</span>
        <span
          className={`min-w-[48px] rounded-lg p-1 text-end ${walletChangeColor(
            props.coinPercentChange
          )}`}
        >
          {props.coinPercentChange}
        </span>
      </div>
    </div>
  </div>
);

const DefaultBalanceData = [
  {
    coinName: 'ETH',
    coinTicker: 'ETH',
    coinBalance: '75000',
    coinPrice: '100',
    coinPercentChange: '+1.5',
    coinIcon: '/TokenIcons/ETHIcon.svg',
  },
  {
    coinName: 'USD Coin',
    coinTicker: 'USDC',
    coinBalance: '2.5',
    coinPrice: '1',
    coinPercentChange: '-2.5',
    coinIcon: '/TokenIcons/UCDCIcon.svg',
  },
  {
    coinName: 'DAI',
    coinTicker: 'DAI',
    coinBalance: '20000',
    coinPrice: '0.9998',
    coinPercentChange: '0',
    coinIcon: '/TokenIcons/DAIIcon.svg',
  },
];

const WalletBalanceList = () => (
  <div className="flex w-full flex-col justify-evenly px-2">
    <div className="text-2xl font-bold">Coins</div>
    <div className="flex flex-col content-between items-center justify-start">
      {DefaultBalanceData.map((coin, index) => {
        return <WalletCoinBalanceListItem {...coin} key={index} />;
      })}
    </div>
  </div>
);

const WalletControls = () => <div></div>;

// AKA the wallet balance page
const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Next.js n"
          description="Next js is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="flex h-screen flex-col items-center justify-start ">
        <WalletHero />
        <WalletButtons />
        <WalletBalanceList />
        <WalletControls />
      </div>
    </Main>
  );
};

export default Index;
