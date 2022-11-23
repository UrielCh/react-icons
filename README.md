# preact / deno convertion of react-icons

This library is a simple port from [react-icons](https://www.npmjs.com/package/react-icons) compatible with deno fresh project.

```tsx
import { AiFillAccountBook } from "https://deno.land/x/react_icons/ai/index.ts";

export default function TesSvg() {
  return (<AiFillAccountBook />)
}
```

check the full documetation in: [here](https://react-icons.github.io/react-icons/)

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
import { FaBeer } from 'https://deno.land/x/react_icons/fa/index.ts';
import { Component } from 'https://esm.sh/preact@10.11.2'

class Question extends Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```
