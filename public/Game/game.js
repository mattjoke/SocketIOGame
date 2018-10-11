let room;
let nick;
let arr = [];
let codeFromServer = "";

let state = 0;

let socket = io();

let img;

function preload(){
	img = loadImage("memes/1.jpg");
}

function setup(){
	createCanvas($(window).width()-25,$(window).height()-25);
	socket.emit('createRoom');

	socket.on('send',function (data) {
		arr = data;
		loop();
	});
	socket.on('err', function (error) {
		alert(error);
		location.reload();
	});
	socket.on('code',function (data){
		codeFromServer = "Room code: " + data;
		loop();
	});
}
function draw(){
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
			sendTextTask();
			noLoop();
		break;
	}
}
function drawTitle(title){
	textSize(32);
	noStroke();
	text(title, width/2 - textWidth(title)/2, 32);
}

function drawRoomCode(){
	if (!(codeFromServer == "")) {
		textSize(16);
		fill(255);
		noStroke();
		text(codeFromServer,width-150,64);
	}
}
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
			start();
		}
	}
}

//MemeThis!
function drawMeme(){
	image(img, width/2 - img.width/4 ,height/2 - img.height/4,img.width/2,img.height/2);
}
function sendTextTask(){
	let correction = codeFromServer.substring(11);
	socket.emit("TextTask",correction);
}

let answers = [];

socket.on('task_text_done',function(data){
	console.log(data);
	text(data.nick, width/2 - img.width/4 - 25 ,height/2 - img.height/4 - 25);
})



//Trivia
/*function drawTriviaButtons(answers){
	answers = answers.replace(/_/g," ");
	let q = answers.split(" ");
	drawDumbButton(width/3,height/2, q[0]);
	drawDumbButton(width - width/2 + 100,height/2, q[1]);
	drawDumbButton(width/3,height/2 +100, q[2]);
	drawDumbButton(width- width/2 + 100,height/2+100, q[3]);
}

function drawDumbButton(x,y,label){
	noFill();
	stroke(0);
	rect(x,y,textWidth(label)+10,32+10);
	textSize(32);
	fill(255);
	noStroke();
	text(label,x+5,y+5,x,y);
}*/

