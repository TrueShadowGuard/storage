const Schema = require('../db').Schema

const UserSchema = {
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
};

const User = Schema("users", UserSchema);

module.exports = User;
