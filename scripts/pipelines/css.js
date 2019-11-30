const lazypipe = require('lazypipe');

const gulpPostcss = require('gulp-postcss');
const gulpStylelint = require('gulp-stylelint');

module.exports.cssPipeline = lazypipe()
  .pipe(
    gulpStylelint,
    {
      reporters: [{ formatter: 'verbose', console: true }],
    },
  )
  .pipe(gulpPostcss);
