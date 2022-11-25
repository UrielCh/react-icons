import {default as React, JSX} from "https://esm.sh/preact@10.11.3";
import { DefaultContext, IconContext } from "./iconContext.tsx";

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child?: IconTree[];
}

function Tree2Element(tree: IconTree[]): React.ComponentChildren[] { // React.ReactElement => ComponentChildren
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

export interface IconBaseProps extends JSX.SVGAttributes<SVGElement> {
  children?: React.ComponentChildren; // was React.ReactNode
  size?: number; // was string | number;
  color?: string;
  title?: string;
}

export type IconType = (props: IconBaseProps) => React.VNode<any>;
export function IconBase(
  props: IconBaseProps & { attr?: Record<string, string> },
): React.VNode<any> {
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
          ...(props.style as JSX.CSSProperties),
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
