/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
import { getPrice } from '@/redux/web3Slice';
import { Main } from '@/templates/Main';

type ISelectorState = {
  coinName: string | null;
  inputState: string;
  sufficientBalance: boolean;
};

type ISwapState = {
  selectorA: ISelectorState;
  selectorB: ISelectorState;
  selection: string[];
};

const Swap = () => {
  const dispatch = useDispatch();
  const { prices } = useSelector((state: RootState) => ({
    prices: state.web3.prices,
  }));
  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '', sufficientBalance: true },
    selectorB: { coinName: null, inputState: '', sufficientBalance: true },
    selection: ['ETH', 'DAI', 'USDC'],
  });
  const router = useRouter();

  // Effect to fetch and maintain prices
  React.useEffect(() => {
    if (state.selectorA.coinName === null || state.selectorB.coinName === null)
      return;
    const coinFrom = state.selectorA.coinName;
    const coinTo = state.selectorB.coinName;
    if (!prices[`${coinTo}_${coinFrom}`]) {
      // console.log(`Fetching: ${coinTo}_${coinFrom}`);
      dispatch(getPrice({ coinTo, coinFrom }));
    }
  }, [state.selectorA, state.selectorB]);

  // effect to maintain accurate exchange rate values
  React.useEffect(() => {
    const coinFrom = state.selectorA.coinName;
    const coinTo = state.selectorB.coinName;
    const priceInCoinTo = prices[`${coinTo}_${coinFrom}`];
    if (priceInCoinTo) {
      const newState = state;
      const newPrice =
        parseFloat(state.selectorA.inputState) / parseFloat(priceInCoinTo);
      newState.selectorB.inputState = `${
        newPrice ? newPrice.toFixed(4) : '0.00'
      }`;
      setState({ ...newState });
    }
  }, [prices, state.selectorA.inputState]);

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

  const handleSwapButton = () => {
    setState({
      ...state,
      selectorA: state.selectorB,
      selectorB: state.selectorA,
    });
  };

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
      <div className="flex h-full min-h-[600px] w-full flex-col justify-between">
        <div className="flex h-1/2 w-full flex-col items-start justify-start py-6 pb-2">
          <div className="pb-4 text-2xl font-semibold">Swap</div>
          <CoinSelectorButton
            coinList={state.selection}
            coinName={state.selectorA.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(true, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(true, input);
            }}
            setAllowedBalance={(val: boolean) => {
              console.log('not enough balance 2');

              setState({
                ...state,
                selectorA: {
                  ...state.selectorA,
                  sufficientBalance: val,
                },
              });
            }}
            inputState={state.selectorA.inputState}
            isInput={true}
          />
          {/*  Swap button central area */}
          <SwapButton handleSwapButton={handleSwapButton} />
          {/*  */}
          <CoinSelectorButton
            isInput={false}
            coinList={state.selection}
            coinName={state.selectorB.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(false, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(false, input);
            }}
            setAllowedBalance={(val: boolean) => {
              setState({
                ...state,
                selectorB: {
                  ...state.selectorB,
                  sufficientBalance: val,
                },
              });
            }}
            inputState={state.selectorB.inputState}
          />
        </div>
        {/*  Pricing Notation */}
        {state.selectorA.coinName && state.selectorB.coinName && (
          <div className="flex w-full items-center justify-start p-2">
            <Image
              src="/Icons/Info.svg"
              alt="info"
              width={16.25}
              height={16.25}
            />
            <span className="px-2 text-base text-funGrey-200">{`1 ${
              state.selectorB.coinName
            } = ${
              prices[
                `${state.selectorB.coinName}_${state.selectorA.coinName}`
              ] || '0'
            } ${state.selectorA.coinName}`}</span>
          </div>
        )}
        {/* Review or disabled insufficent balance button */}
        <div className=" h-1/6 w-full pb-10">
          <StyledButton
            buttonText={
              state.selectorA.sufficientBalance &&
              state.selectorB.sufficientBalance
                ? 'Review'
                : 'Insufficient Balance'
            }
            buttonColor={
              state.selectorA.sufficientBalance &&
              state.selectorB.sufficientBalance &&
              state.selectorA.inputState !== '' &&
              state.selectorB.inputState !== '' &&
              parseFloat(state.selectorA.inputState) > 0 &&
              parseFloat(state.selectorB.inputState) > 0
                ? ButtonColor.DARK
                : ButtonColor.MEDIUM
            }
            buttonAction={async () => {
              if (
                state.selectorA.sufficientBalance &&
                state.selectorB.sufficientBalance
              ) {
                if (
                  !state.selectorA.coinName ||
                  !state.selectorB.coinName ||
                  !(
                    parseFloat(state.selectorA.inputState) > 0 &&
                    parseFloat(state.selectorB.inputState) > 0
                  )
                )
                  return;
                router.push({
                  pathname: '/reviewswap',
                  query: {
                    coinName: state.selectorA.coinName,
                    coinFromAmount: state.selectorA.inputState,
                    coinToAmount: state.selectorB.inputState,
                    coinToName: state.selectorB.coinName,
                    gasFee: '0.0001',
                    totalValue: (
                      parseFloat(state.selectorA.inputState) *
                      parseFloat(
                        prices[
                          `${state.selectorB.coinName}_${state.selectorA.coinName}`
                        ]
                      )
                    ).toString(),
                  },
                });
              }
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default Swap;
