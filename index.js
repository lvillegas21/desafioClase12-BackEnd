let express= require("express")
let path=require('path')
const app =express()
const http= require('http')
const server=http.createServer(app)
const {Server}=require('socket.io')
const io = new Server(server)
const PORT = 8080

const Contenedor = require('./contenedores/contenedor')
const contenedor = new Contenedor()

let mensajes=[]

io.on('connection', socket => {
    console.log('nuevo cliente');

    socket.emit('productos', contenedor.allProducts());
    socket.on('update', producto => {
        console.log(producto)
        contenedor.save(producto)
        io.sockets.emit('productos', contenedor.allProducts());
    })

    socket.emit('mensajes',mensajes)
    socket.on('mensajeNuevo',function(data){
        mensajes.push(data)
        io.sockets.emit('mensajes',mensajes)
    })

});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',express.static(path.join(__dirname,'public')))

server.listen(PORT,()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`)
})
