import cx from "clsx";
import { ElementType, forwardRef } from "react";
import { Box, BoxProps, getProp, PolymorphicRef } from "./Box";
import { Spinner } from "./Spinner";

const config = {
  variants: {
    solid: {
      indigo:
        "text-indigo-50 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-800",
      gray: "bg-gray-200  hover:bg-gray-300 active:bg-gray-100",
    },
    ghost: {
      primary: "",
      gray: "hover:bg-gray-100",
    },
    outline: {
      indigo: "border-2 border-indigo-600 text-indigo-600",
      gray: "border-2",
      white: "border-2 border-white text-white hover:bg-gray-700",
    },
  },
  sizes: {
    xs: "text-xs py-1 px-3",
    sm: "text-sm py-2 px-3",
    md: "text-md py-2 px-5",
    lg: "text-lg px-5 py-3",
    xl: "text-xl py-3.5 px-6",
  },
};

const buttonClass =
  "rounded inline-flex cursor-pointer items-center justify-center text-center font-medium transition-colors";

export const Button = forwardRef(
  <C extends ElementType>(
    {
      as = "button",
      color = "gray",
      size = "md",
      rounded = "md",
      variant = "solid",
      className = "",
      type = "button",
      isLoading = false,
      ...props
    }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    return (
      <Box
        {...props}
        as={as}
        ref={ref}
        type={type}
        rounded={rounded}
        disabled={isLoading}
        className={cx(
          buttonClass,
          getProp(size, config.sizes),
          getProp(
            color,
            config.variants[variant as "solid" | "ghost" | "outline"]
          ),
          { ["opacity-50"]: props.disabled },
          { ["cursor-not-allowed"]: props.disabled },
          className
        )}
      >
        {isLoading ? <Spinner /> : props.children}
      </Box>
    );
  }
);
