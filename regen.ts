// deno run --allow-read --allow-write .\regen.ts
import * as path from "https://deno.land/std@0.165.0/path/mod.ts";
import * as  fs from "https://deno.land/std@0.165.0/fs/mod.ts";
const src = 'C:\\0\\react-solid\\node_modules\\react-icons';

const nextTag = '0.1.2';

// lioke original IconManifest
interface Provider {
    name: string
    licence: [string, string],
    projectUrl: string
}

const packages: { [key: string]: Provider } = {
    ai: {
        name: 'Ant Design Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/ant-design/ant-design-icons'
    },
    bs: {
        name: 'Bootstrap Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/twbs/icons'
    },
    bi: {
        name: 'BoxIcons',
        licence: ['CC BY 4.0 License', 'https://github.com/atisawd/boxicons/blob/master/LICENSE'],
        projectUrl: 'https://github.com/atisawd/boxicons'
    },
    ci: {
        name: 'Circum Icons',
        licence: ['MPL-2.0 license', 'https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE'],
        projectUrl: 'https://circumicons.com/'
    },
    di: {
        name: 'Devicons',
        licence: ['MIT', 'https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE'],
        projectUrl: 'https://vorillaz.github.io/devicons/'
    },
    fi: {
        name: 'Feather',
        licence: ['MIT', 'https://github.com/feathericons/feather/blob/master/LICENSE'],
        projectUrl: 'https://feathericons.com/'
    },
    fc: {
        name: 'Devicons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/icons8/flat-color-icons'
    },
    fa: {
        name: 'Font Awesome',
        licence: ['CC BY 4.0 License', 'https://creativecommons.org/licenses/by/4.0/'],
        projectUrl: 'https://fontawesome.com/'
    },
    gi: {
        name: 'Game Icons',
        licence: ['CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'],
        projectUrl: 'https://game-icons.net/'
    },
    go: {
        name: 'Github Octicons icons',
        licence: ['MIT', 'https://github.com/primer/octicons/blob/master/LICENSE'],
        projectUrl: 'https://octicons.github.com/'
    },
    gr: {
        name: 'Grommet-Icons',
        licence: ['Apache License Version 2.0', 'http://www.apache.org/licenses/'],
        projectUrl: 'https://github.com/grommet/grommet-icons'
    },
    hi: {
        name: 'Heroicons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tailwindlabs/heroicons'
    },
    hi2: {
        name: 'Heroicons 2',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tailwindlabs/heroicons'
    },
    im: {
        name: 'IcoMoon Free',
        licence: ['CC BY 4.0 License', 'https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt'],
        projectUrl: 'https://github.com/Keyamoon/IcoMoon-Free'
    },
    io: {
        name: 'Ionicons 4',
        licence: ['MIT', 'https://github.com/ionic-team/ionicons/blob/master/LICENSE'],
        projectUrl: 'https://ionicons.com/'
    },
    io5: {
        name: 'Ionicons 5',
        licence: ['MIT', 'https://github.com/ionic-team/ionicons/blob/master/LICENSE'],
        projectUrl: 'https://ionicons.com/'
    },
    md: {
        name: 'Material Design icons',
        licence: ['Apache License Version 2.0', 'https://github.com/google/material-design-icons/blob/master/LICENSE'],
        projectUrl: 'http://google.github.io/material-design-icons/'
    },
    ri: {
        name: 'Remix Icon',
        licence: ['Apache License Version 2.0', 'http://www.apache.org/licenses/'],
        projectUrl: 'https://github.com/Remix-Design/RemixIcon'
    },
    si: {
        name: 'Simple Icons',
        licence: ['CC0 1.0 Universal', 'https://creativecommons.org/publicdomain/zero/1.0/'],
        projectUrl: 'https://simpleicons.org/'
    },
    sl: {
        name: 'Simple Line Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://thesabbir.github.io/simple-line-icons/'
    },
    tb: {
        name: 'Tabler Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tabler/tabler-icons'
    },
    tfi: {
        name: 'Themify Icons',
        licence: ['MIT', 'https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE'],
        projectUrl: 'https://github.com/lykmapipo/themify-icons'
    },
    ti: {
        name: 'Typicons',
        licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'],
        projectUrl: 'http://s-ings.com/typicons/'
    },
    vsc: {
        name: 'VS Code Icons',
        licence: ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'],
        projectUrl: 'https://github.com/microsoft/vscode-codicons'
    },
    wi: {
        name: 'Weather Icons',
        licence: ['SIL OFL 1.1', 'http://scripts.sil.org/OFL'],
        projectUrl: 'https://erikflowers.github.io/weather-icons/'
    },
    cg: {
        name: 'css.gg',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/astrit/css.gg'
    },
};

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
    const dest = path.join(name, 'mod.ts')
    const destReadme = path.join(name, 'README.md')

    try {
        await Deno.remove(destReadme);
    } catch (_) { /* ignore */ }

    /**
     * DOC
     */

    const pkg = packages[name];
    let readme = ''
    if (pkg) {
        const libName = pkg.name.replace(/ Icons^/, '');
        readme = `# ${libName} icons for deno / Preact\n\n`
        readme += `**License** [${pkg.licence[0]}](${pkg.licence[1]})\n\n`
        readme += `**Project** [${pkg.projectUrl}](${pkg.projectUrl})\n\n`
        readme += `[See available icons here](https://react-icons.github.io/react-icons/icons?name=${name})\n\n`
        readme += `## import_map.json\n\n`;
        readme += `For a transparent usage:\n\n`;
        readme += '```json\n';
        readme += `{
     "imports": {
         "preact": "https://esm.sh/preact@10.11.3",
         "preact/": "https://esm.sh/preact@10.11.3/",
         "react-icons/${name}": "https://deno.land/x/react_icons@${nextTag}/${name}/mod.ts",
     }
 }`;
        readme += '\n```';
        // convert README TO comment README
        readme = '/**\n' + readme.split(/[\r\n]+/g).map((line) => ` * ${line}`).join('\n') + '\n */\n\n';


        /**
         * code reduction:
         */
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
        await Deno.writeTextFile(dest, readme + content)
        // await Deno.writeTextFile(destReadme, readme)
    }

    /**
     * TODO Regen the main mod.ts
     */

}
