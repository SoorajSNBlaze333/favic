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

console.log("Favic started!")
if (imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const fileType = path.extname(imagePath);
  console.log("Path to the image", imagePath);
  console.log("File Name", fileName);
  console.log("File Type", fileType);

  fs.readFile(imagePath, function(err, data) {
    if (err) return console.log(err);
    fs.writeFileSync(currentDir+'/favicons/'+fileName+fileType, data, 'base64', function(err, data) {
      if (err) return console.log(err);
      return console.log("File created under ./favicons")
    })
  })
} else {
  console.log("Please provide the path to your Image");
  return;
}