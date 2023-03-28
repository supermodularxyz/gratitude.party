import { type AppType } from "next/dist/shared/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { Chain } from "wagmi";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { optimism, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "../styles/globals.css";
import { contracts } from "config/contracts";

const onlyWithAddress = (chain: Chain) =>
  Object.entries(contracts?.[chain.id as keyof typeof contracts] || {}).every(
    ([_, { address }]) => address
  );

const { chains, provider } = configureChains(
  [optimism, goerli].filter(onlyWithAddress),
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "gratitude.party",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />{" "}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
