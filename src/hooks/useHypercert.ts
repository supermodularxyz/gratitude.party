import {
  HypercertMetadata,
  HypercertsStorage,
} from "@hypercerts-org/hypercerts-sdk";
import { claimById } from "@hypercerts-org/hypercerts-sdk";
import { useQuery } from "wagmi";

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN as string,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
};
export const useHypercert = (claimId: string) => {
  return useQuery(
    ["certs", claimId],
    () =>
      claimById(claimId).then((r) =>
        new HypercertsStorage(tokens)
          .getMetadata(r.claim?.uri as string)
          .then((metadata: HypercertMetadata) => {
            console.log("meta", metadata);
            return { ...r.claim, metadata };
          })
      ),
    { enabled: Boolean(claimId) }
  );
};
