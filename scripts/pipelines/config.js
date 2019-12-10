const path = require('path');
const lazypipe = require('lazypipe');

const gulp = require('gulp');
const gulpIgnore = require('gulp-ignore');

const DIST_DIR = path.resolve(process.cwd(), 'dist', 'config');

module.exports.configPipeline = lazypipe()
  .pipe(gulp.dest, DIST_DIR)
  .pipe(gulpIgnore.exclude, true);
