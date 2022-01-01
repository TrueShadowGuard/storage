const express = require('express');
const path = require("path");
const dirToJson = require("../utils/dirToJson");
const fs = require("fs").promises;
const crudRouter = express();
const zip = require("zip-a-folder");

const getCloudDir = () => dirToJson(path.join(__dirname, '..', "cloud"));
const base64ToBuffer = base64 => Buffer.from(base64.split(',')[1], "base64");
const cloudPath = path.join(__dirname, '..', "cloud");

crudRouter.get("/structure", async (req, res) => {
  res.json(await getCloudDir());
});

/**
 * {
 *   type: "file" | "folder",
 *   name: "string"
 *   path: string",
 *   file?: "string"
 * }
 */
crudRouter.post("/create", async (req, res) => {
  try {
    const type = req.body.type;
    const name = req.body.name || (Math.random()*1000000000).toFixed(0);
    if(type === "folder") {
      const absolutePath = path.join(cloudPath, req.body.path, name);
      await fs.mkdir(absolutePath);
      res.status(200).end();
    } else if(type === "file") {
      const buffer = base64ToBuffer(req.body.file);
      const absolutePath = path.join(cloudPath, req.body.path, name);
      await fs.writeFile(absolutePath, buffer);
      res.status(200).end();
    } else {
      console.error("undefined type")
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * {
 *   path: string
 * }
 */
crudRouter.post("/delete-node", async (req, res) => {
  try {
    const absolutePath = path.join(cloudPath, req.body.path);
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
 * {
 *   path: string
 * }
 */
crudRouter.get("/download-node", async (req, res) => {
  try {
    const absolutePath = path.join(cloudPath, req.query.path);
    const isFile = (await fs.lstat(absolutePath)).isFile();
    if(isFile) {
      res.download(absolutePath);
    } else {
      res.setHeader("Content-Disposition", `attachment; filename=${path.basename(absolutePath)}.zip`);
      zip.zip(absolutePath, undefined, {customWriteStream: res})
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

crudRouter.put("/rename-node", async (req, res) => {
  try {
    const oldPath = path.join(cloudPath, req.body.path);
    const newPath = path.join(cloudPath, req.body.path, '..',  req.body.name);
    await fs.rename(oldPath, newPath);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
})


module.exports = crudRouter;
