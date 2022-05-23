const CHAIN_ID_TO_ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

/**
 * Returns an etherscan link to the resource.
 *
 * @param chainId - Network chain id.
 * @param id - The resource id.
 * @param type - The resource type.
 * @returns The shortened address.
 */
export const getEtherscanLink = (
  chainId: number,
  id: string,
  type: "transaction" | "token" | "address" | "block",
) => {
  const prefix = `https://${
    CHAIN_ID_TO_ETHERSCAN_PREFIXES[chainId] || CHAIN_ID_TO_ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${id}`;
    }

    case "token": {
      return `${prefix}/token/${id}`;
    }

    case "block": {
      return `${prefix}/block/${id}`;
    }

    case "address":
    default: {
      return `${prefix}/address/${id}`;
    }
  }
};
