const express = require ('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/font-awesome', express.static(__dirname + '/font-awesome'));
app.use('/',express.static(__dirname + '/cliente'));

io.on('connection', (socket) => {
   socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/index.html`)
})

server.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})