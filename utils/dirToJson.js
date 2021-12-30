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
      return done(null, {
        name: path.basename(dir),
        type: 'folder',
        children: results,
        path: getPath(dir),
      });

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
              done(null, results);
          });
        } else {
          const fileInfo = {};
          const stats = fs.statSync(file);
          fileInfo.size = stats.size;
          fileInfo.extension = stats.extname;
          results.push({
            type: 'file',
            path: getPath(file),
            name: path.basename(file),
            fileInfo
          });
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};

module.exports = promisify(dirToJson);

function getPath(absolutePath) {
  const start = absolutePath.lastIndexOf("cloud") + 6;
  return absolutePath.slice(start);
}
