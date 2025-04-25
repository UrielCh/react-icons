import { ensureDir } from "jsr:@std/fs";
import * as pc from "jsr:@std/fmt/colors";

import { genMarkdown, writeFile } from "./utils.ts";
import { PathBuilder } from "./PathBuilder.ts";
import {
    debugIcons,
    EXTRA_COMPRESSION,
    nextTag,
    NL,
    NL2,
    preactVersion,
    reactIconVersion,
    SVG_ATTRS,
} from "./constants.ts";
import type { Provider } from "./providers.ts";
import $ from "jsr:@david/dax";


// const bugList = new Set(["Ri4kLine", "Ri4kFill", "TbSignal4gPlus", "DiHtml53dEffects", "BsFillBadge8kFill", "BsFillBadge4kFill", "BsFillBadge3dFill",
// "BsBadge3dFill",
// "BsBadge4kFill",
// "BsBadge8kFill",
// "Md1kPlus","Md1xMobiledata","Md2kPlus","Md3dRotation","Md3gMobiledata","Md3kPlus","Md4gMobiledata","Md4gPlusMobiledata","Md4kPlus","Md5kPlus","Md6kPlus","Md7kPlus","Md8kPlus","Md9kPlus","MdOutline1kPlus","MdOutline1xMobiledata","MdOutline2kPlus","MdOutline3dRotation","MdOutline3gMobiledata","MdOutline3kPlus","MdOutline4gMobiledata","MdOutline4gPlusMobiledata","MdOutline4kPlus","MdOutline5kPlus","MdOutline6kPlus","MdOutline7kPlus","MdOutline8kPlus","MdOutline9kPlus",
// "Gi3dGlasses", 
// "Gi3dHammer", 
// "Gi3dMeeple", 
// "Gi3dStairs", 
// "GiBottomRight3dArrow",
// ]);
/**
 * process a single lib like "react-icons/bs" or "react-icons/fa"
 * @param job
 * @returns
 */
