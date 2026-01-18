// In this module you will learn about all the filesystem in node js
// in node js there are some methods in which you can work with  fies like create , read , delete them

// fs => fs is the built in module in node.js which give you methods for performing file operation in node.js

//importing fs from node.js
// * => star is for importing everything in fs module.

import * as fs from "node:fs/promises"; //promise for asynchronous operations ;
import path from "node:path";

//creating a file;

async function createfile(pathname) {
  try {
    await fs.writeFile(pathname, "Created a new file");
  } catch (error) {
    console.log(error);
  }
}






// reading a file
async function readfile(pathname, content = "") {
  try {
    await fs.readFile(pathname, content);
    console.log("read in a file");
  } catch (error) {
    console.log(error);
  }
}

// appending in a existing file
async function appendinfile(pathname, content) {
  try {
    await fs.appendFile(pathname, content);
    console.log("appended in a file");
  } catch (error) {
    console.log(error);
  }
}
// create a directory(folder)

async function createdir(pathname) {
  try {
    await fs.mkdir(pathname, { recursive: true });
    console.log("created a directory");
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile(pathname) {
  try {
    await fs.unlink(pathname, { recursive: true });
    console.log("directory deleted");
  } catch (error) {
    console.log(error);
  }
}

//readFile => A built in method in fs module for reading in files .
//mkdir => A built in method in fs module for creating directories.
// appendFile => A built in method in fs moule for appending content in a file.
//writeFile => A built in method in fs module for writing in a file.
//unlink => unlink is a method in fs for deleting any directory .
//{recursive:true} =>It is used for nested directories if the directory contains nesting it will also work for the nested directories think it like if i have a directory like src/image/logo and recursive true in my method then it will recursively delete things or create according to the method .

//project idea => Using these methods create a cli programs in which there are many inputs like create a file , read a file , delete a file , or folders according to the user choice it will do the operation of files it will be a very good program for mastering file system in node.js and hepls you become  a good programmer

// you will learn synchronous and asynchronous concepts in this program switch case , if else , functions and file methods it will be a good program for your resume thanks stay updated for more like this💕✅🚀.
// you can know about how the thread works in javasript 
//filesystems are a important part of fs in node.js 







