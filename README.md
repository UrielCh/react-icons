# preact version of react-icons

[![JSR](https://jsr.io/badges/@preact-icons/common)](https://jsr.io/@preact-icons/common)

This library is preact version of react-icons build to be use with deno fresh
project.

All icons available can be test [here](https://react-icons.deno.dev/) click on
the icon you want the copy the import statement to your code.

If you have time to help the project is
[here](https://github.com/UrielCh/react-icons-web)

## Setup

### install the bundle you want using

`deno add @preact-icons/ai` for deno

`npx jsr add @preact-icons/ai` for npm

`bunx jsr add @preact-icons/ai` for bun

### update your dependency tu use only jsr / npm source

replace http imports like:

```json
{
  "preact": "https://esm.sh/preact@10.22.1",
  "preact/": "https://esm.sh/preact@10.22.1/"
}
```

by npm imports like:

```json
{
  "preact": "npm:preact@10.22.1",
  "preact/jsx-runtime": "npm:preact@10.22.1/jsx-runtime",
  "preact/hooks": "npm:preact@10.22.1/hooks"
}
```

you can now import a single icon using:

```ts
import AiTwotonePrinter from "@preact-icons/ai/AiTwotonePrinter";
```

## sample

```bash
deno add @preact-icons/ai
```

```tsx
import { AiFillAccountBook } from "@preact-icons/ai";

export default function TesSvg() {
  return <AiFillAccountBook />;
}
```

Check the full documetation in:
[here](https://react-icons.github.io/react-icons/)

the first sample:

```tsx
import { FaBeer } from "react-icons/fa";
class Question extends React.Component {
  render() {
    return (
      <h3>
        Lets go for a <FaBeer />?
      </h3>
    );
  }
}
```

can be convert as:

```tsx
import { FaBeer } from "@preact-icons/fa";
// or
import FaBeer from "@preact-icons/fa/FaBeer";

import { Component } from "preact";

class Question extends Component {
  render() {
    return (
      <h3>
        Lets go for a <FaBeer />?
      </h3>
    );
  }
}
```

## references

- Original [react-icons](https://www.npmjs.com/package/react-icons) npm package.
- The R§eact-Icons [doc](https://react-icons.github.io/react-icons/)

## changelog

# 1.1.0
- allows class and classname attribute
