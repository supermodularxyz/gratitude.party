import clsx from "clsx";
import {
  ReactNode,
  ElementType,
  ComponentPropsWithRef,
  forwardRef,
} from "react";

export const getProp = (key: string, prop: any) => prop[key];

const config = {};

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type BoxProps<C extends ElementType> = {
  as?: C;
  children?: ReactNode;
} & ComponentPropsWithRef<C>;

export const Box = forwardRef(
  <C extends ElementType>(
    { as, rounded, className, ...props }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";
    return <Component ref={ref} {...props} className={clsx(className)} />;
  }
);
