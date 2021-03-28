const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    io.emit('user', (socket.id))
})


let counter = 0
io.on('connection', (socket) => {
    counter++
    io.emit('usersIn', (`Connected: ${counter}`))
    console.log('User Connected')

    socket.on('disconnect', (socket) => {
        counter--
        io.emit('usersIn', (`Connected: ${counter}`))
        console.log('User Disconnected')
    })
})


io.on('connection', (socket) => {
    socket.on('messageEvent', (msg) => {
        io.emit('messageEvent', msg)
    })
})

http.listen(3000, () => {
    console.log('Server On')
})