import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { GratitudeForm } from "components/GratitudeForm";
import { generateSVG } from "utils/svg";
import { useRouter } from "next/router";
import { useMintHypercert } from "hooks/useMint";
import { DesignStepper } from "components/DesignStepper";
import { HyperCertSVG } from "components/HyperCertSVG";

const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v / 1000);

const Home: NextPage = () => {
  const router = useRouter();

  const mint = useMintHypercert((data) => router.push(`/tx/${data.hash}`));

  return (
    <Layout>
      <div className="relative pt-4">
        <div className="mb-12">
          <h1 className="mb-6 text-center text-4xl font-bold text-indigo-900">
            Customize the design
          </h1>
          <DesignStepper />
        </div>
        <div className="absolute -translate-x-full pl-4 pr-12">
          <div>Colors</div>
          <div>...</div>
          <div>Shapes</div>
          <div>...</div>
        </div>
        <div className="">
          <HyperCertSVG text="I would like to give thanks to cucumber.eth for being such a great vegetable." />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
