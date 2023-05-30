// deno run --allow-read --allow-write .\regen.ts
// du --exclude .git --exclude node_modules --bytes .
// Maximum allowed size is 20971520 bytes, 20480 Kbytes
import * as path from "https://deno.land/std@0.184.0/path/mod.ts";
import * as  fs from "https://deno.land/std@0.184.0/fs/mod.ts";
import { providers } from "./lib/providers.ts";

const src = 'node_modules/react-icons';
const nextTag = '0.2.4';

const EXTRA_COMPRESSION = false;
const WRITE_BIG_MOD_TS = false;
const NL = '\n';
const BQ = '`';
const BQ3 = '```';
const NL2 = `${NL}${NL}`;

for await (const dirEntry of Deno.readDir(src)) {
    if (dirEntry.isFile) continue;
    const { name } = dirEntry;
    if (name === 'lib') continue; // lib is not a provider
    const pkg = providers[name];
    if (!pkg) throw Error(`no Licence for lib ${name}`)
    const esm = path.join(src, name, 'index.esm.js')
    let content = '';
    try {
        content = await Deno.readTextFile(esm);
    } catch (_) {
        continue
    }

    const mainImport = `import { GenIcon, type IconBaseProps } from "https://deno.land/x/react_icons/mod.ts";`;
    content = content.replace(`import { GenIcon } from '../lib';`, mainImport)
    content = content.replaceAll(` (props) {`, `(props: IconBaseProps) {`)
    for (const att of ['tag', 'viewBox', 'attr', 'child', 'd', 'id', 'dataName', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth', 'fill', 'ariaHidden', 'fillRule', 'version', 'x', 'y', 'style', 'baseProfile', 'enableBackground', 'stroke'])
        content = content.replaceAll(new RegExp(`\s?"${att}"\s?:\s?`, 'g'), `${att}:`)
    content = content.replaceAll(/};(\s+)export/mg, '}$1export')
    content = content.replaceAll(/};(\s+)$/mg, '}$1')
    const first = content.match(/export function ([\w]+)\(props/)![1];
    // console.log(first);
    const destDir = path.join('..', `react-icons-${name}`)
    const destDirico = path.join(destDir, 'ico')
    const dest = path.join(destDir, 'mod.ts')
    await fs.ensureDir(destDirico)

    /**
     * DOC
     */
    const libName = pkg.name.replace(/ Icons^/, '');
    let readme = `# ${libName} icons for deno / Preact${NL2}`
    readme += `**License** [${pkg.licence[0]}](${pkg.licence[1]})${NL2}`
    readme += `**Project** [${pkg.projectUrl}](${pkg.projectUrl})${NL2}`
    readme += `[See available icons here](https://react-icons.github.io/react-icons/icons?name=${name})${NL2}`
    readme += `## import_map.json${NL2}`;
    readme += `For a transparent usage:${NL2}`;
    readme += `${BQ3}json${NL}`;
    readme += `{
  "imports": {
    "preact": "https://esm.sh/preact@10.15.1",
    "preact/": "https://esm.sh/preact@10.15.1/",
    "react-icons/${name}": "https://deno.land/x/react_icons@${nextTag}/${name}/mod.ts",
  }
}`;
    readme += `${NL}${BQ3}${NL2}`;
    readme += `## Direct import sample${NL2}`;
    readme += `${BQ}import { ${first} } from "https://deno.land/x/react_icons@${nextTag}/${name}/mod.ts"${BQ}${NL2}`;
    readme += `## import_map import sample${NL2}`;
    readme += `${BQ}import { ${first} } from "react-icons/${name}"${BQ}${NL2}`;
    readme += '@module';
    // convert README TO comment README
    readme = `/**${NL}` + readme.split(/\r?\n/g).map((line) => ` * ${line}`).join(NL) + `${NL} */${NL2}`;

    /**
     * code reduction:
     */
    if (EXTRA_COMPRESSION) {
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
            'stroke': ['"none"']
        };
        // look for best compression tips
        for (const [commonKey, commonAtts] of Object.entries(short)) {
            for (const commonAtt of commonAtts) {
                if (content.includes(`${commonKey}:${commonAtt}`)) {
                    content = content.replaceAll(`${commonKey}:${commonAtt}`, commonKey);
                    content = `const ${commonKey}=${commonAtt}${NL}${content}`;
                    shorted += commonAtt + " ";
                    break;
                }
            }
        }
        console.log(`generating ${dest} shorted:${shorted}`);
    }

    //if (name === 'gr') {
    //    // remove all stroke to fix dark mode usage
    //    content = content.replaceAll(/,stroke:"[^"]+"/g, '');
    //    content = content.replaceAll(/{stroke:"[^"]+",/g, '{');
    //}

    const licenceHeader = `// Copyright ${pkg.since}-2022 the ${pkg.name} authors. All rights reserved. ${pkg.licence[0]} (${pkg.licence[1]}).${NL}`
    if (WRITE_BIG_MOD_TS) {
        for await (const file of fs.walk(name)) {
            if (file.name === 'mod.ts')
                continue;
            if (!file.name.endsWith('ts'))
                continue;
            const fullpath = path.join(destDir, file.name)
            console.log(`removing old ${fullpath}`);
            await Deno.remove(fullpath)
        }
        await Deno.writeTextFile(dest, licenceHeader + readme + content)
    } else {
        const blocks = content.matchAll(/export function ([^\(]+)\(props: IconBaseProps\) {[\r\n]+.+[\r\n]+}/g)
        const all = [...blocks];
        const subMod = [licenceHeader, readme];

        for (const [ code, icoName ] of all) {
            const icoDest = path.join(destDirico, `${icoName}.ts`)
            console.log(`generating ${icoDest}`);
            subMod.push(`export { ${icoName} } from './ico/${icoName}.ts';${NL}`);
            await Deno.writeTextFile(icoDest, mainImport + NL2 + code + NL)
        }
        // const [ code, name ] = all[0]
        //console.log(all[0][1])
        await Deno.writeTextFile(dest, subMod.join(''))
    }
    // TODO Regen the main mod.ts
}
