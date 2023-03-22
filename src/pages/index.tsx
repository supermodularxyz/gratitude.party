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
              external_url: `${global.location.origin}`,
              image: `data:image/svg+xml;base64,${btoa(svg)}`,
              ref: "",
              properties: [],
              hypercert: {
                impact_scope: { value: ["gratitude.party"] },
                work_scope: { value: ["gratitude.party"] },
                impact_timeframe: {
                  value: [impactTimeStart as number, impactTimeEnd as number],
                },
                work_timeframe: {
                  value: [workTimeStart as number, workTimeEnd as number],
                },
                contributors: {
                  value: [contributorAddress],
                },
              },
            };

            mint.mutate({ address: contributorAddress, claimData });
          }}
        />
      </div>
    </Layout>
  );
};

export default Home;
