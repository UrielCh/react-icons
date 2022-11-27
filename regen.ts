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
    content = content.replace(`import { GenIcon } from '../lib';`, `import { GenIcon, IconBaseProps } from "../lib/mod.tsx";`)
    content = content.replaceAll(`(props) {`, `(props: IconBaseProps) {`)
    for (const att of ['tag', 'viewBox', 'attr', 'child', 'd', 'id', 'dataName', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth', 'fill', 'ariaHidden', 'fillRule', 'version', 'x', 'y', 'style', 'baseProfile', 'enableBackground', 'stroke'])
        content = content.replaceAll(new RegExp(`\s?"${att}"\s?:\s?`, 'g'), `${att}:`)
    content = content.replaceAll(/};(\s+)export/mg, '}$1export')
    content = content.replaceAll(/};(\s+)$/mg, '}$1')
    const dest = path.join(name, 'index.ts')

    let shorted = '';
    const short = {
        'attr': ['{viewBox:"0 0 24 24"}',
            '{viewBox:"0 0 24 24",fill:"none"}',
            '{viewBox:"0 0 1024 1024"}',
            '{fill:"currentColor",viewBox:"0 0 16 16"}',
            '{version:"1.1",viewBox:"0 0 32 32"}',
            '{version:"1",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"}',
            '{version:"1.1",viewBox:"0 0 16 16"}',
            '{viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"}', // tb
            '{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}', // fi
            '{version:"1.2",baseProfile:"tiny",viewBox:"0 0 24 24"}',
            '{version:"1.1",id:"Layer_1",x:"0px",y:"0px",viewBox:"0 0 30 30",style:"enable-background:new 0 0 30 30;"}',
            '{viewBox:"0 0 16 16",fill:"currentColor"}',
            '{"role":"img",viewBox:"0 0 24 24"}',
            '{version:"1.1",viewBox:"0 0 17 17"}',
            '{viewBox:"0 0 512 512"}',
            '{viewBox:"0 0 20 20",fill:"currentColor"}',
            '{viewBox:"0 0 10 16"}',
        ],
        'tag': ['"path"'],
        'fill': ['"currentColor"', '"none"'],
        'stroke': ['"#000"', '"none"']
    }; // tag:"path"

    for (const [commonKey, commonAtts] of Object.entries(short)) {
        for (const commonAtt of commonAtts) {
            if (content.includes(`${commonKey}:${commonAtt}`)) {
                content = content.replaceAll(`${commonKey}:${commonAtt}`, commonKey);
                content = `const ${commonKey}=${commonAtt}\n${content}`;
                shorted += commonAtt + " ";
                break;
            }
        }
    }
    console.log(`generating ${dest} shorted:${shorted}`);
    await fs.ensureDir(name)
    await Deno.writeTextFile(dest, content)
}
