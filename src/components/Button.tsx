import { createComponent } from ".";
import { tv } from "tailwind-variants";

export const gradient = "from-[#FFA8A8] to-[#FFDE88]";

const button = tv({
  base: "inline-flex justify-center items-center tracking-wide active:opacity-90 hover:opacity-90 transition-colors cursor-pointer",
  variants: {
    color: {
      default: "bg-green-900 hover:bg-green-800 text-white",
      twitter: "bg-sky-500 text-white",
      ghost: "text-green-900 hover:bg-green-50",
      gradient: `bg-gradient-to-r ${gradient} text-green-900`,
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-5 py-3 text-md",
    },
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
