import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";
import { cloneElement } from "react";
import type { UseFormProps } from "react-hook-form";
import { FormProvider, useFormContext, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tv } from "tailwind-variants";
import type { z } from "zod";
import clsx from "clsx";

import { createComponent } from ".";

const input = tv({
  base: "block w-full p-2 border border-gray-200 text-left focus:outline-green-500 bg-white",
});
const textarea = tv({
  base: "rounded block w-full resize-none rounded border border-gray-200 text-left bg-transparent p-2 focus:outline-green-500 bg-white",
});
const label = tv({
  base: "text-sm py-1 text-green-900 text-left  block mb-1",
});

export const Input = createComponent("input", input);
export const Textarea = createComponent("textarea", textarea);
export const Label = createComponent("label", label);

export const FormControl = ({
  name,
  label,
  hint,
  children,
  className,
}: {
  name: string;
  label: string;
  hint?: string;
} & ComponentPropsWithoutRef<"fieldset">) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  return (
    <fieldset className={clsx("mb-2 flex-1 items-start", className)}>
      <Label htmlFor={name}>{label}</Label>
      {cloneElement(children as ReactElement, { id: name, ...register(name) })}
      {hint ? <div className="pt-1 text-xs text-gray-500">{hint}</div> : null}
      {error ? (
        <div className="pt-1 text-xs text-red-500">
          {error.message as string}
        </div>
      ) : null}
    </fieldset>
  );
};

interface DateRangeInputProps {
  nameStart: string;
  nameEnd: string;
  labelStart: string;
  labelEnd: string;
  className?: string;
  hintStart?: string;
  hintEnd?: string;
}

export const DateRangeInput = ({
  nameStart,
  nameEnd,
  labelStart,
  labelEnd,
  className,
  hintStart,
  hintEnd,
}: DateRangeInputProps): ReactElement => {
  return (
    <div className="p-4  border-green-100 border">
      <FormControl
        name={nameStart}
        label={labelStart}
        className={className}
        hint={hintStart}
      >
        <Input type="date" />
      </FormControl>
      <FormControl
        name={nameEnd}
        label={labelEnd}
        className={className}
        hint={hintEnd}
      >
        <Input type="date" />
      </FormControl>
    </div>
  );
};



export interface FormProps<S extends z.ZodType<any, any>>
  extends PropsWithChildren {
  defaultValues?: UseFormProps<z.infer<S>>["defaultValues"];
  schema: S;
  onSubmit: (values: z.infer<S>) => void;
}

export function Form<S extends z.ZodType<any, any>>({
  defaultValues,
  schema,
  children,
  onSubmit,
}: FormProps<S>) {
  // Initialize the form with defaultValues and schema for validation
  const form = useForm({ defaultValues, resolver: zodResolver(schema) });
  // Pass the form methods to a FormProvider. This lets us access the form from components without passing props.
  console.log(form.formState.errors);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
