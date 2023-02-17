import { useContractConfig } from "hooks/useContractConfig";
import Link from "next/link";
import { Button } from "./Button";
import { createOpenSeaUrl } from "./OpenSeaButton";

export const TweetButton = ({ text = "", tokenId = "" }) => {
  const { address } = useContractConfig("HypercertMinter");
  return (
    <Button
      className="w-full"
      as={Link}
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${text}&url=${createOpenSeaUrl(
        address,
        tokenId
      )}`}
    >
      Tweet gratitude
    </Button>
  );
};
