// It is about the stream module in node js .
//stream module is used to handle streaming data in node js .
//stream module is used to read or write data piece by piece instead of all at once .
//stream module is very useful for handling large files or data .
import {Readble } from 'stream';
import { Writable } from 'stream';
import fs, { read } from  'fs';



//creating a readble stream
const raddblestream = new Readble({
    const file =  fs.createReadStream(addEventListener.txt);
    read(size){
        const chunk = file.read(size);
        if(chunk){
            this.push(chunk);
            console.log(file);

        } else {
            this.push(null);

        }
    }
   
    
})
readblestream.on('data',(chunk)=>{
    console.log(`received ${chunk.length} bytes of data`);
});

readblestream.on('end',()=>{
    console.log('no more data');
});
readblestream(file);
