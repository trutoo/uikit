const fs = require('fs');
const path = require('path');
const lazypipe = require('lazypipe');

const gulpSvgo = require('gulp-svgo');
const gulpSprite = require('gulp-svg-sprite');

module.exports.svgPipeline = lazypipe().pipe(() => {
  return fs.existsSync(path.resolve('src', 'metadata.yaml'))
    ? gulpSprite({
        shape: {
          dest: 'icons',
          id: { generator: name => `icon-${path.basename(name, '.svg')}` },
          meta: path.resolve('src', 'metadata.yaml'),
          spacing: {
            padding: 2,
          },
          dimension: {
            maxWidth: 60,
            maxHeight: 60,
          },
        },
        mode: {
          symbol: {
            dest: '',
            prefix: '.%s',
            sprite: 'symbols',
            example: {
              dest: 'example.symbols.html',
            },
          },
        },
      })
    : gulpSvgo();
});
