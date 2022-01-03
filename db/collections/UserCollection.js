const Schema = require('../db').Schema

const UserSchema = {
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

const User = Schema("users", UserSchema);

module.exports = User;
