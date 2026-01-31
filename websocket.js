const socket  =  new WebSocket('ws://localhost:8080');


socket.addEventListener('open', function(event){
    console.log('WebSocket is open now.');
    socket.send('hwllo server')
    
})
socket.addEventListener('message', function(event){
    console.log('Message from server ', event.data);
})