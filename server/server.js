var ex = require('express')();
var http = require('http').createServer(ex);
var io = require('socket.io')(http);
var r = require('rethinkdb');

var rcon = undefined;
r.connect({
    host:'localhost',
    port:32769
},(err,con)=>{
    if(err){
        console.log("Error ",err)
    }
    rcon=con;
    r.db('nitifications').table('message').changes().run(rcon,(err,cursor)=>{
        if(err)throw err;
        cursor.each(function(err,row){
            if(err)throw err;
            console.log(JSON.stringify(row,null,2));
            io.emit("some",row)
        })
    })
    
    
});





io.on('connection',(socket)=>{
    console.log("a user connected ")
})

ex.get('/',(req,res)=>{
    res.send(JSON.stringify({"hello":"world"},null,2))
})

http.listen(3001,()=>{
    console.log('listening on *:3001')
})

