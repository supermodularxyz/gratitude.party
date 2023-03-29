/*

In the Figma designs there were 3 steps - text, design, mint.
The third one seems superfluous because it is basically the same view as the design step.

This makes the step component unnecessary with only two steps. 
Keeping this component in case we want to bring it back.

*/

import * as Tabs from "@radix-ui/react-tabs";
import { useFormContext } from "react-hook-form";

import { GratitudeForm, gratitudeTemplate } from "./GratitudeForm";
import { Button } from "./Button";
import Link from "next/link";
import { Designer } from "./Designer";
import { createComponent } from "components";
import { tv } from "tailwind-variants";

const Step = createComponent(
  "div",
  tv({
    base: "relative flex flex-col items-center justify-center text-indigo-900",
  })
);
const Bullet = createComponent(
  "div",
  tv({
    base: "mb-2 h-4 w-4 rounded-full border-indigo-900 bg-white",
    variants: {
      status: {
        default: "border-2",
        active: "border-4",
        complete: "bg-indigo-900",
      },
    },
    defaultVariants: {
      status: "default",
    },
  })
);

const headings = {
  text: "Express your gratitude",
  design: "Customize the design",
  mint: "Generate Your Gratitude",
};

export const DesignStepper = ({ currentStep = "text", isMinting = false }) => {
  const form = useFormContext();
  const text = gratitudeTemplate(form.watch());

  return (
    <div>
      <h1 className="mb-6 text-center text-4xl font-bold text-indigo-900">
        {headings[currentStep as keyof typeof headings]}
      </h1>
      <Tabs.Root value={currentStep}>
        <Tabs.List
          aria-label="design steps"
          className="relative flex justify-between"
        >
          <div className="absolute z-0 mt-2 h-0.5 w-full  px-4 ">
            <div className="h-[2px] w-full  bg-indigo-900"></div>
          </div>
          <Step as={Tabs.Trigger} value="text">
            <Bullet status={currentStep === "text" ? "active" : "complete"} />
            Text
          </Step>
          <Step as={Tabs.Trigger} value="design">
            <Bullet status={currentStep === "design" ? "active" : "default"} />
            Design
          </Step>
        </Tabs.List>
        <Tabs.Content value="text">
          <GratitudeForm />
          <div className="flex justify-center">
            <Button as={Link} href={"?step=design"} color="gradient">
              Next
            </Button>
          </div>
        </Tabs.Content>
        <Tabs.Content value="design">
          <Designer text={text} />
          <div className="flex justify-between">
            <Button as={Link} href={"?step=text"} color="ghost">
              Back
            </Button>
            <Button disabled={isMinting} type="submit" color="gradient">
              {isMinting ? "Generating..." : "Generate"}
            </Button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
