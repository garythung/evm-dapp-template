import { useEffect, useState } from "react";
import {
  apiProvider,
  configureChains,
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

import { ToastProvider } from "~/contexts/ToastContext";
import WindowHelpers from "~/components/WindowHelpers";
import { PROVIDERS } from "~/constants";
import NetworkWarning from "~/components/NetworkWarning";

const SITE_INFO = {
  title: "my dapp",
  description: "a really cool dapp",
  endpoint: "https://www.example.com",
  domain: "example.com",
  twitter: "@example",
  banner: "/banner.png", // 1200x630
};

const { chains, provider } = configureChains(
  [chain.mainnet, chain.rinkeby],
  [
    apiProvider.jsonRpc((c) => ({
      rpcUrl: PROVIDERS[c.name],
    })),
    apiProvider.fallback(),
  ],
);

const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      wallet.coinbase({ chains, appName: SITE_INFO.title }),
      wallet.walletConnect({ chains }),
      wallet.rainbow({ chains }),
      wallet.ledger({ chains }),
      wallet.metaMask({ chains }),
      wallet.argent({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState(router.pathname);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }
  }, []);

  // track client-side page loads
  useEffect(() => {
    if (router.pathname !== prevPath) {
      window.analytics.page();
    }

    setPrevPath(router.pathname);
  }, [router.pathname]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{SITE_INFO.title}</title>
        <meta name="description" content={SITE_INFO.description}></meta>

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={SITE_INFO.endpoint} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SITE_INFO.title} />
        <meta property="og:description" content={SITE_INFO.description} />

        <meta
          property="og:image"
          content={SITE_INFO.endpoint + SITE_INFO.banner}
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content={SITE_INFO.domain} />
        <meta name="twitter:url" content={SITE_INFO.endpoint} />
        <meta name="twitter:title" content={SITE_INFO.title} />
        <meta name="twitter:site" content={SITE_INFO.twitter} />
        <meta name="twitter:creator" content={SITE_INFO.twitter} />
        <meta name="twitter:description" content={SITE_INFO.description} />
        <meta
          name="twitter:image"
          content={SITE_INFO.endpoint + SITE_INFO.banner}
        />
        <meta
          name="twitter:image:src"
          content={SITE_INFO.endpoint + SITE_INFO.banner}
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ToastProvider>
            <WindowHelpers />
            <NetworkWarning />
            {getLayout(<Component {...pageProps} />)}
          </ToastProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