export async function processOneLib(
    job: { name: string; esm: string; pkg: Provider },
) {
    const { name, esm, pkg } = job;
    let content = "";
    try {
        content = await Deno.readTextFile(esm);
    } catch (_) {
        console.log(`no ${esm} SKIP`);
        return;
    }
    const lowercase = new Set<string>();
    // filter / convert content

    const mainImport1 =
        `import { GenIcon } from "./deps.ts";${NL}import type { IconBaseProps, JSX, VNode } from "./deps.ts";`;
    const mainImport2 =
        `import { GenIcon } from "../deps.ts";${NL}import type { IconBaseProps, JSX, VNode } from "../deps.ts";`;

    // drop the first line
    content = content.replace("// THIS FILE IS AUTO GENERATED\n", "");
    content = content.replace(`import { GenIcon } from '../lib';`, mainImport2);
    content = content.replaceAll(` (props) {`, `(props: IconBaseProps) {`);
    // remove quotes from attributes to reduce size
    for (const att of SVG_ATTRS) {
        content = content.replaceAll(
            new RegExp(`\s?"${att}"\s?:\s?`, "g"),
            `${att}:`,
        );
    }
    content = content.replaceAll(/};(\s+)export/gm, "}$1export");
    content = content.replaceAll(/};(\s+)$/gm, "}$1");
    // extract first for doc
    const first = content.match(/export function ([\w]+)\(props/)![1];
    // console.log(first);
    const paths = new PathBuilder("..", name);
    await ensureDir(paths.destDirico);
    try {
        await $`git pull`.cwd(paths.destDir);
    } catch (e) {
        console.error(`git pull failed in ${paths.destDir}, clone instead`);
        return;
        // await $`git clone https://github.com/react-icons/react-icons.git`.cwd(paths.destDir);
    }
    /**
     * DOC for readme.MD and @module
     */
    const markDown = genMarkdown({ pkg, name, nextTag, first });
    let readme = markDown;
    readme += "@module" + NL;
    // convert README TO comment README
    const readmeComment = `/**${NL}` +
        readme
            .split(/\r?\n/g)
            .map((line) => ` * ${line}`)
            .join(NL) +
        `${NL} */${NL2}`;

    /**
     * code reduction:
     */
    if (EXTRA_COMPRESSION) {
        let shorted = "";
        const short = {
            attr: [
                '{viewBox:"0 0 24 24"}',
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
            tag: ['"path"'],
            fill: ['"currentColor"', '"none"'],
            stroke: ['"none"'],
        };
        // look for best compression tips
        for (const [commonKey, commonAtts] of Object.entries(short)) {
            for (const commonAtt of commonAtts) {
                if (content.includes(`${commonKey}:${commonAtt}`)) {
                    content = content.replaceAll(
                        `${commonKey}:${commonAtt}`,
                        commonKey,
                    );
                    content = `const ${commonKey}=${commonAtt}${NL}${content}`;
                    shorted += commonAtt + " ";
                    break;
                }
            }
        }
        console.log(`generating ${paths.destMod} shorted:${shorted}`);
    }

    //if (name === 'gr') {
    //    // remove all stroke to fix dark mode usage
    //    content = content.replaceAll(/,stroke:"[^"]+"/g, '');
    //    content = content.replaceAll(/{stroke:"[^"]+",/g, '{');
    //}
    /**  generate deps.ts */
    let mainExport = "";
    //    `// export { GenIcon, type IconBaseProps } from "https://deno.land/x/react_icons@${reactIconVersion}/mod.ts";${NL}`;
    mainExport +=
        `export { GenIcon, type IconBaseProps } from "@preact-icons/common";${NL}`;
    mainExport += `export type { JSX, VNode } from "preact";${NL}`;
    await writeFile(paths.destDeps, mainExport);

    const licenceHeader =
        `// Copyright ${pkg.since}-2024 the ${pkg.name} authors. All rights reserved. ${
            pkg.licence[0]
        } (${pkg.licence[1]}).${NL}`;

    const blocks = content.matchAll(
        /export function ([^\(]+)\(props: IconBaseProps\) {[\r\n]+.+[\r\n]+}/g,
    );
    let all = [...blocks].map(([code, name]) => {
        const nameLt = name.substring(job.name.length);
        // add JS doc on function
        code = `/**${NL} * ${nameLt} icon from ${job.pkg.name}${NL} */${NL}` +
            code;
        return [code, name];
    });

    // drop case colision
    all = all.filter(([, icoName]) => {
        icoName = icoName.toLocaleLowerCase();
        const ret = lowercase.has(icoName);
        lowercase.add(icoName);
        if (ret) {
            console.log(
                `${
                    pc.red("drop")
                } ${name}.${icoName} can cause case-insensitive colision.`,
            );
        }
        return !ret;
    });

    const subMod = [licenceHeader, readmeComment, mainImport1 + NL2];

    const allIconst: Record<string, string> = {};

    await Promise.all(
        all.map(async ([code, icoName]) => {
            code = code.replace(",child:[]", "");
            code = code.replace(
                "(props: IconBaseProps) {",
                "(props: IconBaseProps): VNode<JSX.SVGAttributes> {",
            );
            const def = `export default ${icoName};`;
            // same as the main code but with a @module comment
            const subCode = code.replace(
                `${NL} */${NL}`,
                `${NL} * @module${NL} */${NL}`,
            );
            const icoData = mainImport2 + NL2 + subCode + NL + def + NL;
            await writeFile(paths.getIconFile(icoName), icoData);

            if (debugIcons.has(icoName)) {
                console.log(`Write a cody of ${pc.green(icoName)} for debug`);
                const data = icoData.replace('"../deps.ts"', '"../mod.ts"');
                await writeFile(paths.getDebugIcon(icoName), data);
            }
            // console.log(`processing ${name} content length:${content.length}`);
            // content = content.replaceAll("(props: IconBaseProps) {", "(props: IconBaseProps): VNode<JSX.SVGAttributes> {");
            // console.log(`processing ${name} content length:${content.length}`);

            allIconst[icoName] = code + NL;
            // subMod.push(code + NL);
        }),
    );
    // order icons
    const icons = Object.keys(allIconst).sort();
    for (const icon of icons) {
        subMod.push(allIconst[icon]);
    }

    await writeFile(paths.destMod, subMod.join(""));

    // if (WRITE_BIG_MOD_TS) {
    //   for await (const file of fs.walk(name)) {
    //     if (file.name === "mod.ts") continue;
    //     if (!file.name.endsWith("ts")) continue;
    //     const fullpath = path.join(destDir, file.name);
    //     console.log(`removing old ${fullpath}`);
    //     await Deno.remove(fullpath);
    //   }
    //   await writeFile(destMod, licenceHeader + readme + content);
    // }
    const denoConfig = {
        lock: false,
        // importMap: "./import_map.json",

        name: `@preact-icons/${name}`,
        license: pkg.licence[0],
        version: nextTag,
        exports: {
            ".": "./mod.ts",
        } as Record<string, string>,
        compilerOptions: {
            lib: [
                "dom",
                "deno.ns",
            ],
            jsx: "react-jsx",
            jsxImportSource: "preact",
        },
        imports: {
            "@preact-icons/common":
                `jsr:@preact-icons/common@^${reactIconVersion}`,
            preact: `npm:preact@^${preactVersion}`,
        },
        publish: {
            exclude: [
                ".github",
            ],
        },
    };


    const lowercase2 = new Set<string>();

    for (const iconName of icons) {
        // ignore bug icons
        const lc = iconName.toLocaleLowerCase();
        if (lowercase2.has(lc)) 
            continue
        lowercase2.add(lc);
        // if (bugList.has(iconName)){
        //     console.log(`skip ${iconName} due to bug`);
        //     continue;
        // }
        denoConfig.exports[`./${iconName}`] = `./ico/${iconName}.ts`;
    }

    await writeFile(
        paths.denoConfig,
        JSON.stringify(denoConfig, undefined, 2) + NL,
    );
    // try {
    //     await Deno.remove(paths.import_map);
    // } catch (_) {
    //     // ignore
    // }
    await writeFile(paths.README, markDown);

    await ensureDir(paths.destWorkflows);
    await writeFile(
        paths.destpublishYml,
        `name: Publish
on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - name: Publish package
        run: npx jsr publish
`,
    );
}
