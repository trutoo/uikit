module.exports = ({ config }) => {
  //console.dir(config.module.rules, { depth: 5 });

  // Remove default PostCSS options allowing configs to be read from individual packages
  const cssRule = config.module.rules.find((r) => r.test.toString() === /\.css$/.toString());
  const postCssUse = cssRule.use.find((u) => u.loader && u.loader.indexOf('postcss-loader') > -1);
  // Workaround until PostCSS loader is updated for PostCSS 8 https://github.com/storybookjs/storybook/issues/12668
  postCssUse.loader = 'postcss-loader';
  delete postCssUse.options;

  return config;
};
