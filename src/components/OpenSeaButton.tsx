import hyperCertClient from "hooks/useHypercert";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { Button } from "./Button";

const openseaUrls = {
  5: "https://testnets.opensea.io/assets/goerli/",
  10: "https://opensea.io/assets/optimism/",
} as const;

export const createOpenSeaUrl = (
  contractAddress: string,
  tokenId: string,
  chainId: number
) =>
  `${
    openseaUrls[chainId as keyof typeof openseaUrls]
  }/${contractAddress}/${tokenId}`;

export const OpenSeaButton = ({ tokenId = "" }) => {
  const {address} = hyperCertClient.contract;
  
  const { chain } = useNetwork();
  if (!chain?.id) return null;
  return (
    <Button
      color="gradient"
      className="w-64"
      as={Link}
      target="_blank"
      href={createOpenSeaUrl(address, tokenId, chain.id)}
    >
      View on OpenSea
    </Button>
  );
};
