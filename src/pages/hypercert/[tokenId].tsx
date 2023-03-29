import type { NextPage } from "next";
import { Layout } from "layouts/Layout";
import { useRouter } from "next/router";

import { useHypercert } from "hooks/useHypercert";
import { OpenSeaButton } from "components/OpenSeaButton";
import { TweetButton } from "components/TweetButton";
import Image from "next/image";
import { config } from "components/HyperCertSVG";

const HyperCert: NextPage = () => {
  const router = useRouter();
  const claimId = router.query.tokenId as string;

  const tokenId = claimId?.split("-")[1];
  const cert = useHypercert(claimId);

  const { image, description } = cert.data?.metadata || {};

  return (
    <Layout>
      <div className="mb-16 h-auto w-full">
        {image ? (
          <Image
            width={config.width}
            height={config.height}
            src={image}
            alt="Hypercert"
          />
        ) : (
          <div
            className="animate-pulse bg-gray-200"
            style={{ height: config.height }}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <OpenSeaButton tokenId={tokenId} />
        <TweetButton text={description} tokenId={tokenId} />
      </div>
    </Layout>
  );
};

export default HyperCert;
