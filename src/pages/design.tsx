import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import z from "zod";
import { useFormContext } from "react-hook-form";

import site from "config/site";
import { Layout } from "layouts/Layout";
import { Button } from "components/Button";
import { Designer, useDesign } from "components/Designer";
import { Form } from "components/Form";
import { GratitudeForm, gratitudeTemplate } from "components/GratitudeForm";
import { useMintHypercert } from "hooks/useMint";
import { generateSVG } from "utils/svg";

const Schema = z.object({
  contributor: z.string(),
  contributorAddress: z.string(),
  reason: z.string(),
});

const CurrentStep = ({ step = "text", isMinting = false }) => {
  const form = useFormContext();

  switch (step) {
    case "text":
      return (
        <>
          <GratitudeForm />
          <div className="flex justify-center">
            <Button
              className="w-48"
              as={Link}
              disabled={!form.formState.isValid}
              href={"?step=design"}
              color="gradient"
            >
              Next
            </Button>
          </div>
        </>
      );
    case "design":
      return (
        <>
          <Designer text={gratitudeTemplate(form.watch())} />
          <div className="flex justify-between">
            <Button as={Link} href={"?step=text"} color="ghost">
              Back
            </Button>
            <Button
              className="w-48"
              disabled={isMinting}
              type="submit"
              color="gradient"
            >
              {isMinting ? "Generating..." : "Generate"}
            </Button>
          </div>
        </>
      );
  }

  return null;
};
const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v / 1000);
const headings = {
  text: "Express your gratitude",
  design: "Customize the design",
};

const Design: NextPage = () => {
  const router = useRouter();
  const design = useDesign();
  const step = router.query.step as string;

  const mint = useMintHypercert((data) => router.push(`/tx/${data.hash}`));

  return (
    <Layout>
      <Form
        schema={Schema}
        onSubmit={async ({ contributor, contributorAddress, reason }) => {
          const description = gratitudeTemplate({ contributor, reason });
          const svg = await generateSVG({ text: description, ...design });

          const [workTimeStart, workTimeEnd, impactTimeStart, impactTimeEnd] =
            calcTime(new Date());

          const claimData = {
            name: site.title,
            description,
            external_url: `${global.location.origin}`,
            image: `data:image/svg+xml;base64,${btoa(svg)}`,
            ref: "",
            properties: [],
            hypercert: {
              impact_scope: { value: [site.title] },
              work_scope: { value: [site.title] },
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

          mint.mutate({ address: contributorAddress, claimData });
        }}
      >
        <h1 className="mb-6 text-center text-4xl font-bold text-indigo-900">
          {headings[step as keyof typeof headings]}
        </h1>
        <CurrentStep
          step={router.query.step as string}
          isMinting={mint.isLoading}
        />
      </Form>
    </Layout>
  );
};

export default Design;
