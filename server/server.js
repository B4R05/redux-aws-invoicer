const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/router");

// DB Setup
mongoose.connect(
  "mongodb://gavish1:nimbla1@ds045608.mlab.com:45608/nimbla",
  { useNewUrlParser: true }
);

//App Setup
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static("public"));

router(app);

//Server Setup
const port = 8080;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on: ", port);

module.exports = app; // for testing
