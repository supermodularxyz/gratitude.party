import "@rainbow-me/rainbowkit/styles.css";
import { type AppType } from "next/dist/shared/lib/utils";

import { PrivyProvider, User } from '@privy-io/react-auth';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, optimism } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


import site from "config/site";
import { NextSeo } from "next-seo";
import "../styles/globals.css";

const availableChains =
  process.env.NODE_ENV !== "production" ? [goerli, optimism] : [optimism];

const { chains, publicClient } = configureChains(
  [...availableChains],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);
const handleLogin = (user: User) => {
  console.log(`User ${user?.id} logged in!`)
}


const { connectors } = getDefaultWallets({ appName: site.title, chains, projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID as string });

const wagmiClient = createConfig({ autoConnect: true, connectors, publicClient });
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
        <WagmiConfig config={wagmiClient}>
          
          <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        onSuccess={handleLogin}
        config={{
          loginMethods: ['email', 'wallet'],
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: 'https://your-logo-url',
          },
        }}
      >
            <Component {...pageProps} />
            </PrivyProvider>
          
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
