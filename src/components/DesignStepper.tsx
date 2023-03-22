import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Step = ({
  isActive,
  children,
}: { isActive?: boolean } & PropsWithChildren) => (
  <li
    className={
      "relative flex flex-col items-center justify-center text-indigo-900"
    }
  >
    <div
      className={clsx("mb-2 h-4 w-4 rounded-full border-indigo-900 bg-white", {
        ["border-4"]: isActive,
        ["border-2"]: !isActive,
      })}
    />

    <h3
      className={clsx("text-base", {
        ["font-bold"]: isActive,
      })}
    >
      {children}
    </h3>
  </li>
);

export const DesignStepper = () => (
  <ol className="relative flex justify-between">
    <div className="absolute z-0 mt-2 h-0.5 w-full  px-4 ">
      <div className="h-[2px] w-full  bg-indigo-900"></div>
    </div>
    <Step isActive>Text</Step>
    <Step>Design</Step>
    <Step>Mint</Step>
  </ol>
);
