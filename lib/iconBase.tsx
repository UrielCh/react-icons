import { type ComponentChildren, type VNode, createElement } from "preact";
import type { JSX } from "preact";
import { defaultIconContext, type IconContext } from "./iconContext.ts";


const CAMEL_PROPS =
  /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
const CAMEL_REPLACE = /[A-Z0-9]/g;

function filterKebabCase<T extends Record<string, unknown>>(attrs: T): T {
  const newAttrs: Record<string, unknown> = {};
  for (const key in attrs) {
    if (key.indexOf('-') === -1 && CAMEL_PROPS.test(key))
      newAttrs[key.replace(CAMEL_REPLACE, '-$&').toLowerCase()] = attrs[key];
    else
      newAttrs[key] = attrs[key];
  }
  return newAttrs as T;
}

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
        { key: i, ...filterKebabCase(node.attr) },
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
 * attributes for all custom SVG
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
    let attrs = {
      stroke: conf.stroke || "currentColor",
      fill: conf.fill || "currentColor",
      strokeWidth: conf.strokeWidth || 0,
      class: clazz,
      ...conf.attr,
      ...attr,
      ...svgProps,
      height: computedSize,
      width: computedSize,
    };
    attrs = filterKebabCase(attrs);
    return (
      <svg
        {...attrs}
        style={filterKebabCase({
          color: props.color || conf.color,
          ...conf.style,
          ...(props.style as JSX.CSSProperties),
        })}
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
