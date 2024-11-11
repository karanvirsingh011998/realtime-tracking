const express = require('express')
const app = express()

const http= require("http")
const path= require("path")
const socketio= require("socket.io")

const server = http.createServer(app)

const io = socketio(server)
io.on("connection", (socket)=>{
    socket.on('send-location',(data)=>{
        io.emit('receive-location', {id:socket.id,...data})
    })
    socket.on('disconnect',()=>{
        io.emit('user-diconnect', socket.id)
    })
    console.log('socket=======>>>>>>>')
})
//ejs
app.set('view engine', "ejs")

// Set up MIME types
app.use(require('serve-static')(__dirname, { setHeaders: setCustomHeaders }));

function setCustomHeaders(res, path, stat, type, encoding) {
  if (path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
}

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000)