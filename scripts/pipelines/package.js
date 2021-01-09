const through = require('through2');

const lazypipe = require('lazypipe');

module.exports.packagePipe = () => {
  // return a `through2` stream for `pipe()` compatibility at the node level
  return through.obj((file, encoding, callback) => {
    const transformedFile = file.clone();

    const metadata = JSON.parse(transformedFile.contents.toString());
    delete metadata.scripts;
    delete metadata.devDepencencies;
    delete metadata.optionalDependencies;

    transformedFile.contents = new Buffer(JSON.stringify(metadata, null, 2));

    callback(null, transformedFile);
  });
};

module.exports.packagePipeline = lazypipe().pipe(module.exports.packagePipe);
