/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import * as React from 'react';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import StyledButton, { ButtonColor } from '@/components/StyledButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type IReviewSwapProps = {
  coinName: string;
  coinFromAmount: string;
  coinToName: string;
  coinToAmount: string;
  gasFee: string;
  totalValue: string;
};

type ISelectorState = {
  coinName: string | null;
  inputState: string;
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
  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '' },
    selectorB: { coinName: null, inputState: '' },
    selection: ['ETH', 'DAI', 'USDC'],
    prices: {
      ETH: '',
    },
  });

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

  const handleTradeButton = () => {
    console.log('Trade button clicked');
    if (state.selectorA.coinName === null || state.selectorB.coinName === null)
      return;
    if (
      parseFloat(state.selectorA.inputState) > 0 &&
      parseFloat(state.selectorB.inputState) > 0
    ) {
      console.log('Trade button clicked');
    }
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
            inputState={state.selectorA.inputState}
            isInput={true}
          />
          {/*  Swap button central area */}
          <div className="flex flex-nowrap justify-between items-center my-4 w-full">
            <div className="w-1/3 bg-funGrey-200 opacity-20 h-[1px]" />
            <div
              className="flex justify-center items-center bg-white rounded-full shadow h-[36px] w-[36px]"
              onClick={handleSwapButton}
            >
              <Image src="/Icons/Swap.svg" alt="swap" width={24} height={24} />
            </div>
            <div className="w-1/3 bg-funGrey-200 opacity-20 h-[1px]" />
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
          {state.selectorA.inputState !== '' &&
          state.selectorB.inputState !== '' ? (
            <StyledButton
              buttonText="Review"
              buttonColor={ButtonColor.DARK}
              buttonAction={() => {
                console.log('Review');
              }}
            />
          ) : (
            <StyledButton
              buttonText="Review"
              buttonColor={ButtonColor.MEDIUM}
              buttonAction={() => {
                console.log('Review');
              }}
            />
          )}
        </div>
      </div>
    </Main>
  );
};

export default Swap;
