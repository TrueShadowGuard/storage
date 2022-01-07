var fs = require('fs');
var path = require('path');
var {promisify} = require('util');

var dirToJson = function (dir, done) {
  var results = [];

  fs.readdir(dir, function (err, list) {
    if (err)
      return done(err);

    var pending = list.length;

    if (!pending)
      return done(null, results.sort(sortByTypeAndName));

    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          dirToJson(file, function (err, res) {
            results.push({
              name: path.basename(file),
              path: getPath(file),
              type: 'folder',
              children: res
            });
            if (!--pending)
              done(null, results.sort(sortByTypeAndName));
          });
        } else {
          results.push({
            type: 'file',
            path: getPath(file),
            name: path.basename(file),
            fileInfo: stat
          });
          if (!--pending)
            done(null, results.sort(sortByTypeAndName));
        }
      });
    });
  });
};

module.exports = promisify(dirToJson);

function getPath(absolutePath) {
  const match = absolutePath.match(/cloud[\/\\]\d+[\/\\]/)[0];
  const index = absolutePath.indexOf(match);
  return absolutePath.slice(match.length + index);
}

function sortByTypeAndName(o1, o2) {
  return (
    o1.type > o2.type ? -1 :
    o1.type < o2.type ? 1 :
    o1.name > o2.name ? 1 : -1
  )
}
