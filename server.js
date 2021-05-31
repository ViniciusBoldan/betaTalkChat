const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

//entegar a pagina
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/Public/index.html')
})

//area do socket io
var counter = 0
io.on('connection', (socket) => {
    counter = counter +1
    console.log(`Users online: ${counter}`)

    socket.on('disconnect', (socket) => {
    counter = counter -1
    console.log(`Users online: ${counter}`)
    })
})


//evento da mensagem

io.on('connection', (socket) => {
    socket.on('messageEvent', (msg) => {
        console.log(msg)
        io.emit('messageEvent', msg)
    })
})

//dizer que esta "ouvindo"
http.listen(3000, () => {
    console.log('Server On')
})