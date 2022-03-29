// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cactus UI',
  tagline: 'Accessibility focused react component library.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/cactusui-small-icon.svg',
  organizationName: 'ciceksepeti',
  projectName: 'CS/CactusUI',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },

        theme: {
          customCss: [require.resolve('./src/sass/index.scss')],
        },
      }),
    ],
  ],

  themeConfig: {
    hideableSidebar: true,
    navbar: {
      title: 'Cactus UI',
      logo: {
        alt: 'Cactus UI Logo',
        src: 'img/cactusui-small-icon.svg',
      },
      items: [
        {
          href: 'https://github.com/ciceksepetitech/cactus-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'Cactus UI - Accessible Component Library',
    },
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext'),
      darkTheme: require('prism-react-renderer/themes/oceanicNext'),
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
  },

  plugins: [require.resolve('docusaurus-plugin-sass')],
  themes: ['@docusaurus/theme-live-codeblock'],
};

module.exports = config;
