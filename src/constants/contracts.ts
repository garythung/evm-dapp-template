export type Contract = "weth";

type Addresses = {
  Localhost: string;
  Rinkeby: string;
  Ethereum: string;
};

// Localhost addresses match mainnet because mainnet forking will likely be used.
export const CONTRACTS: { [key in Contract]: Addresses } = {
  weth: {
    Localhost: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    Rinkeby: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    Ethereum: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
};
