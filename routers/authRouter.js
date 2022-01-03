const express = require('express');
const jwt = require('jsonwebtoken');
const db = require("../db/db");
const User = require("../db/collections/UserCollection");
const Counter = require("../db/collections/CounterCollection");
const getNextCounterValue = require("../db/counters");
const path = require("path");
const fs = require("fs");
const authRouter = express();
const {JWT_SECRET} = require("../config.json");


authRouter.post("/login", (req, res) => {
  try {
    const {login, password} = req.body;
    const candidate = User.find(obj => obj.login === login);
    console.log('login', candidate.data, login, password)
    if (!candidate || candidate.data.password !== password) {
      return res.status(400).end();
    }

    const token = jwt.sign({login: candidate.data.login}, JWT_SECRET, {expiresIn: "1h"});

    res.cookie("token", token);

    res.status(200).json({token, userId: candidate.data._id})
  } catch (e) {
    console.error(e);
  }
});

authRouter.post("/register", (req, res) => {
  try {
    const {login, password} = req.body;
    const candidate = User.find(obj => obj.login === login);
    console.log('candidate', candidate.data)
    if (candidate) {
      return res.status(400).end();
    }

    const id = getNextCounterValue("lastUserId");
    User.create({login, password, _id: id}).save();

    const userCloudPath = path.join(__dirname, "..", "cloud", String(id));

    console.log('userCloudPath', userCloudPath);

    fs.mkdirSync(userCloudPath);

    res.status(200).json({id});
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

module.exports = authRouter;

