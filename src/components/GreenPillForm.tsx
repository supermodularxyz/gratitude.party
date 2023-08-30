/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormContext } from "react-hook-form";
import React from "react";
import { DateRangeInput, FormControl, Input, Textarea } from "components/Form";
import { useEnsName } from 'wagmi';

export const content = {
  intro: "I would like to give thanks to",
};

// export const gratitudeTemplate = ({ contributor = "", Description = "" }) =>
//   `${content.intro} ${contributor} for ${Description}`;

const MAX_DESCRIPTION_LENGTH = 144;

export const GreenPillForm = () => {
  const { watch, setError, setValue } = useFormContext();

  const contributor = watch("contributor");
  const Description:string = watch("Description") || "";

    const {data: ens} = useEnsName({address: contributor})





  return (
    <div className="text-lg text-green-900 gap-4">
      <div className="flex flex-row justify-between w-full gap-2">
        <div className="flex flex-col w-full">
      <FormControl label={'Name of your Chapter'} name="chapter">
        <Input
          required
          autoFocus
          className="mb-4 w-full"
          placeholder=""
        />
      </FormControl>
      <FormControl label={"Tags for Scope of Work "} name="tags">
        <Input
          maxLength={MAX_DESCRIPTION_LENGTH}
          
          required
          placeholder="Social Impact, Public Health, Education, etc."
        />
      </FormControl>
      <FormControl label={"Duration of Contibution"} name="duration" className="my-4">
        <DateRangeInput 
          nameStart="start"
          nameEnd="end"
          labelStart="Start Date"
          labelEnd="End Date"
          className="mb-4 w-full"
        />
      </FormControl>
      <FormControl label={"Link where we can find info about work"} name="link">
      <Input
          required
          autoFocus
          className="mb-4 w-full"
          placeholder=""
        />
      </FormControl>
      </div>
      <div className="bg-green-200 border-green-600 border-1  items-center w-96">
        {/* TODO: PREVIEW IMAGE HERE */}
        Preview Image
      </div>
      </div>
      <FormControl label={"Description of the work delivered work"} name="description">
        <Textarea
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={6}
          required
          placeholder="Social Impact, Public Health, Education, etc."
        />
      </FormControl>
      <FormControl label={"Any Other Contributors?"} name="others">
        <Textarea
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={6}
          required
          placeholder="You can add names, address of contributors that consent to be registered publicaly."
        />
      </FormControl>
      
    </div>
  );
};
