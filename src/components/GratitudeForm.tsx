import { Input, Textarea } from "components/Form";
import { useFormContext } from "react-hook-form";

import { useEnsAddress } from "wagmi";
import { format } from "date-fns";
import { isAddress } from "ethers/lib/utils.js";

const content = {
  intro: "I would like to give thanks to",
};

export const gratitudeTemplate = ({ contributor = "", reason = "" }) =>
  `${content.intro} ${contributor} for ${reason}`;

const MAX_REASON_LENGTH = 144;
export const GratitudeForm = () => {
  const { register, handleSubmit, watch, formState, setError } =
    useFormContext();

  const contributor = watch("contributor");
  const reason = watch("reason") || "";
  const ens = useEnsAddress({
    name: contributor,
    enabled: contributor?.length >= 3 && contributor.includes(".eth"),
  });
  const isLoading = formState.isSubmitting;

  return (
    <div
      className="text-lg text-indigo-900"
      // onSubmit={handleSubmit(({ contributor, reason, time }) => {
      //   const description = `${content.intro} ${contributor} for ${reason} at ${time}.`;

      //   if (isAddress(contributor) || ens.data) {
      //     onSubmit({ description, contributor, ens: ens.data, reason, time });
      //   } else {
      //     setError("contributor", {
      //       message: "Invalid address or ENS not found",
      //     });
      //   }
      // })}
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

      <div className="text-sm text-red-600">
        {formState.errors.contributor?.message as string}
      </div>
    </div>
  );
};
