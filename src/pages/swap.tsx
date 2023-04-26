/* eslint-disable tailwindcss/no-custom-classname */
import { Eoa } from '@fun-wallet/sdk/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
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
  prices: {
    [key: string]: string;
    ETH: string;
  };
};

const Swap = () => {
  const { signer } = useSelector((state: RootState) => ({
    signer: state.web3.Signer,
  }));

  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '', sufficientBalance: true },
    selectorB: { coinName: null, inputState: '', sufficientBalance: true },
    selection: ['ETH', 'DAI', 'USDC'],
    prices: {
      ETH: '',
    },
  });
  const router = useRouter();

  // Effect to fetch and maintain prices
  React.useEffect(() => {
    if (state.selectorA.coinName === null || state.selectorB.coinName === null)
      return;
    const coinFrom = state.selectorA.coinName;
    const coinTo = state.selectorB.coinName;
    if (!state.prices[`${coinTo}_${coinFrom}`]) {
      console.log(`Fetching: ${coinTo}_${coinFrom}`);
      fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinTo}&tsyms=${coinFrom}`
      )
        .then((res) => {
          if (!res.ok) return;
          res.json().then((data) => {
            console.log(data);
            setState({
              ...state,
              prices: {
                ...state.prices,
                [`${coinTo}_${coinFrom}`]: data[coinTo][coinFrom],
              },
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.selectorA, state.selectorB]);

  // effect to maintain accurate exchange rate values
  React.useEffect(() => {
    const coinFrom = state.selectorA.coinName;
    const coinTo = state.selectorB.coinName;
    const priceInCoinTo = state.prices[`${coinTo}_${coinFrom}`];
    if (priceInCoinTo) {
      const newState = state;
      const newPrice =
        parseFloat(state.selectorA.inputState) / parseFloat(priceInCoinTo);
      newState.selectorB.inputState = `${
        newPrice ? newPrice.toFixed(4) : '0.00'
      }`;
      setState({ ...newState });
    }
  }, [state.prices, state.selectorA.inputState]);

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
      <div className="w-full h-screen">
        <div className="flex flex-col justify-start items-start py-4 pb-10 w-full h-4/6">
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
              console.log('not enough balance 2');
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
        {state.selectorA.coinName && state.selectorB.coinName && (
          <div className="flex justify-start items-center py-2 px-2 w-full">
            <Image src="/Icons/Info.svg" alt="info" width={24} height={24} />
            <span className="px-2">{`1 ${state.selectorB.coinName} = ${
              state.prices[
                `${state.selectorB.coinName}_${state.selectorA.coinName}`
              ] || '0'
            } ${state.selectorA.coinName}`}</span>
          </div>
        )}

        <div className="pb-10 w-full h-1/6 ml-[-10px]">
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
              state.selectorB.inputState !== ''
                ? ButtonColor.DARK
                : ButtonColor.MEDIUM
            }
            buttonAction={async () => {
              if (
                state.selectorA.sufficientBalance &&
                state.selectorB.sufficientBalance
              ) {
                if (!state.selectorA.coinName || !state.selectorB.coinName)
                  return;
                router.push({
                  pathname: '/reviewswap',
                  query: {
                    coinName: state.selectorA.coinName,
                    coinFromAmount: state.selectorA.inputState,
                    coinToAmount: state.selectorB.inputState,
                    coinToName: state.selectorB.coinName,
                    gasFee: '0.0001',
                    totalValue: '0.0001',
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
