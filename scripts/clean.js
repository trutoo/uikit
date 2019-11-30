const path = require('path');
const fs = require('fs');
const del = require('del');

/* UTILS */
const logger = require('./utils/logger.js');

/* CONSTANTS */
const DIST_DIR = path.resolve(process.cwd(), 'dist');

//------------------------------------------------------------------------------------
// CLEAN
//------------------------------------------------------------------------------------

module.exports = (directory = DIST_DIR) => {
  logger.log('=== Clearing previous build');
  return del(directory, { expandDirectories: true })
    .then(deleted => {
      console.log(deleted.join('\n'));
      logger.log(`=== Successfully cleared previous build`, logger.LEVELS.LOG, logger.COLORS.GREEN);
    })
    .catch(err => {
      logger.log(err, logger.LEVELS.ERROR);
      logger.log(`=== Failed clearing previous build`, logger.LEVELS.ERROR);
    });
};
