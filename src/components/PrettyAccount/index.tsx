import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import { ConnectWeb3 } from '../../redux/web3Slice';
import text from '../../utils/text';
import Rocketship, { RocketshipSize } from '../Rocketship';
// TODO animate the account change
// TODO add login logic
const PrettyAccount = () => {
  const dispatch = useDispatch();
  const { account, error } = useSelector((state: RootState) => ({
    account: state.web3.account,
    error: state.web3.error,
  }));

  // handle the ethers login logic for metamask
  const handleConnectWallet = () => {
    if (!account) {
      dispatch(ConnectWeb3());
    }
  };
  // function which will handle the login logic
  useEffect(() => {
    if (!account && !error) {
      dispatch(ConnectWeb3());
    }
  }, [account]);

  return (
    <div
      className="flex flex-nowrap justify-evenly"
      onClick={handleConnectWallet}
    >
      <Rocketship size={RocketshipSize.SMALL} />
      {typeof account === 'string' ? (
        <div className="ml-1 flex items-center justify-between text-lg">
          <span className="pr-1 font-bold text-black">Wallet</span>
          <span className="text-funGrey-200">
            {text.prettyEthAccount(account, 4)}
          </span>
        </div>
      ) : (
        <div className="ml-1 flex items-center justify-between text-lg">
          <span className="text-funGrey-200">Connect your</span>
          <span className="pl-1 font-bold text-black">Wallet</span>
        </div>
      )}
    </div>
  );
};

export default PrettyAccount;
