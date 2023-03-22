import { tv } from "tailwind-variants";

import { createComponent } from ".";

const input = tv({
  base: "block w-full p-2 border border-gray-200 focus:outline-indigo-500 bg-white",
});
const textarea = tv({
  base: "rounded block w-full resize-none rounded border border-gray-200 bg-transparent p-2 focus:outline-indigo-500 bg-white",
});
const label = tv({
  base: "text-sm font-bold text-gray-500",
});

export const Input = createComponent("input", input);
export const Textarea = createComponent("textarea", textarea);
export const Label = createComponent("label", label);
