'use strict';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
/*
const server = app.listen(3000,()=>{
    console.log("listening to request on port");
});
*/
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

//app.use(express.static('public'));

// socket setup
//const io = socket(server);

//kun yhteys tapahtuu
io.on('connection', (socket)=>{
    console.log('made socket connection');

    socket.on('chat message',(msg)=>{
        console.log(`message: ${msg}`);
        io.emit('chat message',msg);
    });

    socket.broadcast.emit('hi');

    //sitku käyttäjä lähtee sivulta
    socket.on('disconnect',()=>{
       console.log('user disconnected');
    });
});

http.listen(3000,()=>{
    console.log("listening to request on port");
});