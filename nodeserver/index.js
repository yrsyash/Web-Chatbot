//node server which will handle handle socket io connections
const io = require('socket.io')(8000)
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', nam => {
        console.log("New user", nam);
        users[socket.id] = nam;
        socket.broadcast.emit('user-joined', nam);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, nam: users[socket.id] })
    })
    // socket.on('disconnect',message1=>{
    //     socket.broadcast.emit('leave ',users[socket.id]);
    //     delete users[socket.id];
    // });
});
