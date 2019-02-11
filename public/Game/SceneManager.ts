abstract class Scene{
	abstract update():void;
	abstract redraw():void;
	abstract load():void;
	abstract unload():void;
}
//Camera movement
class LobbyMoveRolechoose extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Role_assign());
	}

	load():void{
		background(0);
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -268;
		this.y = -47;
		this.targetX = 973;
		this.targetY = 397;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMovePoint extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new YouGottaPoint());
	}

	load():void{
		background(0);
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 487;
		this.targetY = 1101;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMoveHands extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new HandsOfTruth());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 1427;
		this.targetY = 1084;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMoveDice extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new DiceOfLuck());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 2363;
		this.targetY = 1177;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DiceMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2363;
		this.y = -1177;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		let xhelp = abs(this.targetX+this.x);
		let yhelp = abs(this.targetY+this.y);
		if (xhelp < 1 && yhelp < 1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class PointMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -487;
		this.y = -1101;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class HandsMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -1427;
		this.y = -1084;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class VoteMoveDead extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Conclusion());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = 420;
		this.y = -1131;
		this.targetX = 2094;
		this.targetY = 6;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveHands extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new HandsOfTruth());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 1427;
		this.targetY = 1084;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMovePoint extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new YouGottaPoint());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 487;
		this.targetY = 1101;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveDice extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new DiceOfLuck());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 2363;
		this.targetY = 1177;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
//Scenes with game
class Lobby extends Scene{
	private bg: Image;

	unload():void{
		//Changing scene to next one
		scenes.changeScene(new LobbyMoveRolechoose());
	}

	load():void{
		//loading imags to cache
		this.bg = loadImage("assets/Lobby.jpeg");
	}

	update():void {
		//Chceking if button is pressed
		width, height - height/2.3
		if (mouseX > (width - 823)  && mouseX < (width - 138) && mouseY > (height - 429) && mouseY < (height - 90)){
			if (mouseIsPressed){
				if (players.length-1 >= 3){
					this.unload();
				}
			}
		}
		//Redrawing
		this.redraw();
	}

	redraw():void{
		//Draw BG and button
		image(this.bg,0,0,0,height);

		//Draw url address
		textSize(24);
		text("Zadajte túto adresu vo svojom prehlidači:", width-textWidth("Zadajte túto adresu vo svojom prehlidači:"), height - height/2.5 - 64);
		textSize(64);
		text(url, width-textWidth(url), height - height/2.5);

		//Draw connected players
		textSize(24);
		let step = height-height/3;
		for (var i = 0; i < players.length; i++) {
			let player = players[i].name;
			if (player != "Host") {
				step += 32;
				text(player,width/20,step,60,width);
			}
		}
		//Draw roomcode
		translate(width-width/2.5,height/3);
		textSize(72);
		angleMode(DEGREES);
		rotate(17);
		text(correction, 0, 0);
	}
}
class Role_assign extends Scene{

	private timer: number;
	private bg: Image;

	unload():void{
		//Starts Game Loop
		let pick = round(random(0,2));
		switch(pick){
			case 0: scenes.changeScene(new RolechooseMovePoint()); break;
			case 1: scenes.changeScene(new RolechooseMoveHands()); break;
			case 2: scenes.changeScene(new RolechooseMoveDice()); break;
		}
	}
	update():void {
		image(this.bg,0,0);
		fill(0);
		textSize(64);
		text("Máte 30 sekúnd na pozretie si svojej roly",(width-textWidth("Máte 30 sekúnd na pozretie si svojej roly"))/2, height/4);
		textSize(100);
		if(frameCount % 60 == 0  && this.timer > 0){
			this.timer--;
		}
		if (this.timer == 0) {
			this.unload();
		}
	}
	redraw():void{
		socket.emit('roles', [correction,[roles,players]]);
	}
	load():void{
		this.bg = loadImage('assets/RoleChoose.jpeg');
		this.timer = 30;

		let count = floor((players.length-1)/2);
		if ((players.length-1)<=4){
			count = 1;
		}
		roles[0] = "HOST";
		//Assign roles 1:3 ratio
		let randomNum = floor(random(1,players.length));
		roles[randomNum] = "DETEKTÍV";
		while (count > 0) {
			randomNum = floor(random(1,players.length));
			if (!roles[randomNum]){
				roles[randomNum] = "ZLODEJ";
				count--;
			}
		}
		for (var i = 0; i < players.length; i++) {
			if (!roles[i]) {
				roles[i] = "NEVINNÝ";
			}
		}
		for (var i = 0; i < roles.length; i++) {
			switch (roles[i]){
				case "DETEKTÍV": roles_count[0]++; break;
				case "NEVINNÝ": roles_count[1]++; break;
				case "ZLODEJ": roles_count[2]++; break;
			}
		}
		this.redraw();
	}
}
class Vote extends Scene{

