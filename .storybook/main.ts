import type { StorybookConfig } from '@storybook/nextjs'

const path = require('path')

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/context': path.resolve(__dirname, '/context'),
      '@/constants': path.resolve(__dirname, '/constants'),
      '@/lib': path.resolve(__dirname, '/lib'),
      '/images': path.resolve('https://problem-randomizer.vercel.app/images'),
    }

    return config
  },
}

export default config
