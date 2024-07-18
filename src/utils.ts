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

export function genMarkdown(
  opts: { pkg: Provider; name: string; nextTag: string; first: string },
): string {
  const { pkg, name, first } = opts;
  const libName = pkg.name.replace(/ Icons^/, "");
  const readme: string[] = [];
  readme.push(`# ${libName} icons for preact`);
  readme.push("");
  readme.push(
    `[![JSR](https://jsr.io/badges/@preact-icons/${name})](https://jsr.io/@preact-icons/${name})`,
  );
  readme.push("");
  readme.push(`**License** [${pkg.licence[0]}](${pkg.licence[1]})`);
  readme.push("");
  readme.push(`**Project** [${pkg.projectUrl}](${pkg.projectUrl})`);
  readme.push("");
  readme.push(
    `[See available icons here](https://react-icons.deno.dev/${name})`,
  );
  readme.push("");
  readme.push(`## install the module`);
  readme.push("");
  readme.push(`${BQ3}bash`);
  readme.push(`deno add @preact-icons/${name}`);
  readme.push(`dnpx jsr add @preact-icons/${name}`);
  readme.push(`pnpm dlx jsr add @preact-icons/${name}`);
  readme.push(`bunx jsr add @preact-icons/${name}`);
  readme.push(BQ3);
  readme.push("");
  readme.push(
    `You may need to update your preact mapping to avoid mixing JSR and http import:`,
  );
  readme.push(
    `Currently Deno fresh import preact using https://esm.sh/preact http import can not be mixed with JSR package, so you may need to update your preact mapping:`,
  );
  readme.push(`${BQ3}json`);
  readme.push(`{`);
  readme.push(` "preact": "npm:preact@${preactVersion}",`);
  readme.push(
    ` "preact/jsx-runtime": "npm:preact@${preactVersion}/jsx-runtime",`,
  );
  readme.push(` "preact/hooks": "npm:preact@${preactVersion}/hooks",`);
  readme.push(`}`);
  readme.push(BQ3);
  readme.push("");
  readme.push(`## import an icon from all icons`);
  readme.push("");
  readme.push(`${BQ3}ts`);
  readme.push(`import { ${first} } from "@preact-icons/${name}"`);
  readme.push(`${BQ3}`);
  readme.push("");
  readme.push(`## import a single icon, downloading just one icon`);
  readme.push("");
  readme.push(`${BQ3}ts`);
  readme.push(`import { ${first} } from "react-icons/${name}/${first}"`);
  readme.push(BQ3);
  readme.push("");
  readme.push(`or using default export`);
  readme.push("");
  readme.push(`${BQ3}ts`);
  readme.push(`import ${first} from "react-icons/${name}/${first}"`);
  readme.push(BQ3);
  readme.push("");
  return readme.join(NL);
}
