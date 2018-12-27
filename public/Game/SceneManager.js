var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* generate a random integer between min and max
* @param {Number} min
* @param {Number} max
* @return {Number} random generated integer
*/
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Scene = /** @class */ (function () {
    function Scene() {
    }
    return Scene;
}());
var Load = /** @class */ (function (_super) {
    __extends(Load, _super);
    function Load() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Load.prototype.unload = function () {
        scenes.changeScene(new Start());
    };
    Load.prototype.load = function () {
        this.x = 0;
        this.y = 0;
        this.inc = 10;
        this.by = 50;
        this.bx = 100;
        this.bg = loadImage("assets/bg.png");
        this.logo = loadImage("assets/logo.png");
        this.button = loadImage("assets/button.png");
    };
    Load.prototype.update = function () {
        this.x += randomInt(-this.inc, this.inc);
        this.y += randomInt(-this.inc, this.inc);
        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
        }
        if (mouseX > this.bx && mouseX < (this.bx + 555) && mouseY > this.by && mouseY < (this.by + 225)) {
            if (mouseIsPressed) {
                this.unload();
            }
        }
        this.redraw();
    };
    Load.prototype.redraw = function () {
        image(this.bg, 0, 0);
        image(this.button, this.bx, this.by);
        textSize(72);
        text("Ludum", width / 2 - 64, height / 7);
        image(this.logo, this.x, this.y);
    };
    return Load;
}(Scene));
var Start = /** @class */ (function (_super) {
    __extends(Start, _super);
    function Start() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Start.prototype.update = function () {
        if (this.bg > 255 || this.bg < 0) {
            this.inc = -this.inc;
        }
        this.bg += this.inc;
        background(this.bg, 127, 25);
    };
    Start.prototype.redraw = function () {
    };
    Start.prototype.load = function () {
        this.bg = 127;
        this.inc = 5;
    };
    Start.prototype.unload = function () {
    };
    return Start;
}(Scene));
var SceneManager = /** @class */ (function () {
    function SceneManager() {
    }
    SceneManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    };
    SceneManager.prototype.update = function () {
        this.currScene.update();
    };
    SceneManager.prototype.redraw = function () {
        this.currScene.redraw();
    };
    SceneManager.prototype.changeScene = function (newScene) {
        newScene.load();
        this.currScene = newScene;
    };
    return SceneManager;
}());
var width;
var height;
var scenes;
function setup() {
    scenes = new SceneManager();
    scenes.changeScene(new Load());
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    background(0);
}
function draw() {
    scenes.update();
}
