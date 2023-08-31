import { Button, Text, Box, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

import GreenPillForm from "components/GreenPillForm";
import { useRouter } from "next/router";
import * as z from "zod";
import { Layout } from "../layouts/Layout";
import { createClaim } from "../utils/createClaim";
import { generateSVG } from "../utils/svg";

const Schema = z.object({
  contributor: z.string(),
  contributorAddress: z.string(),
  reason: z.string(),
});

type QueryParams = {
  step: "text" | "design";
};

type CurrentStepProps = {
  step?: "text" | "design";
  isMinting?: boolean;
};

const CurrentStep: React.FC<CurrentStepProps> = ({
  step = "text",
  isMinting = false,
}) => {
  switch (step) {
    case "text":
      return <GreenPillForm />;
    case "design":
      return (
        <Flex justifyContent="space-between">
          <Button as={Link} href={"?step=text"} colorScheme="teal">
            Back
          </Button>
          <Button w="48" isLoading={isMinting} type="submit" colorScheme="blue">
            Generate
          </Button>
        </Flex>
      );
    default:
      return <Text>Something Went Wrong</Text>;
  }
};

const headings = {
  text: "GREENPILL.NETWORK",
  design: "Customize the design",
};

const Design: NextPage = () => {
  const router = useRouter();
  const step = router.query.step as string;

  return (
    <Layout>
      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const contributor = formData.get('contributor') as string;
          const contributorAddress = formData.get('contributorAddress') as string;
          const reason = formData.get('reason') as string;

          const svg = await generateSVG({
            contributor,
            reason,
          });

          const claimData = createClaim({
            svg,
            contributor,
            contributorAddress,
          });

          console.log(claimData);
        }}
      >
        <Heading
          fontSize="4xl"
          fontFamily="bold"
          color="green.900"
          mb={6}
          textAlign="center"
        >
          {headings[step as never]}
        </Heading>
        <CurrentStep step={step as never} />
      </form>
      <Box pt={4} fontFamily="monospace" fontSize="sm" color="red.600"></Box>
    </Layout>
  );
};

export default Design;
