import { HypercertClient } from "@hypercerts-org/sdk";
import { ethers } from "ethers";
import { optimism, goerli } from "wagmi/dist/chains";

const chain = process.env.NEXT_PUBLIC_ENV as string === "production" ? optimism : goerli;

// NOTE: you should replace this with your own JSON-RPC provider to the network
// This should have signing abilities and match the `chainId` passed into HypercertClient
const operator = ethers.providers.getDefaultProvider(chain.name);


const tokens = {
    nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN as string,
    web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
  };

  

const hyperCertClient = new HypercertClient({
  chainId: chain.id, 
  operator,
  ...tokens,
});

export default hyperCertClient;