let express = require('express');
let path = require('path');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

console.log('Server is running on: localhost:3000');

let rooms = []; //keeps all rooms

io.on('connection',function(socket){

	console.log("Someone has connected: "+socket.id);

	function update(room, arr){ 	//updates users in room
		io.sockets.in(room).emit('send',arr);
	}

	function findId(roomCode) {		//finds index of room based on rooom name
		for (let i = 0; i < rooms.length; i++) {
			if(rooms[i].Code == roomCode){
				return i;
			}
		}
		return -1;
	}

	function generateRoomId() {
	 	let text = "";
	  	let pismena = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	  	for (let i = 0; i < 4; i++)
	    	text += pismena.charAt(Math.floor(Math.random() * pismena.length));
		return text;
	}

	//Create room -> destroy room
	socket.on('createRoom',function () {
		let code = generateRoomId();
		let newRoom = new Room(code,"Host", socket);
		socket.join(code);
		rooms.push(newRoom);
		update(code, newRoom.People);
		socket.emit("code",code);
		console.log('Crreating room');
	});

	function destroyRoom(code) {
		socket.broadcast.to(code).emit("err","Disconnected!");
		let roomId = findId(code);
		rooms.splice(roomId,1);
	};
	//Join room -> Leave room
	socket.on('joinRoom',function (data) {
		if (rooms.length == 0) {
			socket.emit('err',"No games are running!");
		}else{
			let id = findId(data.code);
			if (id == -1) {
				socket.emit('err',"Room doesn't exist!");
			}else{
				let foundRoom = rooms[id];
				let user = {
					name: data.name,
					id: socket.id
				}
				foundRoom.add(user);
				socket.join(data.code);
				update(data.code,foundRoom.People);
			}
		}
	});

	socket.on('leaveRoom',function (data) {
		let id = findId(data.code);
		if (id == -1) {
			socket.emit('err',"Room doesn't exist!");
		}else {
			let foundRoom = rooms[id];
			foundRoom.del(data);
			socket.leave(data.code);
			update(data.code,foundRoom.People);
		}
	});
	//disconnect
	socket.on('disconnect', () => {
    	for (let i = 0; i < rooms.length; i++) {
    		let ppl = rooms[i].People;
    		for (let j = 0; j < ppl.length; j++) {
    			if (ppl[j].id == socket.id) {
    				if (ppl[j].name == "Host") { //check if it is host-> send err to all in room
    					destroyRoom(rooms[i].Code);
    				}else{
	    				rooms[i].del(socket.id);
	    				update(rooms[i].code,rooms[i].People);
    				}
    			}
    		}
    	}
  	});

	//Tasks
	socket.on("TextTask",function (room){
		socket.broadcast.to(room).emit("task_text");
	});

	socket.on("TextTaskDone", function(data){
		socket.broadcast.to(data.room).emit("task_text_done",data);
	});

});


class Room {

	constructor(code,name, socket) {
	    this.code = code;
	    this.people = [];
	    this.people.push({
	    	name:name,
	    	id:socket.id
	    });
  	}

  	add(who){
  		this.people.push(who);
  	}
  	del(who){
  		for(let i = 0; i < this.people.length; i++){
  			if(this.people[i].id == who){
  				this.people.splice(i,1);
  			}
  		}
  	}
  	get People(){
  		return this.people;
  	}
  	get Code(){
  		return this.code;
  	}
}

server.listen(3000);