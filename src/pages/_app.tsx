import { type AppType } from "next/dist/shared/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { optimism, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import site from "config/site";
import { NextSeo } from "next-seo";

const availableChains =
  process.env.NODE_ENV !== "production" ? [goerli, optimism] : [optimism];

const { chains, provider } = configureChains(
  [optimism, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({ appName: site.title, chains });

const wagmiClient = createClient({ autoConnect: true, connectors, provider });
const queryClient = new QueryClient();

const { title, description, url } = site;
const imageUrl = `${url}/og.png`;
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: "image/png",
            },
          ],
          siteName: title,
        }}
        twitter={{
          handle: "@supermodularxyz",
          site: "@supermodularxyz",
          cardType: "summary_large_image",
        }}
      />
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
