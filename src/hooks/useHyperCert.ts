import { useState } from "react";
import { useContractRead } from "wagmi";
import { HypercertMinterABI } from "@network-goods/hypercerts-protocol";

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useHyperCert = (tokenId: string) => {
  const [metadata, setMetadata] = useState(null);
  const token = useContractRead({
    address,
    abi: HypercertMinterABI,
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
