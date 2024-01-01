import { create } from '@storybook/theming/create'

export default create({
  base: 'light',

  brandTitle:
    '<img src="https://raw.githubusercontent.com/DecSP/Problem-Randomizer/main/public/images/prob-rand-logo-gradient.png" width="49px" height="39.5px"/>',
  brandUrl: 'https://problem-randomizer.vercel.app/',

  colorPrimary: '#ff0000',
  colorSecondary: '#4338CA',

  // UI
  appBg: '#FFFFFF',
  appContentBg: '#FAFAFA',
  appBorderColor: '#0000',
  appBorderRadius: 0,
})
