import { ethers } from "ethers";
import { Layout } from "layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { HypercertMinterABI } from "@hypercerts-org/sdk";
import { Spinner } from "components/Spinner";
import { Button } from "components/Button";
import Link from "next/link";

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

  useEffect(() => {
    if (tx.data?.logs?.[1]) {
      const iface = new ethers.utils.Interface(HypercertMinterABI);
      // Get ImpactClaimed event data
      const claim = iface.parseLog(tx.data?.logs?.[1]);

      // Claim ID is <contract_address>-<tokenId>
      // Not sure why tx.data.to has different casing compared to what the hypercertSdk.claimById() expects
      // Another way could be to get address from useContractConfig hook
      const claimId = [tx.data.to.toLowerCase(), claim.args.id].join("-");

      router.push(`/hypercert/${claimId}`);
    }
  }, [tx.data?.logs]);

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
