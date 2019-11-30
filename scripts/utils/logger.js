const COLORS = {
  RESET: '\x1b[0m',
  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
};

const LEVELS = {
  LOG: 0,
  INFO: 1,
  DEBUG: 2,
  WARN: 3,
  ERROR: 4,
};

const log = (message, level, color) => {
  switch (level) {
    default:
    case LEVELS.LOG:
      return console.log(color || COLORS.CYAN, message, COLORS.RESET);
    case LEVELS.INFO:
      return console.info(color || COLORS.BLUE, message, COLORS.RESET);
    case LEVELS.DEBUG:
      return console.debug(color || COLORS.GREEN, message, COLORS.RESET);
    case LEVELS.WARN:
      return console.warn(color || COLORS.YELLOW, message, COLORS.RESET);
    case LEVELS.ERROR:
      return console.error(color || COLORS.RED, message, COLORS.RESET);
  }
};

module.exports = {
  COLORS,
  LEVELS,
  log,
};
