import { configureEnvironment, FunWallet } from '@fun-wallet/sdk';
import { Eoa } from '@fun-wallet/sdk/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { API_KEY } from 'seceret';

import StyledButton, { ButtonColor } from '@/components/StyledButton';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
import { Main } from '@/templates/Main';
import { COINS } from '@/config/CoinConfig';

type IReviewSwapProps = {
  coinName: string;
  coinFromAmount: string;
  coinToName: string;
  coinToAmount: string;
  gasFee: string;
  totalValue: string;
};
const ReviewSwap = () => {
  const router = useRouter();
  const { walletOG, eoa } = useSelector((state: RootState) => ({
    walletOG: state.web3.wallet,
    eoa: state.web3.eoa,
  }));

  const {
    coinName,
    coinFromAmount,
    coinToAmount,
    coinToName,
    gasFee,
    totalValue,
  } = router.query as IReviewSwapProps;
  return (
    <Main
      meta={
        <Meta title="Review Swap" description="Finalize your token swap." />
      }
      backButtonNav={'/swap'}
      displayWalletControls={false}
    >
      <div className="flex w-full flex-col items-center justify-start pb-10">
        <div className="flex items-center justify-center pb-2 pt-4">
          <Image
            src={`/TokenIcons/${coinName}Icon.svg`}
            alt={coinName}
            width={64}
            height={64}
          />
        </div>
        <div className="flex items-center justify-center py-2">
          <span className="text-lg font-semibold">Swapping</span>
        </div>
        <div className="flex w-full items-center justify-between px-4 py-2">
          <Image
            src={`/TokenIcons/${coinName}Icon.svg`}
            alt={coinName}
            width={42}
            height={42}
          />
          <span className="text-lg font-semibold">{`${coinFromAmount} ${coinName}`}</span>
        </div>
        <SwapButton
          handleSwapButton={() => {
            router.back();
          }}
        />
        <div className="flex w-full items-center justify-between px-4 py-2 pb-10">
          <Image
            src={`/TokenIcons/${coinToName}Icon.svg`}
            alt={coinToName}
            width={42}
            height={42}
          />
          <span className="text-lg font-semibold">{`${coinToAmount} ${coinToName}`}</span>
        </div>
        <div className="flex w-full flex-col items-center justify-evenly py-2">
          <div className="flex w-full items-start justify-start py-2">Cost</div>
          <div className="flex w-full items-center justify-between py-2">
            <span className="text-lg font-semibold text-funGrey-200">
              Gas Fee
            </span>
            <span className="text-lg font-semibold">
              <span className="text-funGrey-200">0.001 ETH *</span> $1.21
            </span>
          </div>
          <div className="flex w-full items-center justify-between border-t border-funButton-200 py-2">
            <span className="text-lg font-semibold text-funGrey-200">
              Total
            </span>
            <span className="text-lg font-semibold">
              <span className="text-funGrey-200">0.001 ETH *</span> $10.01
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center py-4">
          <StyledButton
            buttonText={'Confirm & Swap'}
            buttonColor={ButtonColor.DARK}
            buttonAction={async () => {
              try {
                console.log(walletOG);
                const receipt = await walletOG.swap(eoa, {
                  in: COINS[coinName]?.address,
                  amount: coinFromAmount,
                  out: COINS[coinToName]?.address,
                });
                console.log(receipt);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default ReviewSwap;
