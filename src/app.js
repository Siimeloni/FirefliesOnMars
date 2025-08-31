const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// certificate config
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "private/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "private/cert.pem")),
};

// app config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("Connection!");
  res.render("index");
});

const server = https.createServer(sslOptions, app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
