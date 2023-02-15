import { claimById } from "@hypercerts-org/hypercerts-sdk";
import { useState } from "react";
import { useContractRead, useQuery } from "wagmi";
import { useContractConfig } from "./useContractConfig";

export const useHypercert = (tokenId: string) => {
  /*
  TODO: Token not found?

  return useQuery(["certs", tokenId], () => claimById(tokenId), {
    enabled: Boolean(tokenId),
  });
  */
  const [metadata, setMetadata] = useState(null);
  const { abi, address } = useContractConfig("HypercertMinter");

  const token = useContractRead({
    address: address as `0x${string}`,
    abi,
    functionName: "uri",
    args: [tokenId],
    enabled: !!tokenId,
    onSuccess: (data: string) => {
      console.log("Fetching metadata for:", data);
      return fetch(`https://${data}.ipfs.nftstorage.link`)
        .then((r) => r.json())
        .then(setMetadata)
        .catch(console.log);
    },
  });
  return { ...token, metadata };
};
