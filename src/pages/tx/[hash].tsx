import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import { Layout } from "../../layouts/Layout";

const createTxUrl = (hash: string, network: string) => {
  const networkMap = { goerli: "goerli", optimism: "optimistic" };
  const prefix = networkMap[network as keyof typeof networkMap];

  return `https://${prefix}.etherscan.io/tx/${hash}`;
};
const MintingCert: NextPage = () => {
  const router = useRouter();
  const hash = router.query.hash as `0x${string}`;
  const { chain } = useNetwork();
  const tx = useWaitForTransaction({ hash, enabled: !!hash });

  // TODO: Update this usecase
  
  return (
    <Layout>
      <div className="flex h-full flex-col items-center sm:pt-32">
        <Spinner />
        <div className="mb-16 pt-8 text-2xl font-bold italic text-green-900 sm:mb-32">
          Minting...
        </div>

        <Button
          as={Link}
          href={createTxUrl(hash, chain?.network as string)}
          target="_blank"
          color="gradient"
        >
          View Transaction
        </Button>
      </div>
    </Layout>
  );
};

export default MintingCert;
