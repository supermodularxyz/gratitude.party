import { Layout } from "layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useHypercert } from "hooks/useHypercert";
import { OpenSeaButton } from "components/OpenSeaButton";
import { TweetButton } from "components/TweetButton";

const HyperCert: NextPage = () => {
  const router = useRouter();
  const tokenId = router.query.tokenId as string;

  const cert = useHypercert(tokenId);

  const { image, description } = (cert.data as any)?.metadata || {};

  return (
    <Layout>
      <div className="mb-4 h-auto w-full">
        {image ? (
          <img src={image} />
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
