import { useNetwork } from "wagmi";

import type { ContractType } from "config";
import { contracts } from "config";

export function useContractConfig(contractName: ContractType) {
  const { chain } = useNetwork();
  const empty = { abi: [], address: "" };
  if (!chain?.id) return empty;
  const id = chain.id as keyof typeof contracts;
  return contracts?.[id]?.[contractName] || empty;
}
