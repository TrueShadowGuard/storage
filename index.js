const path = require("path");
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const cors = require("cors");
const multer  = require('multer');

const upload = multer();

const crudRouter = require("./routers/crudRouter");
const frontRouter = require("./routers/frontRouter");
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());

app.use(crudRouter);
app.use(frontRouter);

app.listen(port, () => console.log("listening on port " + port));