	private bg: Image;
	private rCode: string;
	private timer: number;

	unload():void{
		scenes.changeScene(new VoteMoveDead());
	}

	load():void{
		this.timer = 90;
		this.bg = loadImage("assets/Výsluch.jpeg");
		this.rCode = roomCode.substring(16);
		socket.emit('vote',[this.rCode, players]);
	}

	update():void {
		this.redraw();
		if (players.length-1 == answers.length) {
			this.unload();
		}
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
		}
		if (this.timer == 0) {
			this.unload();
		}
	}

	redraw():void{
		image(this.bg,0,0);
		//Draw title
		fill(0);
		textSize(32);
		text("Na svojom zariadení si zvoľte,",width/85, height/5);
		text(" kto je podľa vás zlodej.", width/85, height/5+35);
		//Draw selected users
		textSize(42);
		step = height/6+160;
		text("Hráči, ktorí nehlasovali:", width/85, height/3);
		textSize(32);
		for (var i = 0; i < players.length; i++) {
			let player = players[i].id;
			let isThere = false;
			for (var j = 0; j < answers.length; j++) {
				let answer = answers[j];
				if (player == answer[1]) {
					isThere = true;
				}
			}
			if (!isThere && players[i].name != "Host") {
				step += 40;
            	text(players[i].name, width/85, step, 60, width);
			}
		}
		//Draw timer
		fill(0);
		translate(width/2.75, height - height/4.5);
		angleMode(DEGREES);
		rotate(17);
		textSize(96);
		text(this.timer,0,0);
	}
}
class Conclusion extends Scene{

	private bg: Image;
	private picked_role: string;
	private timer: number;

	unload():void{
		//pick random events or launch endgame
		answers = [];
		picked = [];

		switch(this.picked_role){
			case "DETEKTÍV": roles_count[0]--; break;
			case "NEVINNÝ": roles_count[1]--; break;
			case "ZLODEJ": roles_count[2]--; break;
		}

		socket.emit("NewRound", correction);

		if (roles_count[2] == 2 && ((roles_count[0]+roles_count[1]) == roles_count[2])) {
			//EPIC FINALE -> TRUE ENDGAME
		}else if (roles_count[2] == 0) {
			//Finale - Innocents win!
		} else {
			switch(lastRandomEvent){
				case "Dice":
					if(random()<0.5){
						lastRandomEvent = "Hands";
						scenes.changeScene(new DeadMoveHands());
					}else{
						lastRandomEvent = "Point";
						scenes.changeScene(new DeadMovePoint());
					}
					break;
				case "Hands":
					if(random()<0.5){
						lastRandomEvent = "Dice";
						scenes.changeScene(new DeadMoveDice());
					}else{
						lastRandomEvent = "Point";
						scenes.changeScene(new DeadMovePoint());
					}
					break;
				case "Point":
					if(random()<0.5){
						lastRandomEvent = "Hands";
						scenes.changeScene(new DeadMoveHands());
					}else{
						lastRandomEvent = "Dice";
						scenes.changeScene(new DeadMoveDice());
					}
					break;
			}
		}
	}
	load():void{
		background(0);

		this.bg = loadImage("assets/Dead.jpeg");
		this.timer = 30;

		if (picked.length == 0) {
			let pick = random(players);
			while (pick.name == "Host"){
				pick = random(players);
			}
			picked.push([pick.name, 1, [pick.id]);
		}

		for (var i = 0; i < answers.length; i++) {
			let answer = answers[i];
			let isThere = false;
			for (var j = 0; j <	picked.length; j++) {
				let pick = picked[j];
				if( pick[0] == answer[0]){
					pick[1]++;
					pick[2].push(answer[1]);
					isThere = true;
				}
			}
			if (!isThere) {
				picked.push([answer[0], 1, [answer[1]]]);
			}
		}

		this.redraw();
	}
	update():void {
		this.redraw();
	}
	removePerson(id:string):void{
		for (var i = 0; i < players.length; i++) {
			if(players[i].id == id){
				players.splice(i, 1);
			}
		}
	}
	redraw():void{
		image(this.bg,0,0);
		//Draw Title
		fill(0);
		textSize(72);

		//Determine who is out
		let pick = picked[0];
		for (var i = 0; i < picked.length; i++) {
			let tmp = picked[i];
			if(pick[1] < tmp[1]){
				pick[1] = tmp;
			}
		}
		let id = "";
		for (var i = 0; i < players.length; i++) {
			if(players[i].name == pick[0]){
				id = players[i].id;
			}
		}

		//Draw player's name
		textSize(56);
		text(pick[0], width/2 - textWidth(pick[0])/1.4, height/6.45);

		//Emits dead person to server
		socket.emit('dead', {
			room: correction,
			id: id
		});

		//Draw picked's role
		for (var i = 0; i < players.length; i++) {
			if(players[i].name == pick[0]){
				this.picked_role = roles[i];
				text(roles[i],width-textWidth(roles[i])-width/30, height-height/3);
			}
		}

		//Timer
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
		}
		if (this.timer == 0) {
			this.removePerson(id);
			this.unload();
		}

	}
}
class HandsOfTruth extends Scene{

