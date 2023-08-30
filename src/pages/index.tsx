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
          <h1 className="mb-8 text-5xl font-bold text-green-900">
            Green Pill Network
          </h1>
          <p className="mb-12 text-xl leading-8">
          TURNING
            DEGENS
            TO REGENS
            (one green pill at a time)
          <br/>
            <a
              className="text-green-500 hover:text-green-800"
              href={"https://hypercerts.xyz"}
              target="_blank"
              rel="noreferrer"
            >
              Mint hypercert
            </a>{" "}
            to claim your proof of Impact
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
