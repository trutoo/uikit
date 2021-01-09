const path = require('path');

//------------------------------------------------------------------------------------
// TEMPLATE ENGINE
//------------------------------------------------------------------------------------

module.exports.transform = text => {
  const today = new Date();
  const metadata = require(path.join(process.cwd(), 'package.json'));
  return text.replace(/\{\{(\w+?)\}\}/g, (_, match) => {
    switch (match) {
      case 'NAME':
        return metadata.name;
      case 'VERSION':
        return metadata.version;
      case 'YEAR':
        return today.getFullYear();
    }
  });
};
