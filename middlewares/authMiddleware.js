const jwt = require("jsonwebtoken");
const User = require("../db/collections/UserCollection");
const {JWT_SECRET} = require("../config.json")

module.exports = function authMiddleware(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const payload = jwt.verify(token, JWT_SECRET);
    if(payload) {
      req.user = User.find(obj => payload.login === obj.login);
      console.log("Auth middleware", req.user.data)
      req.userId = req.user.data.id;
      next();
    } else {
      res.status(401).end();
    }

  } catch (e) {
    console.error("Auth middleware error");
    res.status(401).end();
  }
}
