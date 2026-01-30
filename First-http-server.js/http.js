//Creating of first http server in node.js .


import http from 'http'; // http is a built-in module in Node.js to create web servers


// Create an HTTP server by createServer method 

// req => req is a method which is used to get request from client.
// res => res is a method which is used to send response to client .


const server   = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World\n');
})

http.get('/', (req,res)=>{
    res.end('home route')
})


















const port  = 3000;
//now server is listening on port 3000 go to your browser and go to localhost 3000 to see things in action .

// listen => listen is a method to listen on specific port .
server.listen(port, `server is listening on port${port}` );
