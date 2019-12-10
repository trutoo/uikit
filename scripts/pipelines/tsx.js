const path = require('path');

const lazypipe = require('lazypipe');
const Vinyl = require('vinyl');
const gulpIf = require('gulp-if');
const gulpTS = require('gulp-typescript');
const gulpESLint = require('gulp-eslint');
const gulpSourcemaps = require('gulp-sourcemaps');

const through = require('through2');

const tsProject = gulpTS.createProject(path.join(process.cwd(), 'tsconfig.json'));
tsProject.options.declaration = true; // Enable declarations for build
tsProject.config.exclude.push('**/*.spec.ts'); // Remove spec from distribution'

const SRC_DIR = path.resolve(process.cwd(), 'src');
const WARNING = `
/**
 * This is a generated document, do not edit directly instead us npm command!
 * $ npm run gen:exports
 */
`;

module.exports.exportsPipe = () => {
  const exportExp = /^export( default)?(?: abstract)?(?: [\w]+)? (\w+)?/gm;
  const output = new Vinyl({
    base: SRC_DIR,
    path: path.join(SRC_DIR, 'index.ts'),
  });
  const types = new Set();
  const categories = new Map();

  const formatType = filePath => {
    let exportPath = path.format({
      dir: path.dirname(filePath),
      name: path.basename(filePath),
    });
    exportPath = './' + path.normalize(exportPath).replace(/\\+/g, '/');
    return `/// <reference path="${exportPath}" />\n`;
  };

  const formatExports = ([filePath, fileExports]) => {
    let buffer = `export `;

    if (fileExports && fileExports.length) {
      buffer += `{ ${fileExports
        .map(entry => (entry.default ? `default as ${entry.export}` : entry.export))
        .sort()
        .join(', ')} } from `;
    } else {
      return;
      // buffer += `* from `;
    }

    let exportPath = path.format({
      dir: path.dirname(filePath),
      name: path.basename(filePath, filePath.endsWith('x') ? '.tsx' : '.ts'),
    });
    exportPath = './' + path.normalize(exportPath).replace(/\\+/g, '/');

    buffer += `'${exportPath}';`;
    return buffer;
  };

  const formatCategory = ([name, category]) => {
    const exports = Array.from(category, formatExports).join(`\n`);
    let buffer = '';
    if (exports.trim()) buffer += `\n/* ${name} */\n${exports}`;
    return buffer;
  };

  return through.obj(function(file, encoding, callback) {
    let buffer = WARNING;

    if (file.path.endsWith('.d.ts')) {
      const filePath = path.relative(SRC_DIR, file.path).replace(/\\+/g, '/');
      types.add(filePath);
    } else {
      const contents = file.contents.toString();
      const filePath = path.relative(SRC_DIR, file.path).replace(/\\+/g, '/');
      const categoryName = filePath.split('/')[0].toUpperCase();

      if (!categories.has(categoryName)) categories.set(categoryName, new Map());
      const category = categories.get(categoryName);
      const fileExports = [];

      let match = exportExp.exec(contents);
      while (match != null) {
        fileExports.push({ default: !!match[1], export: match[2] });
        match = exportExp.exec(contents);
      }
      category.set(filePath, fileExports);
    }

    //buffer += Array.from(types, formatType).join('\n') + '\n';
    buffer += Array.from(categories, formatCategory).join('\n') + '\n';

    output.contents = Buffer.from(buffer);

    this.push(output);
    callback(null, file);
  });
};

module.exports.tsxPipeline = lazypipe()
  .pipe(gulpESLint)
  .pipe(gulpSourcemaps.init)
  .pipe(module.exports.exportsPipe)
  .pipe(function() {
    return gulpIf(/\.tsx?$/, tsProject());
  })
  .pipe(gulpSourcemaps.write, '.');
