const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('./'));

const io = socket(server);

function newConnection(socket){
	console.log(socket.id);
	
	socket.on('mousemove', mouseMove);
	socket.on('mousedown', mouseDown);
	
	function mouseMove(data){
		socket.broadcast.emit('mousemove', data);
	}
	function mouseDown(data){
		socket.broadcast.emit('mousedown', data);
	}
}
io.sockets.on('connection', newConnection);

console.log('my server is running');