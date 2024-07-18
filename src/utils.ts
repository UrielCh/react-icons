import * as pc from "@std/fmt/colors";
import type { Provider } from "./providers.ts";
import { BQ3, NL, NL2, preactVersion } from "./constants.ts";

export async function writeFile(dest: string, content: string): Promise<void> {
  let oldContent = "";
  try {
    oldContent = await Deno.readTextFile(dest);
  } catch (_) {
    // ignore
  }
  let v1 = oldContent;
  let v2 = content;
  v1 = v1.replaceAll(/\r\n/g, "\n");
  v2 = v2.replaceAll(/\r\n/g, "\n");
  if (v1 === v2) return;
  console.log(`${pc.yellow("updating")} ${dest}`);
  await Deno.writeTextFile(dest, content);
}

export function genMarkdown(opts: {pkg: Provider, name: string, nextTag: string, first: string}): string {
    const {pkg, name, first} = opts;
    const libName = pkg.name.replace(/ Icons^/, "");
    let readme = `# ${libName} icons for preact${NL2}`;
    readme += `[![JSR](https://jsr.io/badges/@preact-icons/${name})](https://jsr.io/@preact-icons/${name})${NL2}`;
    readme += `**License** [${pkg.licence[0]}](${pkg.licence[1]})${NL2}`;
    readme += `**Project** [${pkg.projectUrl}](${pkg.projectUrl})${NL2}`;
    readme +=
      `[See available icons here](https://react-icons.deno.dev/${name})${NL2}`;
    readme += `## install the module${NL2}`;
    readme += `${BQ3}bash${NL}`;
    readme += `deno add @preact-icons/${name}${NL}`;
    readme += `dnpx jsr add @preact-icons/${name}${NL}`;
    readme += `pnpm dlx jsr add @preact-icons/${name}${NL}`;
    readme += `bunx jsr add @preact-icons/${name}${NL}`;
    readme += `${BQ3}${NL2}`;
    readme += `You may need to update your preact mapping to avoid mixing JSR and http import:${NL}`;
    readme += `Currently Deno fresh import preact using https://esm.sh/preact http import can not be mixed with JSR package, so you may need to update your preact mapping:${NL}`;
    readme += `${BQ3}json${NL}`;
    readme += `{`;    
    readme += ` "preact": "npm:preact@${preactVersion}",${NL}`;
    readme += ` "preact/jsx-runtime": "npm:preact@${preactVersion}/jsx-runtime",${NL}`;
    readme += ` "preact/hooks": "npm:preact@${preactVersion}/hooks",${NL}`;
    readme += `}`;
    readme += `${BQ3}${NL2}`;
    readme +=
    readme += `## import an icon from all icons${NL2}`;
    readme += `${BQ3}ts${NL}`;
    readme += `import { ${first} } from "@preact-icons/${name}"${NL}`;
    readme += `${BQ3}${NL2}`;
    readme += `## import a single icon, downloading just one icon${NL2}`;
    readme += `${BQ3}ts${NL}`;
    readme += `import { ${first} } from "react-icons/${name}/${first}"${NL}`;
    readme += `${BQ3}${NL2}`;
    readme += `or using default export${NL2}`;
    readme += `${BQ3}ts${NL}`;
    readme += `import ${first} from "react-icons/${name}/${first}.ts"${NL}`;
    readme += `${BQ3}${NL2}`;
    return readme;
}