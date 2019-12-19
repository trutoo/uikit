const path = require('path');
const defaultVariables = require('./postcss.variables.js');
const defaultMedia = require('./postcss.media.js');
const defaultMixins = require('./postcss.mixins.js');

module.exports = ({ options, env }) => {
  const variables = options.variables || defaultVariables;
  const media = options.media || defaultMedia;
  const mixins = options.mixins || defaultMixins;

  return {
    plugins: {
      // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
      // https://github.com/postcss/postcss-import
      'postcss-import': {
        path: 'src/',
        addModulesDirectories: ['node_modules'],
        resolve: (id, basedir, importOptions) => {
          return id.charAt(0) === '/'
            ? importOptions.path.map(path => {
                return path + id;
              })
            : id;
        },
      },

      // Simple template to prevent repeating code, e.g. @define-mixin headline $size { font-size: $size; } span { @mixin headline 32px; }
      // https://github.com/postcss/postcss-mixins
      'postcss-mixins': { mixins: mixins(variables) },

      // W3C CSS Custom Properties for cascading variables, e.g. --color: #f00; div { background: var(--color); }
      // https://github.com/postcss/postcss-custom-properties

      //'postcss-custom-properties': {
      //preserve: true,
      //importFrom: { customProperties: variables },
      //exportTo: [path.resolve('dist', 'variables.css')],
      //},

      // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
      // https://github.com/postcss/postcss-custom-media
      'postcss-custom-media': {
        importFrom: { customMedia: media(variables) },
      },

      // Allows you to nest one style rule inside another
      // https://github.com/postcss/postcss-nested
      'postcss-nested': {},

      // Reference an SVG file and control its attributes with CSS syntax
      // https://github.com/TrySound/postcss-inline-svg
      'postcss-inline-svg': {
        paths: [path.resolve('src'), path.resolve('node_modules')],
      },

      // Add vendor prefixes to CSS rules using values = require(caniuse.com)
      // https://github.com/postcss/autoprefixer
      autoprefixer: {},

      // A modular minifier, built on top of the PostCSS ecosystem.
      // https://github.com/cssnano/cssnano
      cssnano:
        env === 'production'
          ? {
              preset: [
                'default',
                {
                  colormin: false, // TODO: { legacy: true, }
                },
              ],
            }
          : false,
    },
  };
};
