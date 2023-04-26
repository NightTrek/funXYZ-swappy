import { BigNumber, utils } from 'ethers';

const Text = {
  prettyEthAccount: (account: string, chunkSize: number): string => {
    const StandardChunkSize = chunkSize || 4;
    const len = account.length;
    return `${account.slice(0, StandardChunkSize + 2)}...${account.slice(
      len - StandardChunkSize
    )}`;
  },

  // converts chainID into a pretty network name
  prettyChainName: (chainID: number): string => {
    switch (chainID) {
      case 137:
        return 'Polygon';
      case 5:
        return 'Goerli';
      case 1:
        return 'Ethereum';
      default:
        return 'Unknown';
    }
  },
  isFloat: (n: string): boolean => {
    // handle the case where a person has typed the first decimal place
    if (n.length > 1 && n[n.length - 1] === '.') {
      return /^-?\d*\.?\d+$/.test(`${n}0`);
    }
    return /^-?\d*\.?\d+$/.test(n);
  },

  // converts a string or BigNumber into a string with 4 decimal places using the Coin's decimals
  prettyBalance: (
    balance: string | BigNumber,
    decimals: number | undefined
  ): BigNumber => {
    const decimal = decimals || 18;
    if (typeof balance !== 'string' && BigNumber.isBigNumber(balance)) {
      return balance.div(BigNumber.from(10).pow(decimal));
    }
    const fullBigNumber = BigNumber.from(balance).div(
      BigNumber.from(10).pow(decimal)
    );
    if (fullBigNumber) {
      return fullBigNumber;
    }
    return BigNumber.from('0.000');
  },

  prettyEthBalance: (balance: BigNumber): string => {
    const remainder = balance.mod(1e14); // TODO test this with different Values of ETH
    return utils.formatEther(balance.sub(remainder));
  },
};

export default Text;
