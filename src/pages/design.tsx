import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { useRouter } from "next/router";
import { useMintHypercert } from "hooks/useMint";
import { DesignStepper } from "components/DesignStepper";
import { Button } from "components/Button";
import { Designer, useDesign } from "components/Designer";
import Link from "next/link";
import { Form } from "components/Form";

import z from "zod";
import { GratitudeForm, gratitudeTemplate } from "components/GratitudeForm";
import { generateSVG } from "utils/svg";
import { useFormContext } from "react-hook-form";

const Schema = z.object({
  contributor: z.string(),
  reason: z.string(),
});

const CurrentStep = ({ step = "text" }) => {
  const form = useFormContext();
  switch (step) {
    case "text":
      return (
        <>
          <GratitudeForm />
          <div className="flex justify-center">
            <Button as={Link} href={"?step=design"} color="gradient">
              Next
            </Button>
          </div>
        </>
      );
    case "design":
      return <Designer text={gratitudeTemplate(form.watch())} />;
  }

  return null;
};
const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v / 1000);

const Design: NextPage = () => {
  const router = useRouter();
  const design = useDesign();

  const mint = useMintHypercert((data) => router.push(`/tx/${data.hash}`));

  return (
    <Layout>
      <Form
        defaultValues={{
          contributor: "chef.eth",
          reason: "being such a great chef",
        }}
        schema={Schema}
        onSubmit={async ({ contributor, reason }) => {
          const description = gratitudeTemplate({ contributor, reason });
          const svg = await generateSVG({ text: description, ...design });

          console.log(description);
          return;
          const [workTimeStart, workTimeEnd, impactTimeStart, impactTimeEnd] =
            calcTime(new Date());

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
                value: [contributor],
              },
            },
          };

          // Store form data
          // Increment step

          mint.mutate({ address: contributorAddress, claimData });
        }}
      >
        <div className="relative mb-12 pt-4">
          <div className="mb-12">
            <h1 className="mb-6 text-center text-4xl font-bold text-indigo-900">
              Customize the design
            </h1>
            <DesignStepper />
          </div>
          <CurrentStep step={router.query.step as string} />
        </div>
      </Form>
    </Layout>
  );
};

export default Design;
