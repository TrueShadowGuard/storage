const path = require("path");
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const crudRouter = require("./routers/crudRouter");
const frontRouter = require("./routers/frontRouter");
const authRouter = require("./routers/authRouter");
const User = require("./db/collections/UserCollection");

const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());
app.use(cors());


app.use(authRouter)
app.use("/user", crudRouter);
app.use(frontRouter);

app.listen(port, () => console.log("listening on port " + port));
