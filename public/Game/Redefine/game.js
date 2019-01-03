//Socket.IO
let socket = io();
//Variables that work with room
let room;
let nick;
let arr = [];
let codeFromServer = "";

let img; //Loading image to cache
let bg;
function preload(){
	img = loadImage("memes/1.jpg");
	//TODO: add database integration
}

function setup(){
	createCanvas($(window).width()-4,$(window).height()-4); //Creating canvas

	socket.emit('createRoom');

	socket.on('send',function (data) {
		arr = data;
	});

	socket.on('err', function (error) {
		alert(error);
		location.reload();
	});

	socket.on('code',function (data){
		codeFromServer = "Room code: " + data;
	});
}

let state = 0;
let answers = [];
let endRound = false;

function draw(){
	if (endRound) {
		if (answers.length === (arr.length-1)) {
			state = 2;
		}
	}
	if(endround2){
		if (picked_answers.length === (arr.length -1)) {
			state = 3;
		}
	}

	switch (state) {
		case 0:
			background(127);
			drawRoomCode();
			drawConnPlayers();
			drawTitle("Game Lobby");
			drawButton(width/2 - 50 ,height/8,"Start");
		break;
		case 1:
			background(127,150,0);
			drawRoomCode();
			drawConnPlayers();
			drawTitle("Meme This!");
			drawMeme();
			endRound = true;
			sendTextTask();
		break;
		case 2:
			background(127,150,0);
			drawRoomCode();
			drawConnPlayers();
			drawTitle("Meme This! - getting answers!");
			conclusion(img, answers);
			endround2 = true;
		break;
		case 3:
			background(127,158,0);
			drawRoomCode();
			drawConnPlayers();
			drawTitle("Finale :D");
			finale();
		break;
	}
}
//Drawing title
function drawTitle(title){
	textSize(32);
	noStroke();
	text(title, width/2 - textWidth(title)/2, 32);
}
//Drawing room code
function drawRoomCode(){
	if (!(codeFromServer == "")) {
		textSize(16);
		fill(255);
		noStroke();
		text(codeFromServer,width-150,64);
	}
}
//Drawing connected players
function drawConnPlayers(){
	textSize(16);
	fill(255);
	noStroke();
	text("Players connected:",0,64);
	let num = 64;
	for (var i = 0; i < arr.length; i++) {
		let play = arr[i].name;
		if (play != "Host") {
			text(play,10,num+16,60,width);
			num+=16;
		}
	}
}
//Dwrawing working button
function drawButton(x,y,label){
	fill(127);
	stroke(0);
	rect(x,y,textWidth(label)+10,32+10);
	textSize(32);
	fill(255);
	noStroke();
	text(label,x+5,y+5,x,y);
	if(mouseX < (x+x) && mouseX > x && mouseY > y && mouseY < y+42){
		if(mouseIsPressed){
			if (arr.length != 1) {
				state = 1;
			}
		}
	}
}

//MemeThis -> tasks
function drawMeme(){
	image(img, width/2 - img.width/4 ,height/2 - img.height/4,img.width/2,img.height/2);
}

function sendTextTask(){
	let correction = codeFromServer.substring(11);
	socket.emit("TextTask",correction);
}

function conclusion(img,array){
	text("Pick the funniest one!", width/2-(128), height/6);
	image(img, width/2 - img.width/20,height/2 - img.height/4,img.width/8,img.height/8);
	for (let i = 0; i < array.length; i++) {
		text(array[i].answer, width/2 - 128, i*32+height/2);
	}
	socket.emit("PickAnswerTask", answers);
}

let picked_answers = [];
let endround2 = false;

socket.on('pick_answer_task_done', function(data){
	picked_answers.push(data);
});

socket.on('task_text_done',function(data){
	answers.push(data);
});

function finale(){
	for (let i = 0; i < picked_answers.length; i++){
		textSize(32);
		text(picked_answers[i].picked_answer, width/2 - 128, i*64+height/2+3);
		textSize(16);
		text(picked_answers[i].nick, width/2 - 128, i*128+height/2 + 16);
		text("-----------------------",width/2 - 128, i*64+height/2 + 32);
	}
}
