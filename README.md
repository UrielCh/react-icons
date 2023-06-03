# Preact + deno convertion of react-icons

[deno main package](https://deno.land/x/react_icons@1.0.8)

This library is preact version of react-icons build to be use with deno fresh project.

All icons available can be test [here](https://react-icons.deno.dev/) click on the icon you wantm the copy the import statement to your code.

If you have time to help the project is [here](https://github.com/UrielCh/react-icons-web)

## Setup

To use it fill your `import_map.json`

### Using jsdelivr (best approch)

node preact can not be import via `cdn.jsdelivr.net` so keep `esm.sh` for this one.

```json
{
  "imports": {
    "preact": "https://esm.sh/preact@10.15.1",
    "preact/": "https://esm.sh/preact@10.15.1/",
    "react-icons/ai":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/mod.ts",
    "react-icons/bs":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bs@1.0.8/mod.ts",
    "react-icons/bi":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bi@1.0.8/mod.ts",
    "react-icons/ci":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ci@1.0.8/mod.ts",
    "react-icons/di":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-di@1.0.8/mod.ts",
    "react-icons/fi":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fi@1.0.8/mod.ts",
    "react-icons/fc":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fc@1.0.8/mod.ts",
    "react-icons/fa":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fa@1.0.8/mod.ts",
    "react-icons/gi":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-gi@1.0.8/mod.ts",
    "react-icons/go":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-go@1.0.8/mod.ts",
    "react-icons/gr":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-gr@1.0.8/mod.ts",
    "react-icons/hi":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-hi@1.0.8/mod.ts",
    "react-icons/hi2": "https://cdn.jsdelivr.net/gh/urielch/react-icons-hi2@1.0.8/mod.ts",
    "react-icons/io":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-io@1.0.8/mod.ts",
    "react-icons/io5": "https://cdn.jsdelivr.net/gh/urielch/react-icons-io5@1.0.8/mod.ts",
    "react-icons/im":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-im@1.0.8/mod.ts",
    "react-icons/md":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-md@1.0.8/mod.ts",
    "react-icons/ri":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ri@1.0.8/mod.ts",
    "react-icons/si":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-si@1.0.8/mod.ts",
    "react-icons/sl":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-sl@1.0.8/mod.ts",
    "react-icons/tb":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-tb@1.0.8/mod.ts",
    "react-icons/ti":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ti@1.0.8/mod.ts",
    "react-icons/wi":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-wi@1.0.8/mod.ts",
    "react-icons/cg":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-cg@1.0.8/mod.ts",
    "react-icons/lu":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-lu@1.0.8/mod.ts",
    "react-icons/rx":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-rx@1.0.8/mod.ts",
    "react-icons/tfi": "https://cdn.jsdelivr.net/gh/urielch/react-icons-tfi@1.0.8/mod.ts",
    "react-icons/vsc": "https://cdn.jsdelivr.net/gh/urielch/react-icons-vsc@1.0.8/mod.ts",

    "react-icons/ai/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/ico/",
    "react-icons/bs/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bs@1.0.8/ico/",
    "react-icons/bi/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-bi@1.0.8/ico/",
    "react-icons/ci/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ci@1.0.8/ico/",
    "react-icons/di/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-di@1.0.8/ico/",
    "react-icons/fi/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fi@1.0.8/ico/",
    "react-icons/fc/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fc@1.0.8/ico/",
    "react-icons/fa/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-fa@1.0.8/ico/",
    "react-icons/gi/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-gi@1.0.8/ico/",
    "react-icons/go/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-go@1.0.8/ico/",
    "react-icons/gr/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-gr@1.0.8/ico/",
    "react-icons/hi/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-hi@1.0.8/ico/",
    "react-icons/hi2/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-hi2@1.0.8/ico/",
    "react-icons/io/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-io@1.0.8/ico/",
    "react-icons/io5/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-io5@1.0.8/ico/",
    "react-icons/im/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-im@1.0.8/ico/",
    "react-icons/md/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-md@1.0.8/ico/",
    "react-icons/ri/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ri@1.0.8/ico/",
    "react-icons/si/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-si@1.0.8/ico/",
    "react-icons/sl/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-sl@1.0.8/ico/",
    "react-icons/tb/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-tb@1.0.8/ico/",
    "react-icons/ti/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-ti@1.0.8/ico/",
    "react-icons/wi/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-wi@1.0.8/ico/",
    "react-icons/cg/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-cg@1.0.8/ico/",
    "react-icons/lu/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-lu@1.0.8/ico/",
    "react-icons/rx/":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-rx@1.0.8/ico/",
    "react-icons/tfi/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-tfi@1.0.8/ico/",
    "react-icons/vsc/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-vsc@1.0.8/ico/"
  }
}
```
Later on yu will be able to import a single icon using:

```ts
import { AiTwotonePrinter } from "https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/ico/AiTwotonePrinter.ts";
```

Or using your import_map.json:

```ts
import { AiTwotonePrinter } from "react-icons/ai/AiTwotonePrinter.ts";
```

### using deno/x

I'm having some issue with deno/x currently, some package cause deno/x to crash or may be not available.

```json
{
  "imports": {
    "preact":  "https://esm.sh/preact@10.15.1",
    "preact/": "https://esm.sh/preact@10.15.1/",
    "react-icons/ai":  "https://deno.land/x/react_icons_ai@1.0.8/mod.ts",
    "react-icons/bs":  "https://deno.land/x/react_icons_bs@1.0.8/mod.ts",
    "react-icons/bi":  "https://deno.land/x/react_icons_bi@1.0.8/mod.ts",
    "react-icons/ci":  "https://deno.land/x/react_icons_ci@1.0.8/mod.ts",
    "react-icons/di":  "https://deno.land/x/react_icons_di@1.0.8/mod.ts",
    "react-icons/fi":  "https://deno.land/x/react_icons_fi@1.0.8/mod.ts",
    "react-icons/fc":  "https://deno.land/x/react_icons_fc@1.0.8/mod.ts",
    "react-icons/fa":  "https://deno.land/x/react_icons_fa@1.0.8/mod.ts",
    "react-icons/gi":  "https://deno.land/x/react_icons_gi@1.0.8/mod.ts",
    "react-icons/go":  "https://deno.land/x/react_icons_go@1.0.8/mod.ts",
    "react-icons/gr":  "https://deno.land/x/react_icons_gr@1.0.8/mod.ts",
    "react-icons/hi":  "https://deno.land/x/react_icons_hi@1.0.8/mod.ts",
    "react-icons/hi2": "https://deno.land/x/react_icons_hi2@1.0.8/mod.ts",
    "react-icons/io":  "https://deno.land/x/react_icons_io@1.0.8/mod.ts",
    "react-icons/io5": "https://deno.land/x/react_icons_io5@1.0.8/mod.ts",
    "react-icons/im":  "https://deno.land/x/react_icons_im@1.0.8/mod.ts",
    "react-icons/md":  "https://deno.land/x/react_icons_md@1.0.8/mod.ts",
    "react-icons/ri":  "https://deno.land/x/react_icons_ri@1.0.8/mod.ts",
    "react-icons/si":  "https://deno.land/x/react_icons_si@1.0.8/mod.ts",
    "react-icons/sl":  "https://deno.land/x/react_icons_sl@1.0.8/mod.ts",
    "react-icons/tb":  "https://deno.land/x/react_icons_tb@1.0.8/mod.ts",
    "react-icons/ti":  "https://deno.land/x/react_icons_ti@1.0.8/mod.ts",
    "react-icons/wi":  "https://deno.land/x/react_icons_wi@1.0.8/mod.ts",
    "react-icons/cg":  "https://deno.land/x/react_icons_cg@1.0.8/mod.ts",
    "react-icons/tfi": "https://deno.land/x/react_icons_tfi@1.0.8/mod.ts",
    "react-icons/vsc": "https://deno.land/x/react_icons_vsc@1.0.8/mod.ts",

    "react-icons/ai/":  "https://deno.land/x/react_icons_ai@1.0.8/ico/",
    "react-icons/bs/":  "https://deno.land/x/react_icons_bs@1.0.8/ico/",
    "react-icons/bi/":  "https://deno.land/x/react_icons_bi@1.0.8/ico/",
    "react-icons/ci/":  "https://deno.land/x/react_icons_ci@1.0.8/ico/",
    "react-icons/di/":  "https://deno.land/x/react_icons_di@1.0.8/ico/",
    "react-icons/fi/":  "https://deno.land/x/react_icons_fi@1.0.8/ico/",
    "react-icons/fc/":  "https://deno.land/x/react_icons_fc@1.0.8/ico/",
    "react-icons/fa/":  "https://deno.land/x/react_icons_fa@1.0.8/ico/",
    "react-icons/gi/":  "https://deno.land/x/react_icons_gi@1.0.8/ico/",
    "react-icons/go/":  "https://deno.land/x/react_icons_go@1.0.8/ico/",
    "react-icons/gr/":  "https://deno.land/x/react_icons_gr@1.0.8/ico/",
    "react-icons/hi/":  "https://deno.land/x/react_icons_hi@1.0.8/ico/",
    "react-icons/hi2/": "https://deno.land/x/react_icons_hi2@1.0.8/ico/",
    "react-icons/io/":  "https://deno.land/x/react_icons_io@1.0.8/ico/",
    "react-icons/io5/": "https://deno.land/x/react_icons_io5@1.0.8/ico/",
    "react-icons/im/":  "https://deno.land/x/react_icons_im@1.0.8/ico/",
    "react-icons/md/":  "https://deno.land/x/react_icons_md@1.0.8/ico/",
    "react-icons/ri/":  "https://deno.land/x/react_icons_ri@1.0.8/ico/",
    "react-icons/si/":  "https://deno.land/x/react_icons_si@1.0.8/ico/",
    "react-icons/sl/":  "https://deno.land/x/react_icons_sl@1.0.8/ico/",
    "react-icons/tb/":  "https://deno.land/x/react_icons_tb@1.0.8/ico/",
    "react-icons/ti/":  "https://deno.land/x/react_icons_ti@1.0.8/ico/",
    "react-icons/wi/":  "https://deno.land/x/react_icons_wi@1.0.8/ico/",
    "react-icons/cg/":  "https://deno.land/x/react_icons_cg@1.0.8/ico/",
    "react-icons/tfi/": "https://deno.land/x/react_icons_tfi@1.0.8/ico/",
    "react-icons/vsc/": "https://deno.land/x/react_icons_vsc@1.0.8/ico/"
  }
}
```

Later on yu will be able to import a single icon using:

```ts
import { AiTwotonePrinter } from "https://deno.land/x/react_icons_ai@1.0.8/ico/AiTwotonePrinter.ts";
```

Or using your import_map.json:

```ts
import { AiTwotonePrinter } from "react-icons/ai/AiTwotonePrinter.ts";
```

### using esm.sh
```
{
  "imports": {
    "preact":  "https://esm.sh/preact@10.15.1",
    "preact/": "https://esm.sh/preact@10.15.1/",
    "react-icons/ai":  "https://esm.sh/gh/urielch/react-icons-ai@1.0.8/mod.ts",
    "react-icons/bs":  "https://esm.sh/gh/urielch/react-icons-bs@1.0.8/mod.ts",
  }
}
```
direct icon import do not works with esm.sh

ex: `https://cdn.jsdelivr.net/gh/urielch/react-icons-ai@1.0.8/mod.ts` is broken for now.


## sample

Once `import_map.json` is ready, just use it like in a regular `React` app, bur with `Preact`


```tsx
import { AiFillAccountBook } from "react-icons/ai";

export default function TesSvg() {
  return (<AiFillAccountBook />)
}
```

Check the full documetation in: [here](https://react-icons.github.io/react-icons/)

the first sample:

```tsx
import { FaBeer } from 'react-icons/fa';
class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```

can be convert as:

```tsx
import { FaBeer } from 'react-icons/fa';
import { Component } from 'preact'

class Question extends Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```

## references

- Original [react-icons](https://www.npmjs.com/package/react-icons) npm package.
- The React Icons [doc](https://react-icons.github.io/react-icons/)
