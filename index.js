#!/usr/bin/env node

let ftp = require("./ftp");
let fs = require("fs");
let path = require("path");

let cwd = process.cwd();
let option = require(path.resolve(cwd, "./uploadftpOption"));

let upload = async (src, dest) => {
  console.log("from: ", src);
  console.log("to: ", dest);
  let name = path.basename(src);
  if (fs.statSync(src).isDirectory()) {
    await ftp.mkdir(path.resolve(dest, name));
    let files = fs.readdirSync(src);
    for (let i = 0; i < files.length; ++i) {
      let file = files[i];
      await upload(path.resolve(src, file), path.resolve(dest, name));
    }
  } else {
    await ftp.put(src, path.resolve(dest, name));
  }
};

let uploadftp = async () => {
  if (!option.src || !option.dest) {
    console.error("you have not src/dest option in your uploadOption.js !");
    return;
  }
  let src = path.resolve(cwd, option.src);
  let dest = option.dest;
  if (!fs.existsSync(src)) {
    console.error(`you have not ${src} in your computer !`);
    return;
  }

  await ftp.connect(option);
  console.log("uploadftp connect !");

  await upload(src, dest);

  await ftp.end();
  console.log("uploadftp end !");
};

uploadftp();
