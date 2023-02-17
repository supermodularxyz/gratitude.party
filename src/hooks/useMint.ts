import type { Address, SendTransactionResult } from "@wagmi/core";
import { useContractWrite, useMutation } from "wagmi";

import {
  HypercertMetadata,
  storeMetadata,
  validateMetaData,
} from "@hypercerts-org/hypercerts-sdk";
import {
  mintHypercertToken,
  transferRestrictions,
} from "@hypercerts-org/hypercerts-sdk/lib/minting";

import { ipfsClient } from "utils/ipfs";
import { useContractConfig } from "./useContractConfig";

export const useMintHypercert = (
  onSuccess: (data: SendTransactionResult) => void
) => {
  const { abi, address } = useContractConfig("HypercertMinter");

  const mint = useContractWrite({
    address: address as Address,
    abi,
    functionName: "mintClaim",
    mode: "recklesslyUnprepared",
    onSuccess,
  });

  return useMutation(async (claimData: HypercertMetadata) => {
    if (validateMetaData(claimData)) {
      return storeMetadata(claimData, ipfsClient).then((cid) => {
        console.log("Metadata stored:", cid);

        const args = [1, cid, transferRestrictions.AllowAll];
        console.log("Minting Hypercert:", args);

        return mint.write?.({ recklesslySetUnpreparedArgs: args });

        // TODO: Doesn't work because NFT.Storage token is currently not possible to set
        // return mintHypercertToken(claimData, 1, transferRestrictions.AllowAll);
      });
    } else {
      console.log("Incorrect metadata");
      return null;
    }
  });
};
