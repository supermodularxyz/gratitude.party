import {
  cloneElement,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";
import {
  FormProvider,
  UseFormProps,
  useFormContext,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tv } from "tailwind-variants";
import { z } from "zod";
import clsx from "clsx";

import { createComponent } from ".";

const input = tv({
  base: "block w-full p-2 border border-gray-200 focus:outline-indigo-500 bg-white",
});
const textarea = tv({
  base: "rounded block w-full resize-none rounded border border-gray-200 bg-transparent p-2 focus:outline-indigo-500 bg-white",
});
const label = tv({
  base: "text-xl text-indigo-900 text-center block mb-1",
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
    <fieldset className={clsx("mb-2 flex-1", className)}>
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
