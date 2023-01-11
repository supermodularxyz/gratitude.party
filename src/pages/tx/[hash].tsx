import { ethers } from "ethers";
import { Layout } from "layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { HypercertMinterABI } from "@network-goods/hypercerts-protocol";
import { Spinner } from "components/Spinner";

const MintingCert: NextPage = () => {
  const router = useRouter();
  const hash = router.query.hash as `0x${string}`;

  const tx = useWaitForTransaction({ hash, enabled: !!hash });

  useEffect(() => {
    if (tx.data?.logs?.[1]) {
      const iface = new ethers.utils.Interface(HypercertMinterABI);
      // Get ImpactClaimed event data
      const claim = iface.parseLog(tx.data?.logs?.[1]);
      // Redirect to tokenId
      router.push(`/hypercert/${claim.args.id}`);
    }
  }, [tx.data?.logs]);

  return (
    <Layout>
      <div className="flex h-full flex-col items-center pt-24">
        <div className="mb-4">Minting HyperCert</div>
        <Spinner />
      </div>
    </Layout>
  );
};

export default MintingCert;
