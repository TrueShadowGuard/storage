const path = require("path");
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const cors = require("cors");
const multer  = require('multer');

const upload = multer();

const dirToJson = require("./utils/dirToJson");

const getCloudDir = () => dirToJson(path.join(__dirname, "cloud"));
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/structure", async (req, res) => {
  res.json(await getCloudDir());
});

/**
 * body form-data:
 * {
 *   type: "file" | "folder",
 *   name: "string"
 *   path: string",
 *   file?: "string"
 * }
 */
app.post("/create", upload.array("file"), async (req, res) => {
  try {
    const type = req.body.type;
    const name = req.body.name || (Math.random()*1000000000).toFixed(0);
    if(type === "folder") {
      const absolutePath = path.join(__dirname, "cloud", req.body.path, name);
      await fs.mkdir(absolutePath);
      res.status(200).end();
    } else if(type === "file") {
      const absolutePath = path.join(__dirname, "cloud", req.body.path, name);
      await fs.writeFile(absolutePath, req.files[0].buffer);
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
 *   path: string
 * }
 */
app.post("/delete-node", async (req,res) => {
  try {
    const absolutePath = path.join(__dirname, "cloud", req.body.path);
    const stats = await fs.stat(absolutePath);
    if(stats.isFile()){
      await fs.unlink(absolutePath);
    } else {
      await fs.rmdir(absolutePath, {recursive: true});
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
 *   path: string
 * }
 */
app.get("/download-node", async (req,res) => {
  try {
    const absolutePath = path.join(__dirname, "cloud", req.query.path);
    res.download(absolutePath);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.use(express.static(path.join(__dirname, "front", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "index.html"))
})

app.listen(port, () => console.log("listening on port " + port))
