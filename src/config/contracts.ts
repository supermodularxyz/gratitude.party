import { optimism, goerli, hardhat } from "wagmi/chains";

export const contracts = {
  [optimism.id]: {
    HypercertMinter: {
      address:
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
        "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07",
    },
  },
  [goerli.id]: {
    HypercertMinter: {
      address: "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07",
    },
  },
  [hardhat.id]: {
    HypercertMinter: {
      address: "0x2C326dfb02B0399fe3686ba41A9b0C9Ff9D6572b",
    },
  },
};
export type ContractType = keyof (typeof contracts)[5];
