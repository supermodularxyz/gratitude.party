import { Input } from "components/Form";
import { useForm } from "react-hook-form";
import { Button } from "components/Button";

import { useEnsAddress } from "wagmi";
import { format } from "date-fns";
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

type Props = {
  onSubmit: (form: {
    description: string;
    contributor: string;
    ens?: string | null;
    reason: string;
    time: string;
  }) => void;
};

export const GratitudeForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, watch, formState, setError } = useForm({
    defaultValues: testValues,
  });

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

        if (isAddress(contributor) || ens.data) {
          onSubmit({ description, contributor, ens: ens.data, reason, time });
        } else {
          setError("contributor", {
            message: "Invalid address or ENS not found",
          });
        }
      })}
    >
      <div className="text-center ">{content.intro}</div>

      <Input
        {...register("contributor", { required: true })}
        required
        autoFocus
        className="w-full text-center"
        placeholder="name.eth"
      />

      <div className="text-center">
        for{" "}
        <Input
          required
          {...register("reason", { required: true })}
          className=""
          placeholder="helping me out with"
        />{" "}
        at{" "}
        <Input
          {...register("time", { required: true })}
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
        disabled={isLoading || !formState.isValid}
      >
        Generate
      </Button>

      <div className="text-sm text-red-600">
        {formState.errors.contributor?.message as string}
      </div>
    </form>
  );
};
