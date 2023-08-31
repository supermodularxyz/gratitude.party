import { type AppType } from "next/dist/shared/lib/utils";
// import { PrivyProvider } from '@privy-io/react-auth';
// import type { User } from '@privy-io/react-auth';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createConfig } from "wagmi";
import { goerli, optimism } from "wagmi/chains";

import site from "../config/site";
import { NextSeo } from "next-seo";
import "../styles/globals.css";

import { ChakraProvider } from '@chakra-ui/react'   



  import { createPublicClient, http } from 'viem';
   
  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: process.env.NODE_ENV === 'production' ? optimism : goerli,
      transport: http()
    }),
  })

  const handleLogin = (user: User) => {
  console.log(`User ${user?.id} logged in!`)
}

const queryClient = new QueryClient();

const { title, description, url } = site;
const imageUrl = `${url}/og.png`;
const MyApp: AppType = ({ Component, pageProps }) => {
  
  return (
    <>
    <ChakraProvider>
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
        <WagmiConfig config={wagmiConfig}>
{/*           
          <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        onSuccess={handleLogin}
        config={{
          loginMethods: ['email', 'wallet'],
          appearance: {
            theme: 'dark',
            accentColor: '#C2E812',
            logo: 'https://greenpill.network/src/images/greenpill-logo.svg',
            
          },
        }}
      > */}
            <Component {...pageProps} />
            {/* </PrivyProvider> */}
          
        </WagmiConfig>
      </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
