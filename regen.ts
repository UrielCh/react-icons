// deno run --allow-read --allow-write .\regen.ts
import * as path from "https://deno.land/std@0.165.0/path/mod.ts";
import * as  fs from "https://deno.land/std@0.165.0/fs/mod.ts";
const src = 'C:\\0\\react-solid\\node_modules\\react-icons';
for await (const dirEntry of Deno.readDir(src)) {
    if (dirEntry.isFile) {
        continue;
    }
    const { name } = dirEntry;
    if (['io5', 'hi2'].includes(name)) // make colision
        continue;
    const esm = path.join(src, name, 'index.esm.js')
    let content = '';
    try {
        content = await Deno.readTextFile(esm);
    } catch (_) {
        continue
    }
    content = content.replace(`import { GenIcon } from '../lib';`, `import { GenIcon, IconBaseProps } from "../lib/index.tsx";`)
    content = content.replaceAll(`(props) {`, `(props: IconBaseProps) {`)
    for (const att of ['tag', 'viewBox', 'attr', 'child', 'd', 'id', 'dataName', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth', 'fill', 'ariaHidden'])
        content = content.replaceAll(`"${att}":`, `${att}:`)
    content = content.replaceAll(/};(\s+)export/mg, '}$1export')
    content = content.replaceAll(/};(\s+)$/mg, '}$1')
    const dest = path.join(name, 'index.ts')
    console.log(`generating ${dest}`);
    await fs.ensureDir(name)
    await Deno.writeTextFile(dest, content)
}
