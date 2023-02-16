import { useNetwork } from "wagmi";

import type { ContractType } from "config";
import { contracts } from "config";

export function useContractConfig(contractName: ContractType) {
  const { chain } = useNetwork();
  const empty = { abi: [], address: "" };
  if (!chain?.id) return empty;

  return contracts?.[chain.id]?.[contractName] || empty;
}
