module.exports = function rolesMiddleware(req, res, next) {

  const role = req.user.data.role;
  const requestUserId = +req.params.userId;
  const userId = req.user.data._id;

  console.log('user', req.user)
  switch (role) {
    case "admin":
      next();
      break;
    case "user":
      if (requestUserId === userId) {
        next();
      } else {
        res.status(403).end();
      }
      break;
    default:
      console.error("Invalid role")
      res.status(500).end();
  }
}
