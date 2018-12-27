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

class Load extends Scene{

	private x: number;
	private y: number;
	private inc: number;

	private bg: Image;
	private logo: Image;

	private bx: number;
	private by: number;
	private button: Image;

	unload():void{
		scenes.changeScene(new Start());
	}

	load():void{
		this.x = 0;
		this.y = 0;
		this.inc = 10;

		this.by = 50;
		this.bx = 100;

		this.bg = loadImage("assets/bg.png");
		this.logo = loadImage("assets/logo.png");
		this.button = loadImage("assets/button.png");
	}

	update():void {
		this.x += randomInt(-this.inc,this.inc);
		this.y += randomInt(-this.inc,this.inc);

		if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight){
			this.x = window.innerWidth/2;
			this.y = window.innerHeight/2;
		}

		if (mouseX > this.bx && mouseX < (this.bx + 555) && mouseY > this.by && mouseY < (this.by + 225)){
			if (mouseIsPressed){
				this.unload();
			}
		}
		this.redraw();
	}

	redraw():void{
		image(this.bg,0,0);
		image(this.button, this.bx, this.by);

		textSize(72);
		text("Ludum", width/2-64, height/7);

		image(this.logo,this.x,this.y);
	}


}

class Start extends Scene{

	private bg: number;
	private inc: number;

	update():void {
		if (this.bg > 255 || this. bg < 0){
			this.inc = -this.inc;
		}
		this.bg += this.inc;
		background(this.bg,127,25);
	}
	redraw():void{
	}
	load():void{
		this.bg = 127;
		this.inc = 5;
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


let width;
let height;
let scenes;

function setup(){
	scenes = new SceneManager();
	scenes.changeScene(new Load());
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width,height);
	background(0);
}

function draw(){
	scenes.update();
}
