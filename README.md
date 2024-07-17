# Preact + deno convertion of react-icons

[deno main package](https://deno.land/x/react_icons/@1.0.9)

This library is preact version of react-icons build to be use with deno fresh project.

All icons available can be test [here](https://react-icons.deno.dev/) click on the icon you wantm the copy the import statement to your code.

If you have time to help the project is [here](https://github.com/UrielCh/react-icons-web)

## Setup

### install the bundle you want using

`deno add @preact-icons/ai` for deno
`npx jsr add @preact-icons/ai` for npm
`bunx jsr add @preact-icons/ai` for bun


### update your dependency tu use only jsr / npm source


replace imports like:

```json
{
  "preact": "https://esm.sh/preact@10.19.6",
  "preact/": "https://esm.sh/preact@10.19.6/",
}
```
by npm imports like:


```json
{
    "preact": "npm:preact@10.22.1",
    "preact/jsx-runtime": "npm:preact@10.22.1/jsx-runtime",
    "preact/hooks": "npm:preact@10.22.1/hooks",
}
```
Later on you will be able to import a single icon using:

```ts
import AiTwotonePrinter from "jsr:@preact-icons/ai@1.0.11/AiTwotonePrinter";
```

## sample


```bash
deno add @preact-icons/ai
```

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
