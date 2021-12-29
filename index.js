const path = require("path");
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const cors = require("cors");

const dirToJson = require("./utils/dirToJson");

const getCloudDir = () => dirToJson(path.join(__dirname, "cloud"));
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get("/structure", async (req, res) => {
  res.json(await getCloudDir());
});

/**
 * body:
 * {
 *   type: "file" | "dir",
 *   name: "string"
 *   path: array<string>",
 *   file?: "string"
 * }
 */
app.post("/create", async (req, res) => {
  try {
    const type = req.body.type;
    const name = req.body.name;
    const absolutePath = path.join(__dirname, "cloud", ...req.body.path, name);
    if(type === "dir") {
      await fs.mkdir(absolutePath);
      res.status(200).end();
    } else if(type === "file") {
      await fs.open(absolutePath, "w");
      await fs.writeFile(absolutePath, req.body.file);
      await fs.close(absolutePath);
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * body:
 * {
 *   path: array<string>
 * }
 */
app.post("/delete-node", async (req,res) => {
  try {
    const absolutePath = req.body.path;
    const stats = await fs.stat(absolutePath);
    if(stats.isFile()){
      await fs.unlink(absolutePath);
    } else {
      await fs.rmdir(absolutePath)
    }
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * query:
 * {
 *   path: array<string>
 * }
 */
app.get("/download-node", async (req,res) => {
  try {
    const absolutePath = req.query.path;
    res.download(absolutePath);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.listen(port, () => console.log("listening on port " + port))
