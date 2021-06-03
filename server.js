const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
var path = require('path');
//entegar a pagina
app.use(express.static(path.join(__dirname, 'Public/')));
//area do socket io

//Mostrar nova conexão e contador de usuarios
var userCounter = 0

io.on('connection', (socket) => {
    userCounter = userCounter +1
    io.emit('usersOnline', userCounter, socket.id)

    socket.on('disconnect', (socket) => {
    userCounter = userCounter -1
    io.emit('usersOnline', userCounter)
    })
})


//evento da mensagem

io.on('connection', (socket) => {
    socket.on('messageEvent', (msg) => {
        msg.userID = socket.id
        io.emit('messageEvent', msg)
    })
})

//dizer que esta "ouvindo"
http.listen(3000, () => {
    console.log('Server On')
})