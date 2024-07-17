import * as pc from "https://deno.land/std@0.190.0/fmt/colors.ts";
import { Provider } from "../lib/providers.ts";
import { BQ3, NL, NL2, preactVersion } from "./constants.ts";

export async function writeFile(dest: string, content: string): Promise<void> {
  let oldContent = "";
  try {
    oldContent = await Deno.readTextFile(dest);
  } catch (_) {
    // ignore
  }
  const v1 = oldContent.replaceAll(/[\r\n]+/g, "");
  const v2 = content.replaceAll(/[\r\n]+/g, "");
  if (v1 === v2) return;
  console.log(`${pc.yellow("updating")} ${dest}`);
  await Deno.writeTextFile(dest, content);
}

export function genMarkdown(pkg: Provider, name: string, nextTag: string, first: string): string {
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
    readme += `    "preact":  "https://esm.sh/preact@${preactVersion}",${NL}`;
    readme += `    "preact/": "https://esm.sh/preact@${preactVersion}/",${NL}`;
    // readme += `    "react-icons/${name}": "https://deno.land/x/react_icons_${name}${nextTag}/mod.ts",${NL}`;
    // readme += `    "react-icons/${name}/":  "https://deno.land/x/react_icons_${name}/ico/",${NL}`;
    readme +=
      `    "react-icons/${name}":  "https://cdn.jsdelivr.net/gh/urielch/react-icons-${name}${nextTag}/mod.ts",${NL}`;
    readme +=
      `    "react-icons/${name}/": "https://cdn.jsdelivr.net/gh/urielch/react-icons-${name}${nextTag}/ico/",${NL}`;
    readme += `  }${NL}`;
    readme += `}${NL}`;
    readme += `${BQ3}${NL2}`;
    readme +=
      `## Import an icon without import_map by and afer loading all icons from the lib ${name}${NL2}`;
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
    return readme;
}