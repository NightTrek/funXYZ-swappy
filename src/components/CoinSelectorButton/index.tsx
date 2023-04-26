import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { COINS } from '@/config/CoinConfig';
import type { RootState } from '@/redux/store';
import { getERC20Balance, getEthBalance } from '@/redux/web3Slice';
import text from '@/utils/text';

const ESTIMATED_MINIMUM_GAS = 0.002;

type ISelectorBoxProps = {
  coinName: string | null;
  setCoinName: (coinName: string) => void;
  setInputChange: (input: string) => void;
  setAllowedBalance: (allowedBalance: boolean) => void;
  inputState: string;
  coinList: string[];
  isInput: boolean;
};
const CoinSelectorButton = (props: ISelectorBoxProps) => {
  const dispatch = useDispatch();
  const [coinNameSelector, setCoinNameSelector] =
    React.useState<boolean>(false);

  const { signer, account, balance, ERC20 } = useSelector(
    (state: RootState) => ({
      signer: state.web3.Signer,
      account: state.web3.account,
      balance: state.web3.balance,
      ERC20: state.web3.ERC20,
    })
  );

  React.useEffect(() => {
    if (!signer || !account) return;
    if (props.coinName === 'ETH' && !balance) {
      dispatch(getEthBalance(signer));
      return;
    }
    if (
      typeof props.coinName === 'string' &&
      COINS[props.coinName] &&
      COINS[props.coinName]?.address &&
      !ERC20[props.coinName]
    ) {
      dispatch(
        getERC20Balance({
          coinTicker: props.coinName,
          signer,
          walletAddress: account,
          contractAddress: COINS[props.coinName]?.address,
        })
      );
    }
  }, [signer, account, props.coinName]);

  const CoinSelectionModal = (selectorProps: ISelectorBoxProps) => {
    return (
      <>
        {coinNameSelector && (
          <div className="flex overflow-y-scroll absolute left-0 z-20 flex-col justify-start content-evenly w-full bg-white rounded-2xl shadow-md no-scrollbar top-[64px] h-[256px]">
            {selectorProps.coinList.map((coinName, index) => {
              if (!coinName) return <div key={index}></div>;
              return (
                <div
                  key={coinName}
                  className="flex justify-between items-center py-1 px-2 my-1 mx-2 hover:bg-funButton-100 active:bg-funButton-100 rounded-lg cursor-pointer"
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
                    <div className="flex flex-col justify-between items-start">
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

  const getAvailableBalance = () => {
    if (props.coinName === 'ETH' && balance) {
      const remainder = balance.mod(1e14); // TODO test this with different Values of ETH
      return utils.formatEther(balance.sub(remainder));
    }
    if (
      props.coinName &&
      ERC20[props.coinName] &&
      ERC20[props.coinName] !== undefined
    ) {
      const decimal = COINS[props.coinName]?.decimals || 18;
      const fullBigNumber = ERC20[props.coinName]?.div(
        BigNumber.from(10).pow(decimal)
      );
      if (fullBigNumber) {
        return fullBigNumber.toString();
      }
    }
    return '0';
  };

  if (props.coinName && COINS[props.coinName]) {
    return (
      <div className="flex relative flex-col items-start py-2 w-full">
        <div
          className="flex justify-between items-center my-2 w-full"
          onClick={() => {
            setCoinNameSelector(!coinNameSelector);
          }}
        >
          <div className="flex items-center">
            <span className="mr-1 text-funGrey-200">From</span>
            {/* Hover Button */}
            <div
              className="flex justify-center items-center py-1 px-2 ml-1 bg-funGrey-100 hover:bg-funButton-200 active:bg-funButton-200 rounded-full cursor-pointer"
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
          {props.isInput && (
            <div className="flex flex-col items-end">
              <span className="px-1 text-sm">Available Balance</span>
              <span className="px-1 text-sm">
                {getAvailableBalance()}{' '}
                {COINS[props.coinName]?.coinTicker || 'ETH'}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center my-2 w-auto">
          <input
            id="input-id"
            className="py-2 px-1 w-auto min-w-0 bgBody"
            type="text"
            name="ETH"
            placeholder="0.0"
            value={props.inputState}
            onChange={(event: { target: { value: string } }) => {
              if (!text.isFloat(event.target.value)) return;
              if (
                parseFloat(event.target.value) >
                parseFloat(getAvailableBalance())
              ) {
                // better UX would be to set it to the maximum allowed value
                props.setInputChange(`${parseFloat(getAvailableBalance())}`);
                return;
              }
              props.setAllowedBalance(true);
              props.setInputChange(event.target.value);
            }}
          />
          <span className="px-1 text-funGrey-200">
            {COINS[props.coinName]?.coinTicker || 'ETH'}
          </span>
        </div>
        <CoinSelectionModal {...props} />
      </div>
    );
  }
  return (
    <div className="flex relative flex-col items-start py-2 w-full">
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex items-center">
          <span className="mr-1 text-funGrey-200">From</span>
          {/* Hoverable Button */}
          <div
            className="flex justify-center items-center py-1 px-2 ml-1 bg-funGrey-100 hover:bg-funButton-200 active:bg-funButton-200 rounded-full cursor-pointer"
            onClick={() => {
              setCoinNameSelector(!coinNameSelector);
            }}
          >
            <div className="mr-2 bg-black rounded-full opacity-10 h-[24px] w-[24px]" />
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
      <CoinSelectionModal {...props} />
    </div>
  );
};

export default CoinSelectorButton;
