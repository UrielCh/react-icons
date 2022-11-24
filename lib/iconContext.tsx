import * as React from "https://esm.sh/preact@10.11.2";
import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";

export interface IconContext {
  color?: string;
  size?: string;
  className?: string;
  style?: JSXInternal.CSSProperties;
  attr?: JSXInternal.SVGAttributes<SVGElement>;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

export const IconContext: React.Context<IconContext> = React.createContext && React.createContext(DefaultContext);
