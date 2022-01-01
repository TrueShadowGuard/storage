const express = require('express');
const path = require("path");

const frontRouter = express();

frontRouter.use(express.static(path.join(__dirname, "..", "front", "build")));

frontRouter.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front", "build", "index.html"))
});

module.exports = frontRouter;
