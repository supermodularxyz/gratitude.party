import { useContractWrite } from "wagmi";
import { SendTransactionResult } from "@wagmi/core";

import { useContractConfig } from "./useContractConfig";

export const useMint = (onSuccess: (data: SendTransactionResult) => void) => {
  const { abi, address } = useContractConfig("HypercertMinter");

  return useContractWrite({
    address: address as `0x${string}`,
    abi,
    functionName: "mintClaim",
    mode: "recklesslyUnprepared",
    onSuccess,
  });
};
