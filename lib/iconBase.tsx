import { type ComponentChildren, type VNode, createElement } from "preact";
import { type JSX } from "preact";
import { defaultIconContext, IconContext } from "./iconContext.ts";

/**
 * tree level for SVG
 */
export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child?: IconTree[];
}

/**
 * recursivly build internal SVG element
 * @param tree 
 * @returns 
 */
function Tree2Element(tree: IconTree[]): ComponentChildren[] { // React.ReactElement => ComponentChildren
  return (
    tree &&
    tree.map((node, i) =>
    createElement(
        node.tag,
        { key: i, ...node.attr },
        Tree2Element(node.child || []),
      )
    )
  );
}

/**
 * build a SVG componant from an IconTree
 */
export function GenIcon(data: IconTree) {
  return (props: IconBaseProps) => (
    <IconBase attr={{ ...data.attr }} {...props}>
      {Tree2Element(data.child || [])}
    </IconBase>
  );
}

/**
 * attribut for all custom SVG
 */
export interface IconBaseProps extends JSX.SVGAttributes<SVGSVGElement> {
  children?: ComponentChildren; // was React.ReactNode
  size?: number; // was string | number;
  color?: string;
  title?: string;
  class?: string; // new
}

export type IconType = (props: IconBaseProps) => VNode<JSX.SVGAttributes>;

/**
 * build outer SVG element
 */
export function IconBase(
  props: IconBaseProps & { attr?: Record<string, string> },
): VNode<JSX.SVGAttributes> {
  const elem = (conf: IconContext) => {
    const { attr, size, title, ...svgProps } = props;
    let clazz = props.class || '';
    const computedSize = size || conf.size || "1em";
    if (conf.class) {
      if (clazz)
        clazz = `${clazz} ${conf.class}`;
      else
        clazz = conf.class;
    }
    return (
      <svg
        stroke={conf.stroke || "currentColor"}
        fill={conf.fill || "currentColor"}
        strokeWidth={conf.strokeWidth || 0}
        class={clazz}
        {...conf.attr}
        {...attr}
        {...svgProps}
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

  return defaultIconContext !== undefined
    ? (
      <defaultIconContext.Consumer>
        {(conf: IconContext) => elem(conf)}
      </defaultIconContext.Consumer>
    )
    : (
      elem(defaultIconContext)
    );
}
