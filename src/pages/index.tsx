import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { GratitudeForm } from "components/GratitudeForm";
import { generateSVG } from "utils/svg";
import { useRouter } from "next/router";
import { useMintHypercert } from "hooks/useMint";

const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v / 1000);

const Home: NextPage = () => {
  const router = useRouter();

  const mint = useMintHypercert((data) => router.push(`/tx/${data.hash}`));

  return (
    <Layout>
      <div className="pt-4">
        <h1 className="mb-6 text-center text-xs font-semibold tracking-widest">
          gratitude.party
        </h1>
        <GratitudeForm
          onSubmit={async ({ description, contributor, ens, reason, time }) => {
            const contributorAddress = ens || contributor;

            const [workTimeStart, workTimeEnd, impactTimeStart, impactTimeEnd] =
              calcTime(new Date(time));

            const svg = await generateSVG({
              contributor,
              reason,
              date: +new Date(time),
            });

            const claimData = {
              name: "gratitude.party",
              description,
              image: `data:image/svg+xml;base64,${btoa(svg)}`,
              ref: "",
              properties: {
                impactScopes: "gratitude.party",
                workScopes: "gratitude.party",
                impactTimeframe: [impactTimeStart, impactTimeEnd],
                workTimeframe: [workTimeStart, workTimeEnd],
                contributors: [contributorAddress],
              },
            };

            mint.mutate(claimData);
          }}
        />
      </div>
    </Layout>
  );
};

export default Home;
