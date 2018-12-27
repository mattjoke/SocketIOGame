let express = require('express');
let path = require('path');
let ngrok = require('ngrok');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

(async function() {
	try {
		const url = await ngrok.connect(3000);
		await console.log("Connected!: "+url);
	} catch(e) {
		console.log("Error: "+e);
	}
})();

console.log('Server is running on: localhost:3000');

let rooms = []; //keeps all rooms

io.on('connection',function(socket){

	console.log("Someone has connected: "+socket.id);

	function isUserAlreadyInRoom(name,id){
		let room = rooms[id].People;
		let count = 0;

		for (let i = 0; i < room.length; i++) {
			if (name.split("(")[0] == room[i].name.split("(")[0]) {
				count++;
			}
		}
		return count;
	}

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
		socket.broadcast.to(code).emit("err","Odpojené!");
		let roomId = findId(code);
		rooms.splice(roomId,1);
	};
	//Join room -> Leave room
	socket.on('joinRoom',function (data) {
		if (rooms.length == 0) {
			socket.emit('err',"Žiadne hry nie sú spustené!");
		}else{
			let id = findId(data.code);
			if (id == -1) {
				socket.emit('err',"Miestnosť neexistuje!");
			}else{
				let foundRoom = rooms[id];
				let isUser = isUserAlreadyInRoom(data.name,id);
				if(isUser != 0){
					data.name += "("+isUser+")";
					socket.emit("EditUserName",data.name);
				}
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

	socket.on("PickAnswerTask", function(data){
		socket.broadcast.to(data[0].room).emit("pick_answer_task",data);
	});

	socket.on("PickAnswerTaskDone", function(data){
		socket.broadcast.to(data.room).emit("pick_answer_task_done",data);
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