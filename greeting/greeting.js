import os from 'node:os'
import fs from 'node:fs'
console.log(os.cpus())


const name   = "Anurag";
const hour  =  Date.now.toString();
console.log(hour)
console.log(name);



function greeting(hour){
    if(hour<4|| hour>=19) return "Good night"
    if(hour>9)return "Good Morning"
    if(hour<16) return "Good Afternoon"
    return "Good evening"
}
 const greetings  = greeting(hour);


function findfilepath(filename){
    const path = process.cwd();
    const files = fs.readdirSync(path);
    for(const file of files){
        if(file === filename){
            return `File ${filename} found at ${path}`;
        }    }
    return `File ${filename} not found in ${path}`;
}


findfilepath("greeting.js")

 function givename(name){
    if(name.length<5) return "Name is too short"
    if(name.length>20) return "Name is too long"
    console.log(`Hello ${name}, ${greetings}`)
 }
 function sayHello(name){
    
    givename(name)
 }

 givename("Anurag")
 sayHello("Anurag")