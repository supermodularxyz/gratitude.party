import { ContractTransaction } from "ethers";
import { Address, useAccount, useMutation, useNetwork, useSigner } from "wagmi";
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
  const { address } = useAccount();
  const { address: contractAddress } = useContractConfig("HypercertMinter");

  return useMutation(async (claimData: HypercertMetadata) => {
    if (!chain) return null;

    const rpc = chain?.rpcUrls.default.http[0];

    const { mintHypercert, transferRestrictions } = HypercertMinting({
      provider: signer as any,
      chainConfig: { chainID: String(chain.id), contractAddress, rpc } as any,
    });

    return mintHypercert(
      address as Address,
      claimData,
      1,
      transferRestrictions.AllowAll
    ).then(onSuccess);
  });
};
