import Link from "next/link";
import { Button } from "./Button";

const openseaUrl = process.env.NEXT_PUBLIC_OPENSEA_URL;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const createOpenSeaUrl = (tokenId: string) =>
  `${openseaUrl}/${contractAddress}/${tokenId}`;
export const OpenSeaButton = ({ tokenId = "" }) => (
  <Button
    className="w-full"
    as={Link}
    target="_blank"
    href={createOpenSeaUrl(tokenId)}
  >
    View on OpenSea
  </Button>
);
