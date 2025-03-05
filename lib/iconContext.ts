import { createContext, type Context } from "preact";
import type { JSX } from "preact";

export interface IconContext {
  color?: string;
  size?: string;
  class?: string;
  className?: string;
  stroke?: string | JSX.SignalLike<string | undefined>; // allow overide stroke color "currentColor"
  fill?: string | JSX.SignalLike<string | undefined>; // allow overide fill color "currentColor"
  strokeWidth?:  number | string | JSX.SignalLike<number | string | undefined>; // allow overide strokeWidth default 0

  style?: JSX.CSSProperties;
  attr?: JSX.SVGAttributes<SVGSVGElement>;
}

export const defaultContext: IconContext = {
  color: undefined,
  size: undefined,
  class: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

export const defaultIconContext: Context<IconContext> = createContext && createContext(defaultContext);
