import type { ClassValue } from "clsx";
import type {
  ComponentPropsWithRef,
  ElementType,
  ReactNode
} from "react";
import {
  forwardRef,
} from "react";

// export const getProp = (key: string, prop: object) => prop[key] as Array<typeof key>;

// const config = {};

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type BoxProps<C extends ElementType> = {
  as?: C;
  children?: ReactNode;
  className?: ClassValue;
} & ComponentPropsWithRef<C>;

export const Box = forwardRef(
  <C extends ElementType>(
    { as, className, ...props }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";
    return <Component ref={ref} {...props} className={className} />;
  }
);

Box.displayName = "Box";