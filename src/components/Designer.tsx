import clsx from "clsx";
import { createComponent } from "components";
import { PropsWithChildren, useState } from "react";
import { tv } from "tailwind-variants";
import { gradient } from "./Button";
import { HyperCertSVG } from "./HyperCertSVG";

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

const Label = (props: PropsWithChildren) => <h3 className="mb-2" {...props} />;

export const Designer = () => {
  const [selectedColor, setColor] = useState(5);
  const [selectedShape, setShape] = useState(0);

  const shape = shapes[selectedShape];
  const [bgColor, textColor] = colors[selectedColor] || [];
  return (
    <>
      <div className="absolute -translate-x-full pl-4 pr-12">
        <Label>Colors</Label>
        <div className="mb-3 grid grid-cols-2 gap-2">
          {colors.map((color, i) => (
            <Circle
              key={i}
              onClick={() => setColor(i)}
              className={clsx("-rotate-45", {
                ["opacity-50 hover:opacity-70"]: i !== selectedColor,
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
              onClick={() => setShape(i)}
              className={clsx(`bg-gradient-to-b ${gradient}`, {
                ["opacity-50 hover:opacity-70"]: i !== selectedShape,
              })}
            ></Circle>
          ))}
        </div>
      </div>
      <div className="min-h-96">
        <HyperCertSVG
          bgColor={bgColor}
          textColor={textColor}
          shape={shape}
          text="I would like to give thanks to cucumber.eth for being such a great vegetable."
        />
      </div>
    </>
  );
};
