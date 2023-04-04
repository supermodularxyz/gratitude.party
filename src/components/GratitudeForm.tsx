import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { isAddress } from "ethers/lib/utils.js";

import { FormControl, Input, Textarea } from "components/Form";
import { useEnsAddress } from "hooks/useENS";

export const content = {
  intro: "I would like to give thanks to",
};

export const gratitudeTemplate = ({ contributor = "", reason = "" }) =>
  `${content.intro} ${contributor} for ${reason}`;

const MAX_REASON_LENGTH = 144;

export const GratitudeForm = () => {
  const { watch, setError, setValue } = useFormContext();

  const contributor = watch("contributor");
  const reason = watch("reason") || "";

  const ens = useEnsAddress(contributor);

  console.log(ens.data, ens.error);

  useEffect(() => {
    const contributorAddress = isAddress(contributor) ? contributor : ens.data;
    setValue("contributorAddress", contributorAddress);
    setError("contributor", {
      message:
        contributor?.length === 0 || contributorAddress
          ? ""
          : "Invalid address or ENS not found",
    });
  }, [ens.data, contributor]);
  return (
    <div className="text-lg text-indigo-900">
      <FormControl label={content.intro} name="contributor">
        <Input
          required
          autoFocus
          className="mb-4 w-full text-center"
          placeholder="name.eth"
        />
      </FormControl>
      <FormControl label={"for "} name="reason">
        <Textarea
          maxLength={MAX_REASON_LENGTH}
          rows={6}
          required
          placeholder="helping me out with"
        />
      </FormControl>
      <div className="text-right text-gray-400">
        {reason.length}/{MAX_REASON_LENGTH} characters
      </div>
    </div>
  );
};
