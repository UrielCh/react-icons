/* *
 * # Preact + deno convertion of react-icons
 *
 * This library is port from [react-icons](https://www.npmjs.com/package/react-icons) built for deno fresh projects.
 *
 * ## setup
 *
 * deno add @preact-icons/ai
 *
 * Now just use it like in a regular `React` app, but with `Preact`
 *
 * ## sample
 *
 * ```tsx
 * import { AiFillAccountBook } from "@preact-icons/ai";
 * // or
 * import AiFillAccountBook from "@preact-icons/ai/AiFillAccountBook.ts";
 *
 * export default function TesSvg() {
 *   return (<AiFillAccountBook />)
 * }
 * ```
 *
 * Check the full documetation in: [here](https://react-icons.github.io/react-icons/)
 *
 * the first sample:
 *
 * ```tsx
 * import { FaBeer } from 'react-icons/fa';
 * class Question extends React.Component {
 *   render() {
 *     return <h3> Lets go for a <FaBeer />? </h3>
 *   }
 * }
 * ```
 *
 * can be convert as:
 *
 * ```tsx
 * import { FaBeer } from '@preact-icons/fa';
 * import { Component } from 'preact'
 *
 * class Question extends Component {
 *   render() {
 *     return <h3> Lets go for a <FaBeer />? </h3>
 *   }
 * }
 * ```
 * @module
 */

export {
  GenIcon,
  IconBase,
  type IconBaseProps,
  type IconTree,
} from "./lib/iconBase.tsx";

export {
  defaultContext,
  defaultIconContext,
  type IconContext,
} from "./lib/iconContext.ts";
