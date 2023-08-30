/* eslint-disable */
import React, {
  ComponentPropsWithRef,
  ReactNode,
  ElementType,
  forwardRef
} from "react";
import type { TVReturnType, TVSlots } from "tailwind-variants";

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type ComponentProps<C extends ElementType> = {
  as?: C;
  children?: ReactNode;
} & ComponentPropsWithRef<C>;

// TODO: How to get props typings for the TV props (eg, color)?
export const createComponent = (
  tag: string | ElementType,
  variant: TVReturnType<any, any, never, never, never, any>
) => {
  // eslint-disable-next-line react/display-name
  const Comp = forwardRef(
    <C extends ElementType>(
      { as, className, ...props }: ComponentProps<C>,
      ref?: PolymorphicRef<C>
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Component = as || tag;
      return (
        <Component
          ref={ref}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          className={variant({ class: className, ...props } as never)}
          {...props}
        />
      );
    }
  );

  return Comp;
};
