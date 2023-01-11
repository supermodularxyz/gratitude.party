import { useContractWrite } from "wagmi";
import { SendTransactionResult } from "@wagmi/core";

import { HypercertMinterABI } from "@network-goods/hypercerts-protocol";

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useMint = (onSuccess: (data: SendTransactionResult) => void) => {
  return useContractWrite({
    address,
    abi: HypercertMinterABI,
    functionName: "mintClaim",
    mode: "recklesslyUnprepared",
    onSuccess,
  });
};
