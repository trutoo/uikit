const path = require('path');
const clean = require('./clean.js');

/* GULP */
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpPrint = require('gulp-print').default;

/* UTILS */
const logger = require('./utils/logger.js');

/* PIPELINES */
//const { packagePipeline } = require('./pipelines/package');
const { configPipeline } = require('./pipelines/config');
const { tsxPipeline } = require('./pipelines/tsx');
const { cssPipeline } = require('./pipelines/css');
const { svgPipeline } = require('./pipelines/svg');
const { licensePipeline } = require('./pipelines/license');

const DIST_DIR = path.resolve(process.cwd(), 'dist');

module.exports.build = () => {
  // Change process to production mode
  process.env.NODE_ENV = 'production';

  logger.log(`=== Building package and prepending license banner`);
  return new Promise((resolve, reject) => {
    gulp
      .src(['postcss.*.js', 'src/**/*', '!src/**/*.stories.*'])
      .pipe(gulpPrint())
      .pipe(gulpIf(/postcss\.(\w+)\.js$/, configPipeline().on('error', reject)))
      .pipe(gulpIf(/\.tsx?$/, tsxPipeline().on('error', reject)))
      .pipe(gulpIf(/\.css$/, cssPipeline().on('error', reject)))
      .pipe(gulpIf(/\.svg$/, svgPipeline().on('error', reject)))
      .pipe(gulpIf(/\.(js|css|d\.ts?)$/, licensePipeline().on('error', reject)))
      .pipe(gulp.dest(DIST_DIR))
      .on('end', resolve);
  })
    .then(() => {
      logger.log(`=== Successfully built package`, logger.LEVELS.LOG, logger.COLORS.GREEN);
    })
    .catch(err => {
      logger.log(err, logger.LEVELS.ERROR);
      logger.log(`=== Failed built package`, logger.LEVELS.ERROR);
    });
};

if (require.main === module) {
  clean().then(() => {
    module.exports.build();
  });
}
