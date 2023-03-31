import clsx from "clsx";
import { createComponent } from "components";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Button, gradient } from "./Button";
import { HyperCertSVG } from "./HyperCertSVG";

import { createGlobalState } from "react-use";

// TODO: How to define these? pointers to public/svgPatterns/{pattern}.svg?
const shapes = ["1", "2", "3", "4", "5", "6"];
const colors = [
  ["#4a4c89", "#ffdc8a"],
  ["#da7b66", "#fff"],
  ["#e0e1a7", "#5b7e4a"],
  ["#f2ccff", "#395ee0"],
  ["#80daee", "#4a4c89"],
  ["#fff3d4", "#ff3c3c"],
];

// We want to access this from the outside. Simple than a DesignProvider Context
const useDesignState = createGlobalState({
  color: colors[5] as string[],
  shape: shapes[0] as string,
});
export const useDesign = () => {
  const [state, setState] = useDesignState();

  return {
    ...state,
    setColor: (i: number) =>
      setState((s) => ({ ...s, color: colors[i] as any })),
    setShape: (i: number) =>
      setState((s) => ({ ...s, shape: shapes[i] as any })),
  };
};
export const Designer = ({ text = "" }) => {
  const design = useDesign();

  return (
    <>
      <div className="absolute -translate-x-full pl-4 pr-12">
        <Label>Colors</Label>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {colors.map((color, i) => (
            <Circle
              key={i}
              onClick={() => design.setColor(i)}
              className={clsx("-rotate-45", {
                ["opacity-50 hover:opacity-70"]: !(
                  color[0] === design.color[0] && color[1] === design.color[1]
                ),
              })}
            >
              <HalfCircle style={{ background: color[0] }} rounded="top" />
              <HalfCircle style={{ background: color[1] }} rounded="bottom" />
            </Circle>
          ))}
        </div>
        <Label>Shapes</Label>
        <div className="grid grid-cols-2 gap-2">
          {shapes.map((shape, i) => (
            <Circle
              key={i}
              onClick={() => design.setShape(i)}
              className={clsx(`bg-gradient-to-b ${gradient}`, {
                ["opacity-50 hover:opacity-70"]: shape !== design.shape,
              })}
            >
              <img
                className="h-full w-full rounded-full object-cover"
                src={`/svgPatterns/pattern-${shape}.svg`}
              />
            </Circle>
          ))}
        </div>
      </div>
      <div className="min-h-96 mb-16">
        <HyperCertSVG color={design.color} shape={design.shape} text={text} />
      </div>
    </>
  );
};

const Circle = createComponent(
  "div",
  tv({
    base: "relative mb-2 h-8 w-8 cursor-pointer rounded-full border-2 opacity-100 transition-opacity border-indigo-700",
  })
);
const HalfCircle = createComponent(
  "div",
  tv({
    base: "h-1/2 w-full",
    variants: { rounded: { top: "rounded-t-full", bottom: "rounded-b-full" } },
  })
);

const Label = (props: PropsWithChildren) => <h3 className="mb-4" {...props} />;
