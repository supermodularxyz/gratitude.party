// still works but not required

import type { HypercertClaimdata} from "@hypercerts-org/sdk";
import { HypercertsStorage } from "@hypercerts-org/sdk";
import { request, gql } from "graphql-request";
import { useNetwork, useQuery } from "wagmi";

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN as string,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
};

const query = gql`
  query ClaimById($id: ID!) {
    claim(id: $id) {
      contract
      tokenID
      creator
      id
      owner
      totalUnits
      uri
    }
  }
`;
const subgraphUrls = {
  5: "https://api.thegraph.com/subgraphs/name/hypercerts-admin/hypercerts-testnet",
  10: "https://api.thegraph.com/subgraphs/name/hypercerts-admin/hypercerts-optimism-mainnet",
} as const;

export const useHypercert = (claimId: string) => {
  const { chain } = useNetwork();
  const subgraphUrl = subgraphUrls[chain?.id as keyof typeof subgraphUrls];

  return useQuery(
    ["certs", claimId],
    () =>
      {
        request(subgraphUrl, query, { id: claimId })
        .then((resp: any) => new HypercertsStorage(tokens)
        .getMetadata(resp.claim.uri)
        .then((metadata: any) => ({ ...resp.claim, metadata }))
        ), { enabled: Boolean(claimId) }

  );
};
