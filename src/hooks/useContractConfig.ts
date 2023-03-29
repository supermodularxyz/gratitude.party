import { useNetwork } from "wagmi";

import type { ContractType } from "config/contracts";
import { contracts } from "config/contracts";

export function useContractConfig(contractName: ContractType) {
  const { chain } = useNetwork();
  const empty = { address: "" };
  if (!chain?.id) return empty;
  const id = chain.id as keyof typeof contracts;
  return contracts?.[id]?.[contractName] || empty;
}
