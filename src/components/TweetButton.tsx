import Link from "next/link";
import { Button } from "./Button";
import { createOpenSeaUrl } from "./OpenSeaButton";

export const TweetButton = ({ text = "", tokenId = "" }) => (
  <Button
    className="w-full"
    as={Link}
    target="_blank"
    href={`https://twitter.com/intent/tweet?text=${text}&url=${createOpenSeaUrl(
      tokenId
    )}`}
  >
    Tweet gratitude
  </Button>
);
