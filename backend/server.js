const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const models = require("./models/models");
const sequelize = require("./db");
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
const path = require('path')
app.use(express.static(path.resolve(__dirname, 'static')))
const fileUpload = require("express-fileupload");
app.use(fileUpload({}));

const router = require("./routers/index");
app.use("/api", router);