	private bg: Image;
	private round: number;
	private timer: number;

	unload():void{
		scenes.changeScene(new HandsMoveVote());
	}

	load():void{
		socket.emit('Hands', correction);
		this.bg = loadImage("assets/handOfTruth.jpeg");
		this.timer = 10;
		this.round = 0;
	}
	update():void {
		this.redraw();
	}

	redraw():void{
		image(this.bg,0,0);

		fill(0);
		textSize(56);
		text("Na svojom zariadení si prečítajte úlohu.",(width-textWidth("Na svojom zariadení si prečítajte úlohu."))/2.1, height/2+72);
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
			if (this.timer == 0) {
				this.round = 1;
			}
		}
		if (this.round == 1) {
			//Play GO! sound
			this.timer = 5;
			this.round = 2;
		}else{
			if (this.round == 2) {
				this.unload();
			}
		}
	}
}
class YouGottaPoint extends Scene{

	private bg: Image;
	private round: number;
	private timer: number;

	unload():void{
		scenes.changeScene(new PointMoveVote());
	}

	load():void{
		socket.emit('Point', correction);

		this.bg = loadImage('assets/YouGottaPoint.jpeg');
		this.timer = 10;
		this.round = 0;
	}

	update():void {
		this.redraw();
	}

	redraw():void{
		image(this.bg,0,0);

		fill(0);
		textSize(56);
		text("Na svojom zariadení si prečítajte úlohu.",(width-textWidth("Na svojom zariadení si prečítajte úlohu."))/2.1, height/2+72);
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
			if (this.timer == 0) {
				this.round = 1;
			}
		}
		if (this.round == 1) {
			//Play GO! sound
			this.timer = 5;
			this.round = 2;
		}else{
			if (this.round == 2) {
				this.unload();
			}
		}
	}
}
class DiceOfLuck extends Scene{

	private bg: Image;

	unload():void{
		scenes.changeScene(new DiceMoveVote());
	}

	load():void{
		this.bg = loadImage('assets/DiceOfLuck.jpeg');
	}

	update():void {
		this.redraw();
		if(frameCount % 300 == 0){
			this.unload();
		}
	}

	redraw():void{
		image(this.bg,0,0);
	}
}
//Scene manager
class SceneManager{
	currScene: Scene;
	private static instance: SceneManager;

	public static getInstance():SceneManager{
		if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
	}

	public update():void{
		this.currScene.update();
	}
	public redraw():void{
		this.currScene.redraw();
	}

	public changeScene(newScene:Scene):void{
		this.currScene = null;
		newScene.load();
		this.currScene = newScene;
	}
}
//Socket.IO
let socket = io();
//Player variables
let players = [];
let roles = [];
let roles_count = [0,0,0]; //No. Detectives, Innocents and Murderers
let answers = [];
let picked = [];

let roomCode = "";
let correction;
let url = "";
let lastRandomEvent = "Dice";
//SceneManager, canvas variables
let width;
let height;
let scenes;

function setup(){
	//Creating canvas
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width,height);
	frameRate(60);

	//Initialize Scene
	scenes = new SceneManager();
	scenes.changeScene(new Lobby());
	background(0);

	//Update server with new Room
	socket.emit('createRoom');
	//Get room code
	socket.on('code', function(code){
		correction = code;
		roomCode = "Kód miestnosti: " + code;
	});
	//Send players
	socket.on('send', function(data){
		players = data;
	});
	//Error handeling
	socket.on('err', function(error){
		alert(error);
		location.reload();
	});
	//Final Voting
	socket.on('VoteFinal', function(data){
		answers.push([data.answer,data.id]);
	});
	//Url Handeling
	socket.on('url',function(data){
		url = data;
	});
}

function draw(){
	scenes.update();
}