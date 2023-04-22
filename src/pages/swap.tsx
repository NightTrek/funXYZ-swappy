import Image from 'next/image';
import * as React from 'react';

import { COINS } from '@/config/CoinConfig';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import text from '@/utils/text';

type ISelectorBoxProps = {
  coinName: string | null;
  setCoinName: (coinName: string) => void;
  setInputChange: (input: string) => void;
  inputState: string;
};
const SelectorBox = (props: ISelectorBoxProps) => {
  const [coinNameSelector, setCoinNameSelector] =
    React.useState<boolean>(false);

  const CoinSelectionModal = () => {
    return (
      <>
        {coinNameSelector && (
          <div className="absolute left-0 top-[64px] z-20 flex h-[256px] w-full flex-col content-evenly justify-start rounded-2xl bg-white shadow-md">
            {Object.keys(COINS).map((coinName) => {
              return (
                <div
                  key={coinName}
                  className="mx-2 my-1 flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 hover:bg-funButton-100 active:bg-funButton-100"
                  onClick={() => {
                    props.setCoinName(coinName);
                    setCoinNameSelector(false);
                  }}
                >
                  <div className="flex items-center pl-2">
                    <Image
                      src={
                        COINS[coinName]?.coinIcon || '/TokenIcons/ETHIcon.svg'
                      }
                      alt={coinName}
                      width={48}
                      height={48}
                      className="pr-2"
                    />
                    <div className="flex flex-col items-start justify-between">
                      <span className="px-1 text-black">
                        {COINS[coinName]?.coinName}
                      </span>
                      <span className="px-1 text-base text-funGrey-200">
                        {COINS[coinName]?.coinTicker}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  if (props.coinName && COINS[props.coinName]) {
    return (
      <div className="flex w-full flex-col items-start">
        <div
          className="my-2 flex w-full items-center justify-between"
          onClick={() => {
            setCoinNameSelector(!coinNameSelector);
          }}
        >
          <div className="flex items-center">
            <span className="mr-1 text-funGrey-200">From</span>
            {/* Hover Button */}
            <div
              className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-funGrey-100 px-2 py-1 hover:bg-funButton-200 active:bg-funButton-200"
              onClick={() => {
                setCoinNameSelector(!coinNameSelector);
              }}
            >
              <Image
                src={
                  COINS[props.coinName]?.coinIcon || '/TokenIcons/ETHIcon.svg'
                }
                alt="ETH"
                width={32}
                height={32}
                className="pr-2"
              />
              <span className="px-1 text-funGrey-200">
                {COINS[props.coinName]?.coinTicker || 'ETH'}
              </span>
              <Image
                src="/Icons/Cheveron-Down.svg"
                alt="down"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-1 text-sm">Available Balance</span>
            <span className="px-1 text-sm">
              42.69 {COINS[props.coinName]?.coinTicker || 'ETH'}
            </span>
          </div>
        </div>
        <div className="my-2 flex w-auto items-center">
          <input
            id="input-id"
            className="bgBody w-auto min-w-0 px-1 py-2"
            type="text"
            name="ETH"
            placeholder="0.0"
            value={props.inputState}
            onChange={(event: { target: { value: string } }) => {
              if (!text.isFloat(event.target.value)) return;
              console.log(event.target.value);
              props.setInputChange(event.target.value);
            }}
          />
          <span className="px-1 text-funGrey-200">
            {COINS[props.coinName]?.coinTicker || 'ETH'}
          </span>
          {/* <label htmlFor="input-id">ETH</label> */}
        </div>
        <CoinSelectionModal />
      </div>
    );
  }
  return (
    <div className="relative flex w-full flex-col items-start">
      <div className="my-2 flex w-full items-center justify-between">
        <div className="flex items-center">
          <span className="mr-1 text-funGrey-200">From</span>
          {/* Hoverable Button */}
          <div
            className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-funGrey-100 px-2 py-1 hover:bg-funButton-200 active:bg-funButton-200"
            onClick={() => {
              setCoinNameSelector(!coinNameSelector);
            }}
          >
            <div className="mr-2 h-[24px] w-[24px] rounded-full bg-black opacity-10" />
            <span className="px-1 text-black">Choose Coin</span>
            <Image
              src="/Icons/Cheveron-Down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
          {/*  */}
        </div>
      </div>
      <CoinSelectionModal />
    </div>
  );
};

type ISelectorState = {
  coinName: string | null;
  inputState: string;
};

type ISwapState = {
  selectorA: ISelectorState;
  selectorB: ISelectorState;
};

const Swap = () => {
  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '' },
    selectorB: { coinName: null, inputState: '' },
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
    if (selectorA) {
      setState({
        ...state,
        selectorA: {
          ...state.selectorA,
          coinName,
        },
      });
      return;
    }
    setState({
      ...state,
      selectorB: {
        ...state.selectorB,
        coinName,
      },
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
      <div className="flex w-full flex-col items-start justify-evenly py-4">
        <div className="text-2xl font-bold">Swap</div>
        <SelectorBox
          coinName={state.selectorA.coinName}
          setCoinName={(coin) => {
            setSelectorCoinName(true, coin);
          }}
          setInputChange={(input) => {
            setSelectorInput(true, input);
          }}
          inputState={state.selectorA.inputState}
        />
        <div className="my-4 flex w-full flex-nowrap items-center justify-between">
          <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow">
            <Image src="/Icons/Swap.svg" alt="swap" width={24} height={24} />
          </div>
          <div className="h-[1px] w-1/3 bg-funGrey-200 opacity-20" />
        </div>
        <SelectorBox
          setCoinName={(coin) => {
            setSelectorCoinName(false, coin);
          }}
          setInputChange={(input) => {
            setSelectorInput(false, input);
          }}
          inputState={state.selectorB.inputState}
        />
      </div>
    </Main>
  );
};

export default Swap;
