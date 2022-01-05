const path = require("path");
module.exports = function validatePath(p1, p2) {
  const normalizedPath = path.normalize(p1);
  if(!normalizedPath.startsWith(p2)) throw new Error("Invalid path");
}
