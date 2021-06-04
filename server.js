const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view  engine', 'ejs')
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('hello app');
});

app.get('/:room', (req, res) => {
    res.render("room.ejs", {roomId: req.params.room});
})


io.on("connection", (socket) => {
    console.log('user connect => ' + socket.id)
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId); // on join le user à la room
        console.log('room id = '+ roomId)
        socket.to(roomId).emit("user-connect", userId); // une fois que l'utilisateur rejoint la room on notifie tous les utilisateurs de la room
    })
})

server.listen(3000);
