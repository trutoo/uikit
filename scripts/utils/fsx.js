const fs = require('fs');
const path = require('path');

module.exports.walkFiles = (dir, cb) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) module.exports.walkFiles(filePath, cb);
        else cb(filePath);
      });
    });
  });
};
