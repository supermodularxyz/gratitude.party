import { type NextPage } from "next";

import { LandingLayout, Layout } from "layouts/Layout";
import { Flare } from "components/Flare";
import { Button } from "components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <div className="md:flex">
        <div className="flex flex-col justify-center md:w-1/2">
          <h1 className="mb-8 text-5xl font-bold text-indigo-900">
            Express Gratitude to a Coworker
          </h1>
          <p className="mb-12 text-xl leading-8">
            Gratitude is the lifeblood of a regenerative team culture. If your
            coworker did something great, mint them a gratitude{" "}
            <a
              className="text-indigo-500 hover:text-indigo-800"
              href={"https://hypercerts.xyz"}
              target="_blank"
            >
              hypercert
            </a>{" "}
            to show your appreciation for their work!
          </p>
          <div className="flex justify-center md:justify-start">
            <Button color="gradient" as={Link} href={"/design"}>
              Generate your Gratitude
            </Button>
          </div>
        </div>
        <div className="px-16 md:w-1/2">
          <Flare />
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
