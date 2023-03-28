import { Input, Textarea } from "components/Form";
import { useForm } from "react-hook-form";
import { Button } from "components/Button";

import { useEnsAddress } from "wagmi";
import { format } from "date-fns";
import { isAddress } from "ethers/lib/utils.js";

const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

const content = {
  intro: "I would like to give thanks to:",
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

const MAX_REASON_LENGTH = 144;
export const GratitudeForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, watch, formState, setError } = useForm({
    defaultValues: testValues,
  });

  const contributor = watch("contributor");
  const reason = watch("reason") || "";
  const ens = useEnsAddress({
    name: contributor,
    enabled: contributor?.length >= 3 && contributor.includes(".eth"),
  });
  const isLoading = formState.isSubmitting;

  return (
    <form
      className="text-lg text-indigo-900"
      onSubmit={handleSubmit(({ contributor, reason, time }) => {
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
      <div className="mb-1 text-center">{content.intro}</div>

      <Input
        {...register("contributor", { required: true })}
        required
        autoFocus
        className="mb-4 w-full text-center"
        placeholder="name.eth"
      />

      <div className="mb-1 text-center">for </div>
      <Textarea
        maxLength={MAX_REASON_LENGTH}
        rows={6}
        required
        placeholder="helping me out with"
        {...register("reason", { required: true })}
      />
      <div className="text-right text-gray-400">
        {reason.length}/{MAX_REASON_LENGTH} characters
      </div>
      <div className="flex justify-center">
        <Button
          isLoading={isLoading}
          color="gradient"
          className="mt-8 mb-2 w-40"
          type="submit"
          disabled={isLoading || !formState.isValid}
        >
          Next
        </Button>
      </div>

      <div className="text-sm text-red-600">
        {formState.errors.contributor?.message as string}
      </div>
    </form>
  );
};
