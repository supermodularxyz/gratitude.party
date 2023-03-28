import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { useRouter } from "next/router";
import { useMintHypercert } from "hooks/useMint";
import { DesignStepper } from "components/DesignStepper";
import { HyperCertSVG } from "components/HyperCertSVG";
import { useState } from "react";
import { Button } from "components/Button";
import { Designer } from "components/Designer";

const Design: NextPage = () => {
  const router = useRouter();

  const mint = useMintHypercert((data) => router.push(`/tx/${data.hash}`));

  return (
    <Layout>
      <div className="relative mb-12 pt-4">
        <div className="mb-12">
          <h1 className="mb-6 text-center text-4xl font-bold text-indigo-900">
            Customize the design
          </h1>
          <DesignStepper />
        </div>
        <Designer />
      </div>

      <div className="flex justify-between">
        <Button color="ghost">Back</Button>
        <Button color="gradient">Mint</Button>
      </div>
    </Layout>
  );
};

export default Design;
