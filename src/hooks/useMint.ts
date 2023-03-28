import { ContractTransaction } from "ethers";
import { useMutation, useNetwork, useSigner } from "wagmi";
import {
  HypercertMinting,
  HypercertMetadata,
} from "@hypercerts-org/hypercerts-sdk";

import { useContractConfig } from "./useContractConfig";

export const useMintHypercert = (
  onSuccess: (data: ContractTransaction) => void
) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const { address: contractAddress } = useContractConfig("HypercertMinter");

  return useMutation(
    async (props: { address: string; claimData: HypercertMetadata }) => {
      if (!chain) return null;

      const rpc = chain?.rpcUrls.default.http[0];

      const { mintHypercert, transferRestrictions } = HypercertMinting({
        provider: signer as any,
        chainConfig: { chainID: String(chain.id), contractAddress, rpc } as any,
      });

      return mintHypercert(
        props.address,
        props.claimData,
        1,
        transferRestrictions.AllowAll
      ).then(onSuccess);
    }
  );
};
