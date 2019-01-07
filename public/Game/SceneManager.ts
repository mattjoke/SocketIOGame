abstract class Scene{
	abstract update():void;
	abstract redraw():void;
	abstract load():void;
	abstract unload():void;
}

class Lobby extends Scene{
	private bg: Image;
	private logo: Image;

	private bx: number;
	private by: number;
	private button: Image;

	unload():void{
		//Changing scene to next one
		scenes.changeScene(new Role_assign());
	}

	load():void{
		//Basically a constructor
		this.bx = width/2-272.5;
		this.by = height/2;
		//loading imags to cache
		this.bg = loadImage("assets/bg.png");
		this.button = loadImage("assets/button.png");
	}

	update():void {
		//Chceking if button is pressed
		if (mouseX > this.bx && mouseX < (this.bx + 545) && mouseY > this.by && mouseY < (this.by + 225)){
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
		image(this.bg,0,0);
		image(this.button, this.bx, this.by);

		//Draw title
		textSize(72);
		text("Ludum", (width-textWidth("Ludum"))/2, height/8);
		//Draw url address
		textSize(24);
		text("Zdajte túto adresu vo svojom prehlidači:", (width-textWidth("Zdajte túto adresu vo svojom prehlidači:"))/2, height/2.5 - 64);
		textSize(64);
		text(url, (width-textWidth(url))/2, height/2.5);
		//Draw roomcode
		textSize(32);
		text(roomCode, width-textWidth(roomCode) - width/85, height/6);
		//Draw connected players
		textSize(24);
		let step = height/6;
		text("Pripojení hráči:",width/85,height/6);
		for (var i = 0; i < players.length; i++) {
			let player = players[i].name;
			if (player != "Host") {
				step += 32;
				text(player,width/85,step,60,width);
			}
		}
	}
}

class Role_assign extends Scene{

	unload():void{
		//Starts Game Loop
		scenes.changeScene(new Vote());
	}
	update():void {
		background(127,54,30);
	}
	redraw():void{
		let correction = roomCode.substring(16);
		socket.emit('roles', [correction,[roles,players]]);
	}
	load():void{
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

	unload():void{
		scenes.changeScene(new Conclusion());
	}

	load():void{
		this.bg = loadImage("assets/bg-1.png");
		this.rCode = roomCode.substring(16);
		socket.emit('vote',[this.rCode, players]);
	}

	update():void {
		this.redraw();
		if (players.length-1 == answers.length) {
			this.unload();
		}
	}

	redraw():void{
		image(this.bg,0,0);
		//Draw title
		fill(255);
		textSize(72);
		text("Hlasovanie", (width-textWidth("Hlasovanie"))/2, height/8);
		textSize(32);
		text("Na svojom zariadení si zvoľte, kto je podľa vás zlodej.", (width-textWidth("Na svojom zariadení si zvoľte, kto je podľa vás zlodej."))/2, height/5);
		//Draw roomcode
		textSize(32);
		text(roomCode, width-textWidth(roomCode) - width/85, height/6);
		//Draw connected players
		textSize(24);
		let step = height/6;
		text("Pripojení hráči:",width/85,height/6);
		for (var i = 0; i < players.length; i++) {
			let player = players[i].name;
			if (player != "Host") {
				step += 32;
				text(player,width/85,step,60,width);
 			}
		}
		//Draw selected users
		textSize(72);
		step = height/6+128;
		text("Hráči, ktorí nezvolili:", (width-textWidth("Hráči, ktorí nezvolili:"))/2,height/3);
		textSize(64);
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
				step += 64;
            	text(players[i].name, (width - textWidth(players[i].name)) / 2, step, 60, width);
			}
		}
	}
}
class Conclusion extends Scene{

	private bg: Image;
	private picked_role: string;

	unload():void{
		//pick random events or launch endgame
		answers = [];
		picked = [];
		switch(this.picked_role){
			case "DETEKTÍV": roles_count[0]--; break;
			case "NEVINNÝ": roles_count[1]--; break;
			case "ZLODEJ": roles_count[2]--; break;
		}
		if ((roles_count[0]+roles_count[1]) == roles_count[2]) {
			//EPIC FINALE -> TRUE ENDGAME
		}else if (roles_count[2] < 1) {
			//Finale - Innocents win!
		} else {
			//Game continues
		}
	}
	load():void{
		background(0);
		this.bg = loadImage("assets/bg-2.png");
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
	redraw():void{
		image(this.bg,0,0);
		//Draw Title
		fill(255);
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

		let title = pick[0] + " je mŕtvy!";
		text(title, (width-textWidth(title))/2, height/8);

		let correction = roomCode.substring(16);

		socket.emit('dead', {
			room: correction,
			id: id
		});

		//Draw who voted for picked
		textSize(32);
		text("Podľa našich dostupných informácií za zažalovanie môžu očití svedkovia:",(width-textWidth("Podľa našich dostupných informácií za zažalovanie môžu očití svedkovia:"))/2,height/5);
		let step = height/6+64;
		for (var i = 0; i < pick[2].length; i++) {
			let who = pick[2];
			for (var j = 0; j < players.length; j++) {
				if(who[i] == players[j].id){
					text(players[j].name, (width-textWidth(players[j].name))/2, step);
					step += 48;
				}
			}
		}
		//Draw picked's role
		text(pick[0]+" poslal svoje posledné slová:")
		for (var i = 0; i < players.length; i++) {
			if(players[i].name == pick[0]){
				this.picked_role = roles[i];
				text("Som: "+roles[i],(width-textWidth("Som: "+roles[i]))/2, height/2);
			}
		}
	}
}
class SceneManager{
	private static instance: SceneManager;
	currScene: Scene;

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
		newScene.load();
		this.currScene = newScene
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
let url = "";
//SceneManager, canvas variables
let scenes;
let width;
let height;

function setup(){
	//Creating canvas
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width,height);

	//Initialize Scene
	scenes = new SceneManager();
	scenes.changeScene(new Lobby());
	background(0);

	//Update server with new Room
	socket.emit('createRoom');
	//Get room code
	socket.on('code', function(code){
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

function keyPressed(){
	if(key == 'a'){
		scenes.changeScene(new Vote());
	}
}
