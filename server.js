var net = require('net');
var io= require('socket.io').listen(8012);
var fs=require('fs');
var express=require('express');
var app = express();
var path=require('path');
app.listen(8888);
// 设置静态服务中间件
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
var socketServer= net.createServer().listen(8124,function(){
    console.log('socketServer is running on '+ 8124);
});

//硬件通讯
socketServer.on('connection',function (socket) {
    socket.on('data',function(result){
        console.log(result.toString()[2]);
        /*var str=result.toString();0
        var text='';
        if(str=='UP1'){
            text = '请求换药';
        }
        else if(str =="UP2"){
            text = '来人帮忙';
        }
        else if(str == 'UP3'){
            text = '紧急求助';
        }*/
        // io.emit('recvTxt',text);
    });
    socket.on('end',function(){
        console.log("连接断开")
    });
})

//前端通讯
io.sockets.on('connection',function(socket){
    socket.on('sendTxt',function(data){
        console.log(data);
    })


});
