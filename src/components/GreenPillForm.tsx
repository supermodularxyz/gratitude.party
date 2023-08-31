import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import * as z from 'zod';
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Box, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/react';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  tags: z.string().min(1, { message: 'Required' }),
  link: z.string().url({ message: 'Invalid URL' }),
  description: z.string().min(1, { message: 'Required' }),
  others: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

const GreenPillForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Box fontSize="lg" color="green.900">
        <FormControl id="name">
          <FormLabel>Name of your Chapter</FormLabel>
          <Input
            {...register('name')}
            isInvalid={errors.name ? true : false}
            autoFocus
            mb={4}
            w="full"
            placeholder=""
          />
        </FormControl>
        <FormControl id="tags">
          <FormLabel>Tags for Scope of Work</FormLabel>
          <Input
            {...register('tags')}
            isInvalid={errors.tags ? true : false}
            placeholder="Social Impact, Public Health, Education, etc."
          />
        </FormControl>
        <FormControl id="link">
          <FormLabel>Link where we can find info about work</FormLabel>
          <Input
            {...register('link')}
            isInvalid={errors.link ? true : false}
            autoFocus
            mb={4}
            w="full"
            placeholder=""
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description of the Work</FormLabel>
          <Textarea
            {...register('description')}
            isInvalid={errors.description ? true : false}
            rows={6}
            placeholder="Social Impact, Public Health, Education, etc."
          />
        </FormControl>
        <FormControl id="others">
          <FormLabel>Any Other Contributors?</FormLabel>
          <Textarea
            {...register('others')}
            isInvalid={errors.others ? true : false}
            rows={6}
            placeholder="You can add names, address of contributors that consent to be registered publicly."
          />
        </FormControl>

        <FormControl id="startDate">
          <FormLabel>Start Date</FormLabel>
          <SingleDatepicker
          {...register('startDate')}
          onDateChange={(date) => console.log(date)}
          />
        </FormControl>

        <FormControl id="endDate">
          <FormLabel>End Date</FormLabel>
          <SingleDatepicker
          {...register('endDate')}
          onDateChange={(date) => console.log(date)}
          />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default GreenPillForm;