import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../redux/hooks';
import { ConnectWeb3 } from '../../redux/web3Slice';
import text from '../../utils/text';
import Rocketship, { RocketshipSize } from '../Rocketship';
// TODO animate the account change
// TODO add login logic
const PrettyAccount = () => {
  const dispatch = useDispatch();
  const { account, error } = useAppSelector((state) => ({
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
        <div className="flex justify-between items-center ml-1 text-base">
          <span className="pr-1 font-bold text-black">Wallet</span>
          <span className="text-gray-500">
            {text.prettyEthAccount(account, 4)}
          </span>
        </div>
      ) : (
        <div className="flex justify-between items-center ml-1 text-base">
          <span className="text-gray-500">Connect your</span>
          <span className="pl-1 font-bold text-black">Wallet</span>
        </div>
      )}
    </div>
  );
};

export default PrettyAccount;
