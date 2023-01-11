import { Input } from "components/Form";
import { useForm } from "react-hook-form";
import { Button } from "components/Button";

import { useMint } from "hooks/useMint";
import { useEnsAddress } from "wagmi";
import { format } from "date-fns";
import { storeMetadata, validateMetaData } from "@network-goods/hypercerts-sdk";
import { ipfsClient } from "utils/ipfs";
import { generateSVG } from "utils/svg";
import { useRouter } from "next/router";
import { isAddress } from "ethers/lib/utils.js";

const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

const content = {
  intro: "I would like to send my gratitude to:",
};

const testValues = {
  contributor: "test.eth",
  reason: "helping",
  time: "2023-01-01T01:00",
};

const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v / 1000);

export const GratitudeForm = () => {
  const { register, handleSubmit, watch, formState, setError } = useForm({
    // defaultValues: testValues,
  });
  const router = useRouter();

  const mint = useMint((data) => router.push(`/tx/${data.hash}`));

  const contributor = watch("contributor");
  const ens = useEnsAddress({
    name: contributor,
    enabled: contributor?.length >= 3 && contributor.includes(".eth"),
  });
  const isLoading = formState.isSubmitting;

  return (
    <form
      className="text-lg text-gray-800"
      onSubmit={handleSubmit(async ({ contributor, reason, time }) => {
        const description = `${content.intro} ${contributor} for ${reason} at ${time}.`;
        const name = "gratitude.party";

        const contributorAddress = ens.data || contributor;
        const [workTimeStart, workTimeEnd, impactTimeStart, impactTimeEnd] =
          calcTime(new Date(time));

        if (isAddress(contributor) || ens.data) {
          const svg = await generateSVG({
            contributor,
            reason,
            date: +new Date(time),
          });

          const claimData = {
            name,
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

          if (validateMetaData(claimData)) {
            const cid = await storeMetadata(claimData, ipfsClient);
            return mint.write?.({
              recklesslySetUnpreparedArgs: [1, cid],
            });
          } else {
            console.log("Incorrect metadata");
          }
        } else {
          setError("contributor", {
            message: "Invalid address or ENS not found",
          });
        }
      })}
    >
      <div className="text-center ">{content.intro}</div>

      <Input
        {...register("contributor")}
        required
        autoFocus
        className="w-full text-center"
        placeholder="name.eth"
      />

      <div className="text-center">
        for{" "}
        <Input
          required
          {...register("reason")}
          className=""
          placeholder="helping me out with"
        />{" "}
        at{" "}
        <Input
          {...register("time")}
          required
          max={formatDate(new Date())}
          className=""
          type="datetime-local"
        />
      </div>
      <Button
        isLoading={isLoading}
        color="indigo"
        className="mt-8 mb-2 w-full"
        type="submit"
      >
        Generate
      </Button>

      <div className="text-sm text-red-600">
        {formState.errors.contributor?.message as string}
      </div>
    </form>
  );
};
