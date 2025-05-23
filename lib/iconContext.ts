import { createContext, type Context } from "preact";
import type { JSX } from "preact";

/**
 * IconContext type
 */
export interface IconContext {
  color?: string;
  size?: string | number;
  class?: string;
  className?: string;
  stroke?: string | JSX.SignalLike<string | undefined>; // allow overide stroke color "currentColor"
  fill?: string | JSX.SignalLike<string | undefined>; // allow overide fill color "currentColor"
  strokeWidth?:  number | string | JSX.SignalLike<number | string | undefined>; // allow overide strokeWidth default 0

  style?: JSX.CSSProperties;
  attr?: JSX.SVGAttributes<SVGSVGElement>;
}

/**
 * default values for IconContext
 */
export const defaultContext: IconContext = {
  color: undefined,
  size: undefined,
  class: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

/**
 * default IconContext provider
 */
export const defaultIconContext: Context<IconContext> = createContext && createContext(defaultContext);
