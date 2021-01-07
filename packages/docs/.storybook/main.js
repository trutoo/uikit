module.exports = {
  stories: [
    '../../../documentation/**/*.stories.mdx',
    '../node_modules/@trutoo/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode/register',
  ],
};
