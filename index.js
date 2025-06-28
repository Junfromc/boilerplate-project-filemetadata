"use strict";
var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const uploadDest = "./public/uploads/";
const upload = multer({ dest: uploadDest });
var app = express();
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no file uploaded" });
  }
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: `${req.file.size} bytes`,
  };
  console.log('req.file:', req.file);
  fs.rm(req.file.path, {force: true},(err)=>{
    if (err) throw err;
    console.log('Temporary file deleted successfully');
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
