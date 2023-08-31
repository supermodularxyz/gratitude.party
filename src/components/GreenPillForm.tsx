/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormContext } from "react-hook-form";
import React from "react";
import { DateRangeInput, Textarea } from "components/Form";
import { useEnsName } from 'wagmi';

export const content = {
  intro: "I would like to give thanks to",
};

// chakra migration

import {
    // FormErrorMessage,
    FormLabel,
    FormControl,
    Input
  } from '@chakra-ui/react'

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
            
      <FormControl label={'Name of your Chapter'}>
        <FormLabel htmlFor="name">Name of your Chapter</FormLabel>
        <Input
          required
          autoFocus
          className="mb-4 w-full"
          placeholder=""
        />
      </FormControl>
      <FormControl label={"Tags for Scope of Work"}>
      <FormLabel htmlFor="tags">Tags for Scope of Workr</FormLabel>
        <Input
          maxLength={MAX_DESCRIPTION_LENGTH}
          required
          placeholder="Social Impact, Public Health, Education, etc."
        />
      </FormControl>
      <FormControl label={"Duration of Contibution"} className="my-4">
      <FormLabel htmlFor="duration">Duration of Contibution</FormLabel>
        <DateRangeInput 
          nameStart="start"
          nameEnd="end"
          labelStart="Start Date"
          labelEnd="End Date"
          className="mb-4 w-full"
        />
      </FormControl>
      <FormControl label={"Link where we can find info about work"}>
      <FormLabel htmlFor="link">Link where we can find info about work</FormLabel>
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
      <FormControl label={"Description of the work delivered work"}>
      <FormLabel htmlFor="description">Description of the work delivered work</FormLabel>
        <Textarea
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={6}
          required
          placeholder="Social Impact, Public Health, Education, etc."
        />
      </FormControl>
      <FormControl label={"Any Other Contributors?"}>
      <FormLabel htmlFor="others">Any Other Contributors?</FormLabel>
        <Textarea
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={6}
          required
          placeholder="You can add names, address of contributors that consent to be registered publicly."
        />
      </FormControl>
      
    </div>
  );
};