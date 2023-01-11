import { ElementType, forwardRef } from "react";
import cx from "clsx";

import { Box, BoxProps, PolymorphicRef } from "./Box";

const inputClass = `font-semibold focus:ring-1 rounded bg-transparent p-2 text-gray-800 outline-none  focus:border-indigo-600 focus:ring-indigo-600 placeholder-gray-400`;
export const Input = forwardRef(
  <C extends ElementType>(
    { className, ...props }: BoxProps<"input">,
    ref?: PolymorphicRef<C>
  ) => (
    <Box
      as="input"
      ref={ref}
      className={cx(inputClass, className)}
      {...props}
    />
  )
);

export const Textarea = forwardRef(
  <C extends ElementType>(
    { className, ...props }: BoxProps<"textarea">,
    ref?: PolymorphicRef<C>
  ) => (
    <Box
      as="textarea"
      ref={ref}
      className={cx(inputClass, className)}
      {...props}
    />
  )
);
