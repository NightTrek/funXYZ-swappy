import React, { useEffect, useState } from 'react';

import text from '../../utils/text';
import Rocketship, { RocketshipSize } from '../Rocketship';

// TODO animate the account change
// TODO add login logic
const PrettyAccount = () => {
  const [account, setAccount] = useState('');
  // handle the ethers login logic for metamask
  const handleConnectWallet = () => {
    console.log('connect wallet');
    setTimeout(() => {
      setAccount('0xCe94C847d66afE656704e9d9E6D53B33b6b01F3e');
    }, 2000);
  };
  // function which will handle the login logic
  useEffect(() => {
    if (account === '') {
      handleConnectWallet();
    }
  }, [account]);

  return (
    <div className="flex flex-nowrap justify-evenly">
      <Rocketship size={RocketshipSize.SMALL} />
      {account !== '' ? (
        <div className="ml-1 flex items-center justify-between text-base">
          <span className="pr-1 font-bold text-black">Wallet</span>
          <span className="text-gray-500">
            {text.prettyEthAccount(account, 4)}
          </span>
        </div>
      ) : (
        <div className="ml-1 flex items-center justify-between text-base">
          <span className="text-gray-500">Connect your</span>
          <span className="pl-1 font-bold text-black">Wallet</span>
        </div>
      )}
    </div>
  );
};

export default PrettyAccount;
