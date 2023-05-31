// deno run --allow-read --allow-write .\regen.ts
// du --exclude .git --exclude node_modules --bytes .
// Maximum allowed size is 20971520 bytes, 20480 Kbytes
import * as path from "https://deno.land/std@0.190.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.190.0/fs/mod.ts";
import { providers } from "./lib/providers.ts";

const src = "node_modules/react-icons";
const nextTag = "@1.0.8";
const reactIconVersion = "@1.0.8";

const EXTRA_COMPRESSION = false;
const NL = "\n";
const BQ3 = "```";
const NL2 = `${NL}${NL}`;

async function writeFile(dest: string, content: string): Promise<void> {
  let oldContent = "";
  try {
    oldContent = await Deno.readTextFile(dest);
  } catch (_) {
    // ignore
  }
  const v1 = oldContent.replaceAll(/[\r\n]+/g, "");
  const v2 = content.replaceAll(/[\r\n]+/g, "");
  if (v1 === v2) return;
  console.log(`updating ${dest}`);
  await Deno.writeTextFile(dest, content);
}

for await (const dirEntry of Deno.readDir(src)) {
  if (dirEntry.isFile) continue;
  const { name } = dirEntry;
  if (name === "lib") continue; // lib is not a provider
  const pkg = providers[name];
  if (!pkg) throw Error(`no Licence for lib ${name}`);
  const esm = path.join(src, name, "index.esm.js");
  let content = "";
  try {
    content = await Deno.readTextFile(esm);
  } catch (_) {
    continue;
  }

  const lowercase = new Set<string>();

  const mainImport1 = 'import { GenIcon, type IconBaseProps } from "./deps.ts";';
  const mainImport2 = 'import { GenIcon, type IconBaseProps } from "../deps.ts";';
  content = content.replace(`import { GenIcon } from '../lib';`, mainImport2);
  content = content.replaceAll(` (props) {`, `(props: IconBaseProps) {`);
  for (
    const att of [
      "tag",
      "viewBox",
      "attr",
      "child",
      "d",
      "id",
      "dataName",
      "strokeLinecap",
      "strokeLinejoin",
      "strokeWidth",
      "fill",
      "ariaHidden",
      "fillRule",
      "version",
      "x",
      "y",
      "style",
      "baseProfile",
      "enableBackground",
      "stroke",
    ]
  ) {
    content = content.replaceAll(
      new RegExp(`\s?"${att}"\s?:\s?`, "g"),
      `${att}:`,
    );
  }
  content = content.replaceAll(/};(\s+)export/gm, "}$1export");
  content = content.replaceAll(/};(\s+)$/gm, "}$1");
  const first = content.match(/export function ([\w]+)\(props/)![1];
  // console.log(first);
  const destDir = path.join("..", `react-icons-${name}`);
  const destDirico = path.join(destDir, "ico");
  const destMod = path.join(destDir, "mod.ts");
  const destDeps = path.join(destDir, "deps.ts");
  await fs.ensureDir(destDirico);

  /**
   * DOC
   */
  const libName = pkg.name.replace(/ Icons^/, "");
  let readme = `# ${libName} icons for deno / Preact${NL2}`;
  readme += `**License** [${pkg.licence[0]}](${pkg.licence[1]})${NL2}`;
  readme += `**Project** [${pkg.projectUrl}](${pkg.projectUrl})${NL2}`;
  readme +=
    `[See available icons here](https://react-icons.deno.dev/${name})${NL2}`;
  readme += `## import_map.json${NL2}`;
  readme += `For a transparent usage:${NL2}`;
  readme += `${BQ3}json${NL}`;
  readme += `{${NL}`;
  readme += `  "imports": {${NL}`;
  readme += `    "preact":  "https://esm.sh/preact@10.15.1",${NL}`;
  readme += `    "preact/": "https://esm.sh/preact@10.15.1/",${NL}`;
  // readme += `    "react-icons/${name}": "https://deno.land/x/react_icons_${name}${nextTag}/mod.ts",${NL}`;
  // readme += `    "react-icons/${name}/":  "https://deno.land/x/react_icons_${name}/ico/",${NL}`;
  readme +=
    `    "react-icons/${name}":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-${name}${nextTag}/mod.ts",${NL}`;
  readme +=
    `    "react-icons/${name}/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-${name}${nextTag}/ico/",${NL}`;
  readme += `  }${NL}`;
  readme += `}${NL}`;
  readme += `${BQ3}${NL2}`;
  readme += `## Import an icon without import_map by and afer loading all icons from the lib ${name}${NL2}`;
  readme += `${BQ3}ts${NL}`;
  readme +=
    `import { ${first} } from "https://deno.land/x/react_icons_${name}${nextTag}/mod.ts"${NL}`;
  readme += `${BQ3}${NL2}`;
  readme += `## import_map import an icon from all icons${NL2}`;
  readme += `${BQ3}ts${NL}`;
  readme += `import { ${first} } from "react-icons/${name}"${NL}`;
  readme += `${BQ3}${NL2}`;
  readme += `## import a single icon, downloading just one icon${NL2}`;
  readme += `${BQ3}ts${NL}`;
  readme += `import { ${first} } from "react-icons/${name}/${first}.ts"${NL}`;
  readme += `${BQ3}${NL2}`;
  readme += `or using default export${NL2}`;
  readme += `${BQ3}ts${NL}`;
  readme += `import ${first} from "react-icons/${name}/${first}.ts"${NL}`;
  readme += `${BQ3}${NL2}`;

  const markDown = readme;

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
    console.log(`generating ${destMod} shorted:${shorted}`);
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
  await writeFile(destDeps, mainExport);

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
    if (ret) console.log(`drop ${name}.${icoName} case colision.`);
    return !ret;
  });

  const subMod = [licenceHeader, readme, mainImport1 + NL2];
  await Promise.all(
    all.map(async ([code, icoName]) => {
      const icoDest = path.join(destDirico, `${icoName}.ts`);
      const def = `export default ${icoName};`;
      await writeFile(icoDest, mainImport2 + NL2 + code + NL + def + NL);
      subMod.push(code + NL);
    }),
  );
  await writeFile(destMod, subMod.join(""));

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
    path.join(destDir, "deno.jsonc"),
    JSON.stringify(
      {
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
    path.join(destDir, "import_map.json"),
    JSON.stringify(
      {
        imports: {
          preact: "https://esm.sh/preact@10.15.1",
          "preact/": "https://esm.sh/preact@10.15.1/",
        },
      },
      undefined,
      2,
    ),
  );

  await writeFile(path.join(destDir, "README.md"), markDown);

  let mod = await Deno.readTextFile("mod.ts");
  mod = mod.replaceAll(/@[0-9.]+\/(mod.ts|ico)/g, `${nextTag}/$1`);
  await writeFile("mod.ts", mod);
}
