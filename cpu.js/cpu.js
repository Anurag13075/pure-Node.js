import os from "node:os";

function monitor() {
  setTimeout(() => {
    const newcpus = os.cpus();
    const oldcpus = os.cpus();
    const usage = newcpus.map((cpu, i) => {
      return {
        core: i,
        usage: calculateCpus(oldcpus[i], newcpus[i]) + "%",
      };
    });
    console.clear();
    console.table(usage);

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
setInterval(monitor, 1000);
