let express = require('express');
let path = require('path');
let ngrok = require('ngrok');
let app = express();
let sqlite3 = require('sqlite3').verbose();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

let ngrok_active = true; //Choice if Ngrok should be used (default false)

let db = new sqlite3.Database('./db/database.db', (err)=>{
	if (err) {
		console.log(err.message);
	}
	console.log('Connected to DB!')
});


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

let web = "localhost:3000";

if (ngrok_active){
	(async function() {
		try {
			const url = await ngrok.connect(3000);
			await console.log("Connected to:"+url);
			web = url;
		} catch(e) {
			console.log("Error: "+e);
		}
	})();
}

console.log('Server is running on: ' + web);

let rooms = []; //keeps all rooms

io.on('connection',function(socket){

	console.log("Someone has connected: "+socket.id);

	//Based on user name -> changes it
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

	//Generate random room ID
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
		socket.emit('url', web);
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
	//disconnect -> Host disconnecting
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

  	(async function dataParse(){
		db.all("SELECT * FROM Tasks ORDER BY RANDOM() LIMIT 1;", [], (err,rows)=>{
			if (err) {
				throw err;
			}
			return rows;
		});
  	});
	//Handle DB requests
	socket.on('Hands', function(room){
		const out = await ;
		console.log(out);
	});
	//Tasks
	socket.on("TextTask", function (room){
		socket.broadcast.to(room).emit("task_text");
	});

	socket.on("TextTaskDone", function(data){
		socket.broadcast.to(data.room).emit("task_text_done",data);
	});
	//New sets of tasks
	//Roles
	socket.on('roles', function(data){
		socket.broadcast.to(data[0]).emit('roles', data[1]);
	});
	//Voting
	socket.on('vote', function(data){
		socket.broadcast.to(data[0]).emit('voting', data);
	});
	socket.on('VoteSubmit', function(data){
		socket.broadcast.to(data.room).emit('VoteFinal', data);
	});
	//Dead player
	socket.on('dead', function(data){
		socket.broadcast.to(data.room).emit('DeadPlayer', data.id);
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