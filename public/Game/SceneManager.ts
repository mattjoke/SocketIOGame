 /**
 * generate a random integer between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number} random generated integer
 */
 function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

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
		scenes.changeScene(new Start());
	}

	load():void{
		//Basically a constructor
		this.bx = width/2-272.5;
		this.by = height/2;

		this.bg = loadImage("assets/bg.png");
		this.button = loadImage("assets/button.png");
	}

	update():void {
		//Chceking if button is pressed
		if (mouseX > this.bx && mouseX < (this.bx + 545) && mouseY > this.by && mouseY < (this.by + 225)){
			if (mouseIsPressed){
				if (players.length-1){
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
		text(roomCode, width-textWidth(roomCode), height/6);
		//Draw connected players
		textSize(24);
		let step = height/6;
		text("Players connected:",width/85,height/6);
		for (var i = 0; i < players.length; i++) {
			let player = players[i].name;
			if (player != "Host") {
				step += 32;
				text(player,width/85,step,60,width);
			}
		}
	}
}

class Start extends Scene{

	private bg: Image;

	update():void {
		this.redraw();
	}
	redraw():void{
		image(this.bg,0,0);
	}
	load():void{
		background(0,0,0,75);
		this.bg = loadImage("assets/bg-1.png");
	}
	unload():void{

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
	socket.on('error', function(error){
		alert(error);
		location.reload();
	});
}

function draw(){
	scenes.update();
}
