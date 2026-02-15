import os from 'node:os'
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
 

 function givename(name){
    if(name.length<5) return "Name is too short"
    console.log(`Hello ${name}, ${greetings}`)
 }

 givename("Anurag")