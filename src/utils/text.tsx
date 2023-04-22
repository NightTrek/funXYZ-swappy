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
};

export default Text;
