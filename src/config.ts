import { optimism, goerli, hardhat } from "wagmi/chains";
import { HypercertMinterABI } from "@hypercerts-org/hypercerts-sdk";

export const contracts = {
  [optimism.id]: {
    HypercertMinter: {
      abi: HypercertMinterABI,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
    },
  },
  [goerli.id]: {
    HypercertMinter: {
      abi: HypercertMinterABI,
      address: "0x94a04ce2e537eaf2bdabd629de503797e7021e87",
    },
  },
  [hardhat.id]: {
    HypercertMinter: {
      abi: HypercertMinterABI,
      address: "0x2C326dfb02B0399fe3686ba41A9b0C9Ff9D6572b",
    },
  },
};
export type ContractType = keyof (typeof contracts)[5];
