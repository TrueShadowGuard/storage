module.exports = function allowHeadersInBrowser(...headers) {
  return (req, res, next) => {
    res.set('Access-Control-Expose-Headers', headers);
    next();
  }
}
