import type { AppProps } from "next/app";

import Layout from "@/components/layout";
import Meta from "@/components/meta";
import "@/styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: { walletChainType: "ethereum-and-solana" },
        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },
      }}
    >
      <Meta />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrivyProvider>
  );
};

export default App;
