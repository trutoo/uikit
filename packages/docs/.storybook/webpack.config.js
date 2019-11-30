module.exports = ({ config }) => {
  // Remove default postcss options allowing configs to be read from individual packages
  const cssRule = config.module.rules.find(r => r.test.toString() === /\.css$/.toString());
  const postCssUse = cssRule.use.find(u => u.loader && u.loader.indexOf('postcss-loader') > -1);
  delete postCssUse.options;
  return config;
};
