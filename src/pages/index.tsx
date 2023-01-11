import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { GratitudeForm } from "components/GratitudeForm";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="pt-4">
        <h1 className="mb-6 text-center text-xs font-semibold tracking-widest">
          gratitude.party
        </h1>
        <GratitudeForm />
      </div>
    </Layout>
  );
};

export default Home;
