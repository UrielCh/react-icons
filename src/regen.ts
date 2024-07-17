// deno run --allow-read --allow-write .\regen.ts
// du --exclude .git --exclude node_modules --bytes .
// Maximum allowed size is 20971520 bytes, 20480 Kbytes
import * as path from "https://deno.land/std@0.190.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as pc from "https://deno.land/std@0.190.0/fmt/colors.ts";
import { providers } from "../lib/providers.ts";
import $ from "https://deno.land/x/dax@0.32.0/mod.ts";
import { genMarkdown, writeFile } from "./utils.ts";
import { PathBuilder } from "./PathBuilder.ts";
import {
  debugIcons,
  EXTRA_COMPRESSION,
  nextTag,
  NL,
  NL2,
  reactIconVersion,
  SVG_ATTRS,
} from "./constants.ts";

export const src = "node_modules/react-icons";
await $`npm install react-icons@latest`;

for await (const dirEntry of Deno.readDir(src)) {
  if (dirEntry.isFile) continue;
  const { name } = dirEntry;
  if (name === "lib") continue; // lib is not a provider
  const pkg = providers[name];
  if (!pkg) throw Error(`no Licence for lib "${name}", please add it to providers in lib/providers.ts`);
  // load original icon data
  const esm = path.join(src, name, "index.mjs");
  let content = "";
  try {
    content = await Deno.readTextFile(esm);
  } catch (_) {
    console.log(`no ${esm} SKIP`);
    continue;
  }
  const lowercase = new Set<string>();
  // filter / convert content
  const mainImport1 =
    'import { GenIcon, type IconBaseProps } from "./deps.ts";';
  const mainImport2 =
    'import { GenIcon, type IconBaseProps } from "../deps.ts";';
  content = content.replace(`import { GenIcon } from '../lib';`, mainImport2);
  content = content.replaceAll(` (props) {`, `(props: IconBaseProps) {`);
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
  await fs.ensureDir(paths.destDirico);

  /**
   * DOC
   */
  const markDown = genMarkdown(pkg, name, nextTag, first);
  let readme = markDown;
  readme += "@module";
  // convert README TO comment README
  readme = `/**${NL}` +
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
          content = content.replaceAll(`${commonKey}:${commonAtt}`, commonKey);
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

  let mainExport =
    `// export { GenIcon, type IconBaseProps } from "https://deno.land/x/react_icons${reactIconVersion}/mod.ts";${NL}`;
  mainExport +=
    `export { GenIcon, type IconBaseProps } from "https://cdn.jsdelivr.net/gh/urielch/react-icons${reactIconVersion}/mod.ts";${NL}`;
  await writeFile(paths.destDeps, mainExport);

  const licenceHeader =
    `// Copyright ${pkg.since}-2022 the ${pkg.name} authors. All rights reserved. ${
      pkg.licence[0]
    } (${pkg.licence[1]}).${NL}`;

  const blocks = content.matchAll(
    /export function ([^\(]+)\(props: IconBaseProps\) {[\r\n]+.+[\r\n]+}/g,
  );
  let all = [...blocks];
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

  const subMod = [licenceHeader, readme, mainImport1 + NL2];

  const allIconst: Record<string, string> = {};

  await Promise.all(
    all.map(async ([code, icoName]) => {
      const def = `export default ${icoName};`;
      const icoData = mainImport2 + NL2 + code + NL + def + NL;
      await writeFile(paths.getIconFile(icoName), icoData);

      if (debugIcons.has(icoName)) {
        console.log(`Write a cody of ${pc.green(icoName)} for debug`);
        const data = icoData.replace('"../deps.ts"', '"../mod.ts"');
        await writeFile(paths.getDebugIcon(icoName), data);
      }
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

  await writeFile(
    paths.denoConfig,
    JSON.stringify(
      {
        lock: false,
        importMap: "./import_map.json",
        compilerOptions: {
          jsx: "react-jsx",
          jsxImportSource: "preact",
        },
      },
      undefined,
      2,
    ),
  );
  await writeFile(
    paths.import_map,
    JSON.stringify(
      {
        imports: {
          preact: "https://esm.sh/preact@10.22.1",
          "preact/": "https://esm.sh/preact@10.22.1/",
        },
      },
      undefined,
      2,
    ),
  );

  await writeFile(paths.README, markDown);
}

let mod = await Deno.readTextFile("mod.ts");
mod = mod.replaceAll(/@[0-9.]+\/(mod.ts|ico)/g, `${nextTag}/$1`);
await writeFile("mod.ts", mod);

let README = await Deno.readTextFile("README.md");
README = README.replaceAll(/@[0-9.]+\/(mod.ts|ico)/g, `${nextTag}/$1`);
README = README.replaceAll(/x\/react_icons@[0-9.]+/g, `x/react_icons/${reactIconVersion}`);
await writeFile("README.md", README);
