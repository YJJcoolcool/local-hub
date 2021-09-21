const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

console.log(__dirname)
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded())

app.get('/messages', (req,res)=>{
    res.send("hello")
})
app.get('/ipaddress', (req,res)=>{
    res.send(results['Wi-Fi'][0])
})
app.post('/controller/post', (req,res)=>{
    //console.log(req.body)
    if (req.body["destination"]=="server"){
        io.emit("server",req.body)
    }
    res.sendStatus(200)
})
io.on('connection', (socket) => {
    console.log("A user connected.")
})
io.on('controller-connect', (socket) => {
    console.log("A user connected.")
})
var server = http.listen(80, ()=>{
    console.log("Server is listening on port "+server.address().port)
});

// IP address
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}