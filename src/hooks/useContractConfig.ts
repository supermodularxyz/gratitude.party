import { useNetwork } from "wagmi";

import { contracts, ContractType } from "config";

export function useContractConfig(contract: ContractType) {
  const { chain } = useNetwork();
  const empty = { abi: [], address: "" };
  if (!chain?.id) return empty;

  const id = chain.id as keyof typeof contracts;
  return contracts?.[id]?.[contract] || empty;
}
