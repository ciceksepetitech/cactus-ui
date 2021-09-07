import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#22519D',
  colorSecondary: '#52AD36',

  // UI
  appBg: 'white',
  appBorderRadius: 4,
  appContentBg: 'white',
  appBorderColor: '#eee',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barBg: 'white',
  barTextColor: '#22519D',
  barSelectedColor: '#22519D',

  // Form colors
  inputBg: 'white',
  inputBorder: '#E27826',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'ÇiçekSepeti',
  brandUrl: 'https://www.ciceksepeti.com/',
  brandImage:
    'https://cdn03.ciceksepeti.com/Themes/Ciceksepeti/Assets/images/logo-new-ciceksepeti.png?v=3.1.1.34146'
});
