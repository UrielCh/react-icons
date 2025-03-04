// deno run --allow-read --allow-write .\regen.ts
// du --exclude .git --exclude node_modules --bytes .
// Maximum allowed size is 20971520 bytes, 20480 Kbytes
// import * as path from "https://deno.land/std@0.190.0/path/mod.ts";
import * as path from "jsr:@std/path";

import { providers } from "./providers.ts";
// import $ from "jsr:@david/dax/";
import $ from "jsr:@david/dax";
import { writeFile } from "./utils.ts";
import {
  nextTag,
  reactIconVersion,
} from "./constants.ts";
import { processOneLib } from "./regenSub.ts";

export const src = "node_modules/react-icons";
await $`npm install react-icons@latest`;

for await (const dirEntry of Deno.readDir(src)) {
  if (dirEntry.isFile) continue;
  const { name } = dirEntry;
  if (name === "lib") continue; // lib is not a provider
  const pkg = providers[name];
  if (!pkg) {
    throw Error(
      `no Licence for lib "${name}", please add it to providers in lib/providers.ts`,
    );
  }
  // load original icon data
  const esm = path.join(src, name, "index.mjs");

  await processOneLib({
    name: name,
    esm: esm,
    pkg: pkg,
  });
}

// update local mod.ts and README.md
let mod = await Deno.readTextFile("mod.ts");
mod = mod.replaceAll(/@[0-9.]+\/(mod.ts|ico)/g, `@${nextTag}/$1`);
await writeFile("mod.ts", mod);

let denoc = await Deno.readTextFile("deno.json");
denoc = denoc.replaceAll(/"version": "[0-9.]+"/g, `"version": "${reactIconVersion}"`);
await writeFile("deno.json", denoc);


let README = await Deno.readTextFile("README.md");
README = README.replaceAll(/@[0-9.]+\/(mod.ts|ico)/g, `@${nextTag}/$1`);
// README = README.replaceAll(
//   /x\/react_icons@[0-9.]+/g,
//   `x/react_icons/@${reactIconVersion}`,
// );
await writeFile("README.md", README);
