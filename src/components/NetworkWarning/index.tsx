import { useNetwork } from "wagmi";

const NetworkWarning = () => {
  const { activeChain } = useNetwork();

  const show = activeChain && activeChain.name !== "Ethereum";

  if (!show) {
    return null;
  }

  return (
    <p className="sticky top-0 bg-orange-500 text-black text-sm text-center py-1.5 w-full">
      fyi, you're on {activeChain.name} testnet
    </p>
  );
};

export default NetworkWarning;
