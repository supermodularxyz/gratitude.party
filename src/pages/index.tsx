import { type NextPage } from "next";

import { LandingLayout, Layout } from "layouts/Layout";
import { Flare } from "components/Flare";
import { Button } from "components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <div className="md:flex">
        <div className="flex flex-col justify-center">
          <h1 className="mb-8 text-5xl font-bold text-indigo-900">
            Express Gratitude to a Coworker
          </h1>
          <p className="mb-12 leading-8">
            Scelerisque purus semper eget duis at tellus at. Nisl suscipit
            adipiscing bibendum est ultricies. Tellus id interdum velit laoreet
            id. Massa vitae tortor condimentum lacinia quis. Maecenas ultricies
            mi eget mauris pharetra et. Urna nunc id cursus metus aliquam
            eleifend mi in nulla. Eu non diam phasellus vestibulum.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button color="gradient" as={Link} href={"/design"}>
              Generate your Gratitude
            </Button>
          </div>
        </div>
        <div className="animate-pulse">
          <Flare />
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
