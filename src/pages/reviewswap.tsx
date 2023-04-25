import Image from 'next/image';
import { useRouter } from 'next/router';

import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { Meta } from '@/layouts/Meta';
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
      <div className="flex flex-col justify-start items-center">
        <div className="flex justify-center items-center pt-4 pb-2">
          <Image
            src={`/TokenIcons/${coinName}.svg`}
            alt={coinName}
            width={48}
            height={48}
          />
        </div>
        <div className="flex justify-center items-center py-2">
          <span className="text-lg font-semibold">Swapping</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <Image
            src={`/TokenIcons/${coinName}.svg`}
            alt={coinName}
            width={24}
            height={24}
          />
          <span className="text-lg font-semibold">{`${coinFromAmount} ${coinName}`}</span>
        </div>
        <SwapButton
          handleSwapButton={() => {
            router.back();
          }}
        />
        <div className="flex justify-between items-center py-2">
          <Image
            src={`/TokenIcons/${coinName}.svg`}
            alt={coinName}
            width={24}
            height={24}
          />
          <span className="text-lg font-semibold">{`${coinToAmount} ${coinToName}`}</span>
        </div>
      </div>
    </Main>
  );
};

export default ReviewSwap;
