import hyperCertClient from "hooks/useHypercert";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { Button } from "./Button";
import { createOpenSeaUrl } from "./OpenSeaButton";

export const TweetButton = ({ text = "", tokenId = "" }) => {
  const { address } = hyperCertClient.contract;
  const { chain } = useNetwork();
  if (!chain?.id) return null;
  return (
    <Button
      className="w-64"
      as={Link}
      color="twitter"
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${text}&url=${createOpenSeaUrl(
        address,
        tokenId,
        chain.id
      )}`}
    >
      Tweet gratitude
    </Button>
  );
};
