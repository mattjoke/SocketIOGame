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
        //Draw url address
        textSize(24);
        text("Zdajte túto adresu vo svojom prehlidači:", (width - textWidth("Zdajte túto adresu vo svojom prehlidači:")) / 2, height / 2.5 - 64);
        textSize(64);
        text(url, (width - textWidth(url)) / 2, height / 2.5);
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
        scenes.changeScene(new Vote());
    };
    Role_assign.prototype.update = function () {
        background(127, 54, 30);
    };
    Role_assign.prototype.redraw = function () {
        var correction = roomCode.substring(16);
        socket.emit('roles', [correction, [roles, players]]);
    };
    Role_assign.prototype.load = function () {
        var count = floor((players.length - 1) / 2);
        if ((players.length - 1) <= 4) {
            count = 1;
        }
        roles[0] = "HOST";
        //Assign roles 1:3 ratio
        var randomNum = floor(random(1, players.length));
        roles[randomNum] = "DETEKTÍV";
        while (count > 0) {
            randomNum = floor(random(1, players.length));
            if (!roles[randomNum]) {
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
            switch (roles[i]) {
                case "DETEKTÍV":
                    roles_count[0]++;
                    break;
                case "NEVINNÝ":
                    roles_count[1]++;
                    break;
                case "ZLODEJ":
                    roles_count[2]++;
                    break;
            }
        }
        this.redraw();
    };
    return Role_assign;
}(Scene));
var Vote = /** @class */ (function (_super) {
    __extends(Vote, _super);
    function Vote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vote.prototype.unload = function () {
        scenes.changeScene(new Conclusion());
    };
    Vote.prototype.load = function () {
        this.bg = loadImage("assets/bg-1.png");
        this.rCode = roomCode.substring(16);
        socket.emit('vote', [this.rCode, players]);
    };
    Vote.prototype.update = function () {
        this.redraw();
        if (players.length - 1 == answers.length) {
            this.unload();
        }
    };
    Vote.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw title
        fill(255);
        textSize(72);
        text("Hlasovanie", (width - textWidth("Hlasovanie")) / 2, height / 8);
        textSize(32);
        text("Na svojom zariadení si zvoľte, kto je podľa vás zlodej.", (width - textWidth("Na svojom zariadení si zvoľte, kto je podľa vás zlodej.")) / 2, height / 5);
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
        //Draw selected users
        textSize(72);
        step = height / 6 + 128;
        text("Hráči, ktorí nezvolili:", (width - textWidth("Hráči, ktorí nezvolili:")) / 2, height / 3);
        textSize(64);
        for (var i = 0; i < players.length; i++) {
            var player = players[i].id;
            var isThere = false;
            for (var j = 0; j < answers.length; j++) {
                var answer = answers[j];
                if (player == answer[1]) {
                    isThere = true;
                }
            }
            if (!isThere && players[i].name != "Host") {
                step += 64;
                text(players[i].name, (width - textWidth(players[i].name)) / 2, step, 60, width);
            }
        }
    };
    return Vote;
}(Scene));
var Conclusion = /** @class */ (function (_super) {
    __extends(Conclusion, _super);
    function Conclusion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Conclusion.prototype.unload = function () {
        //pick random events or launch endgame
        switch (this.picked_role) {
            case "DETEKTÍV":
                count[0]--;
                break;
            case "NEVINNÝ":
                count[1]--;
                break;
            case "ZLODEJ":
                count[2]--;
                break;
        }
        if ((count[0] + count[1]) == count[2]) {
            //EPIC FINALE -> TRUE ENDGAME
        }
        else if (count[2] > 1) {
            //Finale - Innocents win!
        }
        else {
            //Game continues
        }
    };
    Conclusion.prototype.load = function () {
        this.bg = loadImage("assets/bg-2.png");
        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            var isThere = false;
            for (var j = 0; j < picked.length; j++) {
                var pick = picked[j];
                if (pick[0] == answer[0]) {
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
    };
    Conclusion.prototype.update = function () {
    };
    Conclusion.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw Title
        fill(255);
        textSize(72);
        //Determine who is out
        var pick = picked[0];
        for (var i = 0; i < picked.length; i++) {
            var tmp = picked[i];
            if (pick[1] < tmp[1]) {
                pick[1] = tmp;
            }
        }
        var id = "";
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == pick[0]) {
                id = players[i].id;
            }
        }
        var title = pick[0] + " je mŕtvy!";
        text(title, (width - textWidth(title)) / 2, height / 8);
        var correction = roomCode.substring(16);
        socket.emit('dead', {
            room: correction,
            id: id
        });
        //Draw who voted for picked
        textSize(32);
        text("Podľa našich dostupných informácií za zažalovanie môžu očití svedkovia:", (width - textWidth("Podľa našich dostupných informácií za zažalovanie môžu očití svedkovia:")) / 2, height / 5);
        var step = height / 6 + 64;
        for (var i = 0; i < pick[2].length; i++) {
            var who = pick[2];
            for (var j = 0; j < players.length; j++) {
                if (who[i] == players[j].id) {
                    text(players[j].name, (width - textWidth(players[j].name)) / 2, step);
                    step += 48;
                }
            }
        }
        //Draw picked's role
        text(pick[0] + " poslal svoje posledné slová:");
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == pick[0]) {
                this.picked_role = roles[i];
                text("Som: " + roles[i], (width - textWidth("Som: " + roles[i])) / 2, height / 2);
            }
        }
        this.unload();
    };
    return Conclusion;
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
var roles_count = [0, 0, 0]; //No. Detectives, Innocents and Murderers
var answers = [];
var picked = [];
var roomCode = "";
var url = "";
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
    socket.on('err', function (error) {
        alert(error);
        location.reload();
    });
    //Final Voting
    socket.on('VoteFinal', function (data) {
        answers.push([data.answer, data.id]);
    });
    //Url Handeling
    socket.on('url', function (data) {
        url = data;
    });
}
function draw() {
    scenes.update();
}
function keyPressed() {
    if (key == 'a') {
        scenes.changeScene(new Vote());
    }
}
