import type { NextPage } from "next";
import { Layout } from "layouts/Layout";
import { useRouter } from "next/router";

import { useHypercert } from "hooks/useHypercert";
import { OpenSeaButton } from "components/OpenSeaButton";
import { TweetButton } from "components/TweetButton";
import Image from "next/image";

const HyperCert: NextPage = () => {
  const router = useRouter();
  const claimId = router.query.tokenId as string;

  const tokenId = claimId?.split("-")[1];
  const cert = useHypercert(claimId);

  const { image, description } = cert.data?.metadata || {};

  return (
    <Layout>
      <div className="mb-4 h-auto w-full">
        {image ? (
          <Image width={550} height={850} src={image} alt="Hypercert" />
        ) : (
          <div className="animate-pulse bg-gray-200" style={{ height: 544 }} />
        )}
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <OpenSeaButton tokenId={tokenId} />
        <TweetButton text={description} tokenId={tokenId} />
      </div>
    </Layout>
  );
};

export default HyperCert;
