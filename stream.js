// It is about the stream module in node js .
//stream module is used to handle streaming data in node js .
//stream module is used to read or write data piece by piece instead of all at once .
//stream module is very useful for handling large files or data .
import {Readble } from 'stream';
import { Writable } from 'stream';
import fs, { read } from  'fs';
import { EventEmitter } from 'stream';


//creating a readble stream
const raddblestream = new Readble({ //  creating a readble stream 
    const file =  fs.createReadStream(addEventListener.txt); // creating a readble stream from a file
    read(size){ // read method is called when data is to be read from the stream
        const chunk = file.read(size);
        if(chunk){
            this.push(chunk);
            console.log(file);

        } else {
            this.push(null);

        }
    }
   
    // creating an event emitter
    
})
readblestream.on('data',(chunk)=>{  // data event is emitted when data is available to be read from the stream
    console.log(`received ${chunk.length} bytes of data`);
});

readblestream.on('end',()=>{
    console.log('no more data');
});
readblestream(file);

 const emmiter  = new EventEmitter(); // entity that emits events
 emmiter.on('message', (data)=>{ // reaching the event
    console.log(`message received: ${data}`); //logging the data 
 })




 