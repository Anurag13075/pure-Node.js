import os from "node:os";  // imported is module from node.js

function monitor() {
  setTimeout(() => {
    const newcpus = os.cpus(); // it is a method that provides information about each CPU/core installed.
    const oldcpus = os.cpus();
    const usage = newcpus.map((cpu, i) => { // looping through it 
      return {
        core: i,
        usage: calculateCpus(oldcpus[i], newcpus[i]) + "%",
        
        log:console.log(usage);
      };
    });



    


    
    console.clear();
    console.table(usage);
    console.log('new usage')
    console.log(`Total memory is  the ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)}GB`);

    const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);
    console.log(`Used memory is ${usedMemory.toFixed(2)}GB`);
  }, 1000);

  function calculateCpus(oldcpus, newcpus) {
    const oldvalue = Object.values(oldcpus.times).reduce((a, b) => a + b);
    const newvalue = Object.values(newcpus.times).reduce((a, b) => a + b);
    const idle = oldcpus.times.idle - newcpus.times.idle;
    const total = newvalue - oldvalue;
    const used = total - idle;
    if (typeof used == NaN) {
      return "convert it to a number ";
    } else {
      console.log("Already a number");
    }
    return Number((100 * used) / total).toFixed(1);
  }
}

function calcucatememory(){
 try {
   const totalmem = os.totalmem()*(1024*1024*1024);

   const freemem = os.freemem()*(1024*1024*1024);
   const usedmem = totalmem - freemem;
   const usedmempercentage = (usedmem/totalmem)*100;
   if(typeof usedmempercentage == NaN){
    return "convert it to a number ";
   }
   
   
   
    usedmempercentage.toFixed(2);
   console.table(usedmempercentage);

 
 } catch (error) {
  console.log(error);

  
 }
}

calcucatememory();

setInterval(monitor, 1000);
