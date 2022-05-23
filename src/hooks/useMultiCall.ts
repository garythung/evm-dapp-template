import { useState, useEffect } from "react";
import { Provider } from "ethcall";
import { useNetwork, useProvider } from "wagmi";

// Hook to use Maker's multicall utility.
const useMultiCall = () => {
  const [multiCall, setMultiCall] = useState<Provider>();
  const { activeChain } = useNetwork();
  const provider = useProvider();

  useEffect(() => {
    const func = async () => {
      if (!activeChain || !provider) {
        return;
      }

      const ethcallProvider = new Provider();
      await ethcallProvider.init(provider);
      setMultiCall(ethcallProvider);
    };

    func();
  }, [activeChain, provider]);

  return {
    multiCall,
  };
};

export default useMultiCall;
