import Rocketship, { RocketshipSize } from '@/components/Rocketship';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const WalletHero = () => (
  <div className="flex items-center justify-center py-4">
    <div className="flex flex-col items-center justify-start">
      <Rocketship size={RocketshipSize.MEDIUM} />
      <div className="text-lg text-slate-400"> Wallet Balance </div>
      <div className="text-4xl font-bold text-black"> $ 10,000 </div>
    </div>
  </div>
);

const WalletButtons = () => (
  <div className="flex flex-wrap items-center justify-evenly">
    <StyledButton
      buttonLink="/swap"
      buttonText="Swap"
      buttonColor={ButtonColor.LIGHT}
    />
  </div>
);

const WalletBalance = () => <div></div>;

const WalletControls = () => <div></div>;

// AKA the wallet balance page
const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="flex h-screen flex-col items-center justify-start ">
        <WalletHero />
        <WalletButtons />
        <WalletBalance />
        <WalletControls />
      </div>
    </Main>
  );
};

export default Index;
