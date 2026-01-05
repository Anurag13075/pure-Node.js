import http from 'http';


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is the routes.js file!\n');
});