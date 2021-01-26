var express=require("express");
var app=express();
var port=process.env.PORT || 3000;
var http=require("http").createServer(app);
var path=require('path');
http.listen(port,function(){
   console.log(`Listening on port ${port}`) 
});
app.use(express.static(path.join(__dirname,'public')))
app.get("/",function(req,resp){
    resp.sendFile(__dirname+'/index.html');
})
//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    });
})

