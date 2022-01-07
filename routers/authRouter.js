const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../db/collections/UserCollection");
const getNextCounterValue = require("../db/counters");
const path = require("path");
const fs = require("fs");
const authRouter = express();
const {JWT_SECRET} = require("../config.json");


authRouter.post("/login", (req, res) => {
  try {
    const {login, password} = req.body;
    const candidate = User.find(obj => obj.login === login);
    console.log('login')
    if (!candidate || candidate.data.password !== password) {
      return res.status(400).json({text: "Login or password is incorrect"});
    }

    const token = jwt.sign({login: candidate.data.login}, JWT_SECRET, {expiresIn: "1h"});

    res.cookie("token", token);

    res.status(200).json({token, userId: candidate.data._id})
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

authRouter.post("/register", (req, res) => {
  try {
    const {login, password} = req.body;
    const candidate = User.find(obj => obj.login === login);
    console.log('register')
    if (candidate) {
      return res.status(400).json({text: "User already exists"});
    }

    const id = getNextCounterValue("lastUserId");
    User.create({login, password, _id: id}).save();

    const userCloudPath = path.join(__dirname, "..", "cloud", String(id));

    fs.mkdirSync(userCloudPath);

    res.status(200).json({userId: id, text: "Successfully registered"});
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

module.exports = authRouter;

