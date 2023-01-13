// like original Icon Manifest
export interface Provider {
    name: string
    licence: [string, string],
    projectUrl: string
    since: string,
    source?: string,
    to?: string,
    contributors?: string[],
}

export const providers: { [key: string]: Provider } = {
    ai: {
        name: 'Ant Design Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/ant-design/ant-design-icons',
        since: '2018',
        to: 'present',
    },
    bs: {
        name: 'Bootstrap Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/twbs/icons',
        since: '2019',
        to: '2021',
    },
    bi: {
        name: 'BoxIcons',
        licence: ['CC BY 4.0 License', 'https://github.com/atisawd/boxicons/blob/master/LICENSE'],
        projectUrl: 'https://github.com/atisawd/boxicons',
        since: '2015',
        to: '2021',
    },
    ci: {
        name: 'Circum Icons',
        licence: ['MPL-2.0 license', 'https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE'],
        projectUrl: 'https://circumicons.com/',
        since: '2022',
        to: 'present',
    },
    di: {
        name: 'Devicons',
        licence: ['MIT', 'https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE'],
        projectUrl: 'https://vorillaz.github.io/devicons/',
        source: 'https://github.com/vorillaz/devicons',
        since: '2014',
    },
    fi: {
        name: 'Feather',
        licence: ['MIT', 'https://github.com/feathericons/feather/blob/master/LICENSE'],
        projectUrl: 'https://feathericons.com/',
        source: 'https://github.com/feathericons/feather',
        since: '2017',
    },
    fc: {
        name: 'Devicons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/icons8/flat-color-icons',
        since: '2015'
    },
    fa: {
        name: 'Font Awesome',
        licence: ['CC BY 4.0 License', 'https://creativecommons.org/licenses/by/4.0/'],
        projectUrl: 'https://fontawesome.com/',
        source: 'https://github.com/FortAwesome/Font-Awesome',
        since: '2012'
    },
    gi: {
        name: 'Game Icons',
        licence: ['CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'],
        projectUrl: 'https://game-icons.net/',
        source: 'https://github.com/game-icons/icons',
        since: '2015'
    },
    go: {
        name: 'Github Octicons icons',
        licence: ['MIT', 'https://github.com/primer/octicons/blob/master/LICENSE'],
        projectUrl: 'https://octicons.github.com/',
        source: 'https://github.com/primer/octicons',
        since: '2014',
    },
    gr: {
        name: 'Grommet-Icons',
        licence: ['Apache License Version 2.0', 'http://www.apache.org/licenses/'],
        projectUrl: 'https://github.com/grommet/grommet-icons',
        since: '2017',
    },
    hi: {
        name: 'Heroicons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tailwindlabs/heroicons',
        since: '2020',
    },
    hi2: {
        name: 'Heroicons 2',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tailwindlabs/heroicons',
        since: '2022',
    },
    im: {
        name: 'IcoMoon Free',
        licence: ['CC BY 4.0 License', 'https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt'],
        projectUrl: 'https://github.com/Keyamoon/IcoMoon-Free',
        since: '2014',
    },
    io: {
        name: 'Ionicons 4',
        licence: ['MIT', 'https://github.com/ionic-team/ionicons/blob/master/LICENSE'],
        projectUrl: 'https://ionicons.com/',
        source: 'https://github.com/ionic-team/ionicons',
        since: '2015',
    },
    io5: {
        name: 'Ionicons 5',
        licence: ['MIT', 'https://github.com/ionic-team/ionicons/blob/master/LICENSE'],
        projectUrl: 'https://ionicons.com/',
        source: 'https://github.com/ionic-team/ionicons',
        since: "2020",
    },
    md: {
        name: 'Material Design icons',
        licence: ['Apache License Version 2.0', 'https://github.com/google/material-design-icons/blob/master/LICENSE'],
        projectUrl: 'http://google.github.io/material-design-icons/',
        source: 'https://github.com/google/material-design-icons',
        since: "2016",
    },
    ri: {
        name: 'Remix Icon',
        licence: ['Apache License Version 2.0', 'http://www.apache.org/licenses/'],
        projectUrl: 'https://github.com/Remix-Design/RemixIcon',
        since: "2019",
    },
    rx: {
        name: 'Radix Icons',
        licence: ['MIT', 'https://github.com/radix-ui/icons/blob/master/LICENSE'],
        projectUrl: 'https://icons.radix-ui.com',
        since: "2022",
    },
    si: {
        name: 'Simple Icons',
        licence: ['CC0 1.0 Universal', 'https://creativecommons.org/publicdomain/zero/1.0/'],
        projectUrl: 'https://simpleicons.org/',
        source: 'https://github.com/simple-icons/simple-icons',
        since: "2015",
    },
    sl: {
        name: 'Simple Line Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://thesabbir.github.io/simple-line-icons/',
        source: 'https://github.com/thesabbir/simple-line-icons',
        contributors: ['Sabbir Ahmed', 'All Contributors'],
        since: '2016'
    },
    tb: {
        name: 'Tabler Icons',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/tabler/tabler-icons',
        since: '2020',
    },
    tfi: {
        name: 'Themify Icons',
        licence: ['MIT', 'https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE'],
        projectUrl: 'https://github.com/lykmapipo/themify-icons',
        since: '2014',
    },
    ti: {
        name: 'Typicons',
        licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'],
        projectUrl: 'http://s-ings.com/typicons/',
        source: 'https://github.com/stephenhutchings/typicons.font',
        since: '2019',
    },
    vsc: {
        name: 'VS Code Icons',
        licence: ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'],
        projectUrl: 'https://github.com/microsoft/vscode-codicons',
        since: '2019',
    },
    wi: {
        name: 'Weather Icons',
        licence: ['SIL OFL 1.1', 'http://scripts.sil.org/OFL'],
        projectUrl: 'https://erikflowers.github.io/weather-icons/',
        source: 'https://github.com/erikflowers/weather-icons',
        since: '2013',
    },
    cg: {
        name: 'css.gg',
        licence: ['MIT', 'https://opensource.org/licenses/MIT'],
        projectUrl: 'https://github.com/astrit/css.gg',
        since: '2019',
    },
};
