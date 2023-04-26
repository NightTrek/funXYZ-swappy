import { FunWallet } from '@fun-wallet/sdk';
import { Eoa } from '@fun-wallet/sdk/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import StyledButton, { ButtonColor } from '@/components/StyledButton';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
import { Main } from '@/templates/Main';

export type IReviewSwapProps = {
  coinName: string;
  coinFromAmount: string;
  coinToName: string;
  coinToAmount: string;
  gasFee: string;
  totalValue: string;
};
const ReviewSwap = () => {
  const router = useRouter();
  const { wallet, signer } = useSelector((state: RootState) => ({
    wallets: state.web3.wallet,
    signer: state.web3.Signer,
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
      <div className="flex flex-col justify-start items-center pb-10 w-full">
        <div className="flex justify-center items-center pt-4 pb-2">
          <Image
            src={`/TokenIcons/${coinName}Icon.svg`}
            alt={coinName}
            width={64}
            height={64}
          />
        </div>
        <div className="flex justify-center items-center py-2">
          <span className="text-lg font-semibold">Swapping</span>
        </div>
        <div className="flex justify-between items-center py-2 px-4 w-full">
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
        <div className="flex justify-between items-center py-2 px-4 pb-10 w-full">
          <Image
            src={`/TokenIcons/${coinToName}Icon.svg`}
            alt={coinToName}
            width={42}
            height={42}
          />
          <span className="text-lg font-semibold">{`${coinToAmount} ${coinToName}`}</span>
        </div>
        <div className="flex flex-col justify-evenly items-center py-2 w-full">
          <div className="flex justify-start items-start py-2 w-full">Cost</div>
          <div className="flex justify-between items-center py-2 w-full">
            <span className="text-lg font-semibold text-funGrey-200">
              Gas Fee
            </span>
            <span className="text-lg font-semibold">
              <span className="text-funGrey-200">0.001 ETH *</span> $2.91
            </span>
          </div>
          <div className="flex justify-between items-center py-2 w-full border-t border-funButton-200">
            <span className="text-lg font-semibold text-funGrey-200">
              Total
            </span>
            <span className="text-lg font-semibold">
              <span className="text-funGrey-200">100 SUI *</span> $0.01
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center py-4 w-full">
          <StyledButton
            buttonText={'Confirm & Swap'}
            buttonColor={ButtonColor.DARK}
            buttonAction={async () => {
              const auth = new Eoa({ signer });

              // Get FunWallet associated with EOA
              const uniqueId = await auth.getUniqueId();
              const wallet = new FunWallet({ uniqueId, salt: 1 });

              const receipt = await wallet.swap(auth, {
                in: 'ETH',
                amount: 0.0001,
                out: 'DAI',
              });
              console.log(receipt);
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default ReviewSwap;
