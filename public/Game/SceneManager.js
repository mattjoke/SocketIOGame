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
var Scene = /** @class */ (function () {
    function Scene() {
    }
    return Scene;
}());
var Lobby = /** @class */ (function (_super) {
    __extends(Lobby, _super);
    function Lobby() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lobby.prototype.unload = function () {
        //Changing scene to next one
        scenes.changeScene(new Role_assign());
    };
    Lobby.prototype.load = function () {
        //Basically a constructor
        this.bx = width / 2 - 272.5;
        this.by = height / 2;
        //loading imags to cache
        this.bg = loadImage("assets/bg.png");
        this.button = loadImage("assets/button.png");
    };
    Lobby.prototype.update = function () {
        //Chceking if button is pressed
        if (mouseX > this.bx && mouseX < (this.bx + 545) && mouseY > this.by && mouseY < (this.by + 225)) {
            if (mouseIsPressed) {
                if (players.length) {
                    this.unload();
                }
            }
        }
        //Redrawing
        this.redraw();
    };
    Lobby.prototype.redraw = function () {
        //Draw BG and button
        image(this.bg, 0, 0);
        image(this.button, this.bx, this.by);
        //Draw title
        textSize(72);
        text("Ludum", (width - textWidth("Ludum")) / 2, height / 8);
        //Draw roomcode
        textSize(32);
        text(roomCode, width - textWidth(roomCode) - width / 85, height / 6);
        //Draw connected players
        textSize(24);
        var step = height / 6;
        text("Pripojení hráči:", width / 85, height / 6);
        for (var i = 0; i < players.length; i++) {
            var player = players[i].name;
            if (player != "Host") {
                step += 32;
                text(player, width / 85, step, 60, width);
            }
        }
    };
    return Lobby;
}(Scene));
var Role_assign = /** @class */ (function (_super) {
    __extends(Role_assign, _super);
    function Role_assign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Role_assign.prototype.unload = function () {
        //Starts Game Loop
        roles = [];
    };
    Role_assign.prototype.update = function () {
        background(127, 50, 30);
    };
    Role_assign.prototype.redraw = function () {
    };
    Role_assign.prototype.load = function () {
        var count = floor((players.length - 1) / 2);
        if ((players.length - 1) <= 4) {
            count--;
        }
        roles[0] = "HOST";
        //Assign roles 1:3 ratio
        roles[floor(random(1, players.length))] = "DETEKTÍV";
        var assign = true;
        while (assign) {
            var place = floor(random(1, players.length));
            if (!roles[place]) {
                if (random() < 0.50 && count > 0) {
                    roles[place] = "ZLODEJ";
                    count--;
                }
                else {
                    roles[place] = "NEVINNÝ";
                }
            }
            var isOk = true;
            for (var i = 0; i < roles.length; i++) {
                if (!roles[i] || (roles.length != players.length)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                assign = false;
            }
        }
        console.log(roles, players, count);
    };
    return Role_assign;
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
//Socket.IO
var socket = io();
//Player variables
var players = [];
var roles = [];
var roomCode = "";
//SceneManager, canvas variables
var scenes;
var width;
var height;
function setup() {
    //Creating canvas
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    //Initialize Scene
    scenes = new SceneManager();
    scenes.changeScene(new Lobby());
    background(0);
    //Update server with new Room
    socket.emit('createRoom');
    //Get room code
    socket.on('code', function (code) {
        roomCode = "Kód miestnosti: " + code;
    });
    //Send players
    socket.on('send', function (data) {
        players = data;
    });
    //Error handeling
    socket.on('error', function (error) {
        alert(error);
        location.reload();
    });
}
function draw() {
    scenes.update();
}
