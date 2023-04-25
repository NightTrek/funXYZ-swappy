import Image from 'next/image';
import * as React from 'react';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ISelectorState = {
  coinName: string | null;
  inputState: string;
};

type ISwapState = {
  selectorA: ISelectorState;
  selectorB: ISelectorState;
  selection: string[];
};

const Swap = () => {
  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '' },
    selectorB: { coinName: null, inputState: '' },
    selection: ['ETH', 'DAI', 'USDC'],
  });

  const setSelectorInput = (selectorA: boolean, input: string) => {
    if (selectorA) {
      setState({
        ...state,
        selectorA: {
          ...state.selectorA,
          inputState: input,
        },
      });
      return;
    }
    setState({
      ...state,
      selectorB: {
        ...state.selectorB,
        inputState: input,
      },
    });
  };

  const setSelectorCoinName = (selectorA: boolean, coinName: string) => {
    const newSelectionList = state.selection.filter((coin) => {
      if (coin === coinName) return false;
      return true;
    });
    if (selectorA) {
      newSelectionList.push(state.selectorA.coinName as string);
      setState({
        ...state,
        selectorA: {
          ...state.selectorA,
          coinName,
        },
        selection: newSelectionList,
      });
      return;
    }
    newSelectionList.push(state.selectorB.coinName as string);
    setState({
      ...state,
      selectorB: {
        ...state.selectorB,
        coinName,
      },
      selection: newSelectionList,
    });
  };
  //   console.log(state);
  return (
    <Main
      meta={
        <Meta
          title="Next.js n"
          description="Next js is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      backButtonNav={'/'}
      displayWalletControls={false}
    >
      <div className="h-screen w-full">
        <div className="flex h-3/4 w-full flex-col items-start justify-start py-4 pb-10">
          <div className="pb-4 text-2xl font-bold">Swap</div>
          <CoinSelectorButton
            coinList={state.selection}
            coinName={state.selectorA.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(true, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(true, input);
            }}
            inputState={state.selectorA.inputState}
          />
          {/*  Swap button central area */}
          <div className="my-4 flex w-full flex-nowrap items-center justify-between">
            <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow">
              <Image src="/Icons/Swap.svg" alt="swap" width={24} height={24} />
            </div>
            <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
          </div>
          {/*  */}
          <CoinSelectorButton
            coinList={state.selection}
            coinName={state.selectorB.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(false, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(false, input);
            }}
            inputState={state.selectorB.inputState}
          />
        </div>
        <div className="h-1/6 w-full pb-10">
          <StyledButton
            buttonText="Review"
            buttonColor={ButtonColor.MEDIUM}
            buttonAction={() => {
              console.log('Review');
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default Swap;