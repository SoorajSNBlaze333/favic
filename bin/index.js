#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const { program } = require('commander');

program.version('0.0.1');

program
  .option('-p, --path <path>')
  .option('-a, --android')
  .option('-i, --ios');
 
program.parse(process.argv);

const imagePath = program.path;
const { android, ios } = program;
const currentDir = process.cwd();
const dir = currentDir + '/favicons';

console.log("Favic started!")
if (imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const fileType = path.extname(imagePath);

  console.log("Creating favicons directory...")
  fs.mkdir(dir, { recursive: true }, function(err, data) {
    if (err) return console.log(err);
    console.log("Reading Image...")
    fs.readFile(imagePath, function(err, data) {
      if (err) return console.log(err);
      fs.writeFileSync(dir+"/"+fileName+fileType, data, 'base64', function(err, data) {
        if (err) return console.log(err);
      })
      return console.log("File created under "+dir)
    })
  })



} else {
  console.log("Please provide the path to your Image");
  return;
}