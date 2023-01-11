import * as React from "preact";
import { JSX } from "preact";

export interface IconContext {
  color?: string;
  size?: string;
  className?: string;
  style?: JSX.CSSProperties;
  attr?: JSX.SVGAttributes<SVGElement>;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

export const IconContext: React.Context<IconContext> = React.createContext && React.createContext(DefaultContext);
