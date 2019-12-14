const path = require('path');

module.exports = ({ config }) => {
  // Remove default PostCSS options allowing configs to be read from individual packages
  const cssRule = config.module.rules.find(r => r.test.toString() === /\.css$/.toString());
  const postCssUse = cssRule.use.find(u => u.loader && u.loader.indexOf('postcss-loader') > -1);
  delete postCssUse.options;

  // Add TypeScript handling to Babel configuration
  const jsRule = config.module.rules.find(r => r.test.toString() === /\.(mjs|jsx?)$/.toString());
  const babelUse = jsRule.use.find(u => u.loader && u.loader.indexOf('babel-loader') > -1);
  jsRule.test = /\.(mjs|jsx?|tsx?)$/;
  jsRule.exclude = new RegExp(`node_modules\\${path.sep}(?!@trutoo)`);
  delete jsRule.include;
  babelUse.options.presets.push([
    require.resolve('@babel/preset-typescript'),
    {
      isTSX: true,
      allExtensions: true,
    },
  ]);
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
