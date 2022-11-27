# preact / deno convertion of react-icons

This library is a simple port from [react-icons](https://www.npmjs.com/package/react-icons) compatible with deno fresh project.

## setup

To use it simply fill your `import_map.json`

```json
{
  "imports": {
    "preact":  "https://esm.sh/preact@10.11.3",
    "preact/": "https://esm.sh/preact@10.11.3/",
    "react-icons/ai":  "https://deno.land/x/react_icons@0.0.10/ai/index.ts",
    "react-icons/bs":  "https://deno.land/x/react_icons@0.0.10/bs/index.ts",
    "react-icons/bi":  "https://deno.land/x/react_icons@0.0.10/bi/index.ts",
    "react-icons/ci":  "https://deno.land/x/react_icons@0.0.10/ci/index.ts",
    "react-icons/di":  "https://deno.land/x/react_icons@0.0.10/di/index.ts",
    "react-icons/fi":  "https://deno.land/x/react_icons@0.0.10/fi/index.ts",
    "react-icons/fc":  "https://deno.land/x/react_icons@0.0.10/fc/index.ts",
    "react-icons/fa":  "https://deno.land/x/react_icons@0.0.10/fa/index.ts",
    "react-icons/gi":  "https://deno.land/x/react_icons@0.0.10/gi/index.ts",
    "react-icons/go":  "https://deno.land/x/react_icons@0.0.10/go/index.ts",
    "react-icons/gr":  "https://deno.land/x/react_icons@0.0.10/gr/index.ts",
    "react-icons/hi":  "https://deno.land/x/react_icons@0.0.10/hi/index.ts",
    "react-icons/im":  "https://deno.land/x/react_icons@0.0.10/im/index.ts",
    "react-icons/io":  "https://deno.land/x/react_icons@0.0.10/io/index.ts",
    "react-icons/md":  "https://deno.land/x/react_icons@0.0.10/md/index.ts",
    "react-icons/ri":  "https://deno.land/x/react_icons@0.0.10/ri/index.ts",
    "react-icons/si":  "https://deno.land/x/react_icons@0.0.10/si/index.ts",
    "react-icons/sl":  "https://deno.land/x/react_icons@0.0.10/sl/index.ts",
    "react-icons/tb":  "https://deno.land/x/react_icons@0.0.10/tb/index.ts",
    "react-icons/tfi": "https://deno.land/x/react_icons@0.0.10/tfi/index.ts",
    "react-icons/ti":  "https://deno.land/x/react_icons@0.0.10/ti/index.ts",
    "react-icons/vsc": "https://deno.land/x/react_icons@0.0.10/vsc/index.ts",
    "react-icons/wi":  "https://deno.land/x/react_icons@0.0.10/wi/index.ts",
    "react-icons/cg":  "https://deno.land/x/react_icons@0.0.10/cg/index.ts"
  }
}
```

Now just use it like in a regular `React` app, bur with `Preact`

## sample

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

