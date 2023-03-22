import { createComponent } from ".";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center tracking-wide active:opacity-90 hover:opacity-90 transition-colors cursor-pointer",
  variants: {
    color: {
      default: "bg-indigo-900 hover:bg-indigo-800 text-white",
      gradient: "bg-gradient-to-r from-[#FFA8A8] to-[#FFDE88] text-indigo-900",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-5 py-3 text-md",
    },
    variant: {},
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export const Button = createComponent("button", button);
