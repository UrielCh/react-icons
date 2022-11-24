import * as React from "https://esm.sh/preact@10.11.2";
import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";
import { DefaultContext, IconContext } from "./iconContext.tsx";
import { ComponentChildren } from "https://esm.sh/v95/preact@10.11.0/src/index.d.ts";
import { CSSProperties } from "https://esm.sh/v98/@types/react@18.0.25/index.d.ts";

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child?: IconTree[];
}

function Tree2Element(tree: IconTree[]): ComponentChildren[] { // React.ReactElement => ComponentChildren
  return (
    tree &&
    tree.map((node, i) =>
      React.createElement(
        node.tag,
        { key: i, ...node.attr },
        Tree2Element(node.child || []),
      )
    )
  );
}
export function GenIcon(data: IconTree) {
  return (props: IconBaseProps) => (
    <IconBase attr={{ ...data.attr }} {...props}>
      {Tree2Element(data.child || [])}
    </IconBase>
  );
}

export interface IconBaseProps extends JSXInternal.SVGAttributes<SVGElement> {
  children?: ComponentChildren; // was React.ReactNode
  size?: number; // was string | number;
  color?: string;
  title?: string;
}

export type IconType = (props: IconBaseProps) => JSX.Element;
export function IconBase(
  props: IconBaseProps & { attr?: Record<string, string> },
): JSX.Element {
  const elem = (conf: IconContext) => {
    const { attr, size, title, ...svgProps } = props;
    const computedSize = size || conf.size || "1em";
    let className;
    if (conf.className) className = conf.className;
    if (props.className) {
      className = (className ? className + " " : "") + props.className;
    }

    return (
      // @ts-ignore TODO Fix me
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        {...conf.attr}
        {...attr}
        {...svgProps}
        className={className}
        style={{
          color: props.color || conf.color,
          ...conf.style,
          ...(props.style as CSSProperties),
        }}
        height={computedSize}
        width={computedSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        {title && <title>{title}</title>}
        {props.children}
      </svg>
    );
  };

  return IconContext !== undefined
    ? (
      <IconContext.Consumer>
        {(conf: IconContext) => elem(conf)}
      </IconContext.Consumer>
    )
    : (
      elem(DefaultContext)
    );
}
