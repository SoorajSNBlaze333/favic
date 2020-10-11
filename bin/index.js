#!/usr/bin/env node --no-warnings

const fsp = require('fs').promises;
const path = require("path");
const { program } = require('commander');

program.version('0.0.1');

program
  .option('-p, --path <path>')
  // .option('-a, --android')
  // .option('-i, --ios');
 
program.parse(process.argv);

const imagePath = program.path;
const { android, ios } = program;
const currentDir = process.cwd();
const dir = currentDir + '/favicons';

const createDirectory = () => fsp.mkdir(dir, { recursive: true });
const readImage = () => fsp.readFile(imagePath);
const writeImage = (fileName, fileType, data) => fsp.writeFile(dir+"/"+fileName+fileType, data, 'base64')

console.log("Favic started!")
if (imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const fileType = path.extname(imagePath);

  return createDirectory()
  .then(data => readImage())
  .then(data => writeImage(fileName, fileType, data))
  .catch(err => console.log(err))
} else {
  console.log("Please provide the path to your Image");
  return;
}