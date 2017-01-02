const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('./'));

const io = socket(server);

function newConnection(socket){
	console.log(socket.id);
	
	socket.on('mouse', mouseMessage);
	
	function mouseMessage(data){
		console.log(data);
		socket.broadcast.emit('mouse', data);
	}
}
io.sockets.on('connection', newConnection);

console.log('my server is running');