import Image from 'next/image';

import Rocketship, { RocketshipSize } from '@/components/Rocketship';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const WalletHero = () => (
  <div className="flex justify-center items-center py-4">
    <div className="flex flex-col justify-start items-center">
      <Rocketship size={RocketshipSize.MEDIUM} />
      <div className="my-2 text-lg text-slate-400"> Wallet Balance </div>
      <div className="text-4xl font-bold text-black"> $ 10,000 </div>
    </div>
  </div>
);

const WalletButtons = () => (
  <div className="flex justify-between items-center pb-6 w-full">
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
  <div className="flex justify-between items-center py-2 w-full">
    <Image src={props.coinIcon} alt={props.coinTicker} width={48} height={48} />
    <div className="flex justify-between items-center pl-4 w-full">
      <div className="flex flex-col justify-start items-start">
        <span>{props.coinName}</span>
        <span>{`${props.coinBalance} ${props.coinTicker}`}</span>
      </div>
      <div className="flex flex-col justify-start items-end">
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
    coinIcon: '/TokenIcons/USDCIcon.svg',
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
  <div className="flex flex-col justify-evenly px-2 w-full">
    <div className="text-2xl font-bold">Coins</div>
    <div className="flex flex-col justify-start content-between items-center">
      {DefaultBalanceData.map((coin, index) => {
        return <WalletCoinBalanceListItem {...coin} key={index} />;
      })}
    </div>
  </div>
);

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
      displayWalletControls={true}
    >
      <div className="flex flex-col justify-start items-center h-screen">
        <WalletHero />
        <WalletButtons />
        <WalletBalanceList />
        {/* <WalletControls /> */}
      </div>
    </Main>
  );
};

export default Index;
