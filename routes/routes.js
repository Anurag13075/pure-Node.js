import http from 'http';



const server = http.createServer((req, res) => { // creation of an HTTP server
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is the routes.js file!\n');
});


http.get("about", (res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain' })
    res.end("hey about")
})
console.log("Server is starting...");









const PORT  = 3000;
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})