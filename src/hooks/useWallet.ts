import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useProvider,
  useBalance,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { isAddress } from "~/utils/addresses";

// Hook for getting information about the current account.
const useWallet = () => {
  const { data: accountData, error } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();
  const provider = useProvider();

  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
    chainId: activeChain?.id,
    watch: true,
  });

  return {
    account: isAddress(accountData?.address),
    deactivate: disconnect,
    active: !!accountData,
    error: error,
    chainId: activeChain?.id,
    provider,
    activate: connect,
    balance: balanceData ? balanceData.value.toString() : "0", // string
  };
};

export default useWallet;
