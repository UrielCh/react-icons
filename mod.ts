/* *
 * # Preact + deno convertion of react-icons
 * 
 * This library is a simple port from [react-icons](https://www.npmjs.com/package/react-icons) compatible with deno fresh project.
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
 *     "react-icons/ai":  "https://deno.land/x/react_icons_ai/mod.ts",
 *     "react-icons/bs":  "https://deno.land/x/react_icons_bs/mod.ts",
 *     "react-icons/bi":  "https://deno.land/x/react_icons_bi/mod.ts",
 *     "react-icons/ci":  "https://deno.land/x/react_icons_ci/mod.ts",
 *     "react-icons/di":  "https://deno.land/x/react_icons_di/mod.ts",
 *     "react-icons/fi":  "https://deno.land/x/react_icons_fi/mod.ts",
 *     "react-icons/fc":  "https://deno.land/x/react_icons_fc/mod.ts",
 *     "react-icons/fa":  "https://deno.land/x/react_icons_fa/mod.ts",
 *     "react-icons/gi":  "https://deno.land/x/react_icons_gi/mod.ts",
 *     "react-icons/go":  "https://deno.land/x/react_icons_go/mod.ts",
 *     "react-icons/gr":  "https://deno.land/x/react_icons_gr/mod.ts",
 *     "react-icons/im":  "https://deno.land/x/react_icons_im/mod.ts",
 *     "react-icons/lu":  "https://deno.land/x/react_icons_lu/mod.ts",
 *     "react-icons/md":  "https://deno.land/x/react_icons_md/mod.ts",
 *     "react-icons/ri":  "https://deno.land/x/react_icons_ri/mod.ts",
 *     "react-icons/rx":  "https://deno.land/x/react_icons_rx/mod.ts",
 *     "react-icons/si":  "https://deno.land/x/react_icons_si/mod.ts",
 *     "react-icons/sl":  "https://deno.land/x/react_icons_sl/mod.ts",
 *     "react-icons/tb":  "https://deno.land/x/react_icons_tb/mod.ts",
 *     "react-icons/ti":  "https://deno.land/x/react_icons_ti/mod.ts",
 *     "react-icons/wi":  "https://deno.land/x/react_icons_wi/mod.ts",
 *     "react-icons/cg":  "https://deno.land/x/react_icons_cg/mod.ts",
 *     "react-icons/tfi": "https://deno.land/x/react_icons_tfi/mod.ts",
 *     "react-icons/vsc": "https://deno.land/x/react_icons_vsc/mod.ts",
 *     "react-icons/hi":  "https://deno.land/x/react_icons_hi/mod.ts",
 *     "react-icons/hi2": "https://deno.land/x/react_icons_hi2/mod.ts",
 *     "react-icons/io":  "https://deno.land/x/react_icons_io/mod.ts",
 *     "react-icons/io5": "https://deno.land/x/react_icons_vsc/io5.ts"
 *   }
 * }
 * ```
 * 
 * Now just use it like in a regular `React` app, bur with `Preact`
 * 
 * ## sample
 * 
 * ```tsx
 * import { AiFillAccountBook } from "react-icons/ai";
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
