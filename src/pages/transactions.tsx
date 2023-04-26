import { ethers } from 'ethers';
import React from 'react';
import { useSelector } from 'react-redux';

import { Meta } from '@/layouts/Meta';
import type { RootState } from '@/redux/store';
import { Main } from '@/templates/Main';

const Transactions = [
  {
    txhash:
      '0x2f6e18cb3910d0301d97368bff45b3a2f52b312e31e85e3903e3856dca0f3785',
    status: 'pending',
    fromTicker: 'USDC',
    toTicker: 'DAI',
    contract: '0x0576a174d229e3cfa37253523e645a78a0c91b57',
    value: '0.0186',
    unixtime: '1690682904',
  },
];

interface ITransactionRowProps {
  transaction: ethers.providers.TransactionResponse;
}
const TransactionRow = (props: ITransactionRowProps) => {
  // const {transactionHistory} = useSelector((state: RootState) => ({
  //     transactionHistory: state.tx.history,
  // })
  console.log(props.transaction);
  return (
    <div className="flex w-full items-center justify-start">
      {props.transaction.hash}
    </div>
  );
};

const TransactionsPage = () => {
  const { address } = useSelector((state: RootState) => ({
    address: state.web3.account,
  }));
  const [history, setHistory] = React.useState(
    [] as ethers.providers.TransactionResponse[]
  );
  React.useEffect(() => {
    if (!address) return;
    if (history.length > 0) return;
    const etherscanProvider = new ethers.providers.EtherscanProvider(
      'goerli',
      'XB9AAKUPSIP4M6GVE7B6MJ3USJGRR42MGE'
    );
    etherscanProvider
      .getHistory(address)
      .then((res) => {
        setHistory(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Transaction History"
          description="Transaction History - Look at your previous transactions."
        />
      }
      displayWalletControls={true}
    >
      <div className="items-evenly flex h-screen w-full flex-col justify-start">
        <div className="flex w-full items-center justify-start">
          <span className="text-2xl font-bold">Activity</span>
        </div>
        {history.map((transaction, index) => {
          return <TransactionRow transaction={transaction} key={index} />;
        })}
      </div>
    </Main>
  );
};

export default TransactionsPage;
