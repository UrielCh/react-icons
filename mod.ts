/* *
 * # Preact + deno convertion of react-icons
 * 
 * This library is port from [react-icons](https://www.npmjs.com/package/react-icons) built for deno fresh projects.
 * 
 * ## setup
 * 
 * To use it simply fill your `import_map.json`
 * 
 * ```json
 * {
 *   "imports": {
 *     "preact":  "https://esm.sh/preact",
 *     "preact/": "https://esm.sh/preact/",
 *     "react-icons/ai":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/mod.ts",
 *     "react-icons/bs":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bs@1.0.8/mod.ts",
 *     ...
 *     "react-icons/ai/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/ico/",
 *     "react-icons/bs/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bs@1.0.8/ico/",
 *   }
 * }
 * ```
 * 
 * Now just use it like in a regular `React` app, but with `Preact`
 * 
 * ## sample
 * 
 * ```tsx
 * import { AiFillAccountBook } from "react-icons/ai";
 * // or
 * import AiFillAccountBook from "react-icons/ai/AiFillAccountBook.ts";
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
 * import { FaBeer } from 'react-icons/fa';
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
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

export { type IconTree, type IconBaseProps, GenIcon, IconBase } from "./lib/iconBase.tsx";
export { type IconContext, defaultIconContext, defaultContext } from "./lib/iconContext.ts";
