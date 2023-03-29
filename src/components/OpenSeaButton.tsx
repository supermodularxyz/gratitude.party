import { useContractConfig } from "hooks/useContractConfig";
import Link from "next/link";
import { Button } from "./Button";

const openseaUrl = process.env.NEXT_PUBLIC_OPENSEA_URL;

export const createOpenSeaUrl = (contractAddress: string, tokenId: string) =>
  `${openseaUrl}/${contractAddress}/${tokenId}`;

export const OpenSeaButton = ({ tokenId = "" }) => {
  const { address } = useContractConfig("HypercertMinter");
  return (
    <Button
      color="gradient"
      className="w-64"
      as={Link}
      target="_blank"
      href={createOpenSeaUrl(address, tokenId)}
    >
      View on OpenSea
    </Button>
  );
};
