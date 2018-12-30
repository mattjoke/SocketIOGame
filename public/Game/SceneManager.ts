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
				if (players.length){
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
		scenes.changeScene(new Start());
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
		this.redraw();
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
let roomCode = "";
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
}

function draw(){
	scenes.update();
}
