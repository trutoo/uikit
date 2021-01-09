const lazypipe = require('lazypipe');
const gulpInsert = require('gulp-insert');

const { transform } = require('../utils/templating');

const LICENSE = `/**
 * @license {{NAME}} v{{VERSION}}
 * (c) 2019-{{YEAR}} Trutoo AB. https://trutoo.com/
 * License: GPL-3.0
 */\n
`;

module.exports.license = () => {
  return transform(LICENSE);
};

module.exports.licensePipeline = lazypipe().pipe(gulpInsert.prepend, module.exports.license());
