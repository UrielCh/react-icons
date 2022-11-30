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
 *     "preact":  "https://esm.sh/preact@10.11.3",
 *     "preact/": "https://esm.sh/preact@10.11.3/",
 *     "react-icons/ai":  "https://deno.land/x/react_icons@0.2.1/ai/mod.ts",
 *     "react-icons/bs":  "https://deno.land/x/react_icons@0.2.1/bs/mod.ts",
 *     "react-icons/bi":  "https://deno.land/x/react_icons@0.2.1/bi/mod.ts",
 *     "react-icons/ci":  "https://deno.land/x/react_icons@0.2.1/ci/mod.ts",
 *     "react-icons/di":  "https://deno.land/x/react_icons@0.2.1/di/mod.ts",
 *     "react-icons/fi":  "https://deno.land/x/react_icons@0.2.1/fi/mod.ts",
 *     "react-icons/fc":  "https://deno.land/x/react_icons@0.2.1/fc/mod.ts",
 *     "react-icons/fa":  "https://deno.land/x/react_icons@0.2.1/fa/mod.ts",
 *     "react-icons/gi":  "https://deno.land/x/react_icons@0.2.1/gi/mod.ts",
 *     "react-icons/go":  "https://deno.land/x/react_icons@0.2.1/go/mod.ts",
 *     "react-icons/gr":  "https://deno.land/x/react_icons@0.2.1/gr/mod.ts",
 *     "react-icons/im":  "https://deno.land/x/react_icons@0.2.1/im/mod.ts",
 *     "react-icons/md":  "https://deno.land/x/react_icons@0.2.1/md/mod.ts",
 *     "react-icons/ri":  "https://deno.land/x/react_icons@0.2.1/ri/mod.ts",
 *     "react-icons/rx":  "https://deno.land/x/react_icons@0.2.1/rx/mod.ts",
 *     "react-icons/si":  "https://deno.land/x/react_icons@0.2.1/si/mod.ts",
 *     "react-icons/sl":  "https://deno.land/x/react_icons@0.2.1/sl/mod.ts",
 *     "react-icons/tb":  "https://deno.land/x/react_icons@0.2.1/tb/mod.ts",
 *     "react-icons/ti":  "https://deno.land/x/react_icons@0.2.1/ti/mod.ts",
 *     "react-icons/wi":  "https://deno.land/x/react_icons@0.2.1/wi/mod.ts",
 *     "react-icons/cg":  "https://deno.land/x/react_icons@0.2.1/cg/mod.ts",
 *     "react-icons/io":  "https://deno.land/x/react_icons@0.2.1/io/mod.ts",
 *     "react-icons/tfi": "https://deno.land/x/react_icons@0.2.1/tfi/mod.ts",
 *     "react-icons/vsc": "https://deno.land/x/react_icons@0.2.1/vsc/mod.ts"
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

// THIS FILE IS AUTO GENERATED
export * from './ci/mod.ts';
export * from './fa/mod.ts';
export * from './md/mod.ts';
export * from './ti/mod.ts';
export * from './go/mod.ts';
export * from './fi/mod.ts';
export * from './gi/mod.ts';
export * from './wi/mod.ts';
export * from './di/mod.ts';
export * from './ai/mod.ts';
export * from './bs/mod.ts';
export * from './ri/mod.ts';
export * from './rx/mod.ts';
export * from './fc/mod.ts';
export * from './gr/mod.ts';
export * from './si/mod.ts';
export * from './sl/mod.ts';
export * from './im/mod.ts';
export * from './bi/mod.ts';
export * from './cg/mod.ts';
export * from './vsc/mod.ts';
// export * from './hi/mod.ts';
// export * from './hi2/mod.ts';
// export * from './io5/mod.ts';
export * from './io/mod.ts';
export * from './tb/mod.ts';
export * from './tfi/mod.ts';
