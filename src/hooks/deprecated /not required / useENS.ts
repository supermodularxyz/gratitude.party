import { useQuery } from "@tanstack/react-query";
import { providers } from "ethers";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const provider = new providers.AlchemyProvider("homestead", alchemyKey);

export const useEnsAddress = (name: string) =>
  useQuery(["ens", name], () => provider.resolveName(name), {
    enabled: name?.length >= 3 && name.includes(".eth"),
  });
