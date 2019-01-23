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
        //loading imags to cache
        this.bg = loadImage("assets/Lobby.jpeg");
    };
    Lobby.prototype.update = function () {
        //Chceking if button is pressed
        width, height - height / 2.3;
        if (mouseX > (width - 761) && mouseX < (width - 39) && mouseY > (height - 512) && mouseY < (height - 147)) {
            if (mouseIsPressed) {
                if (players.length - 1 >= 3) {
                    this.unload();
                }
            }
        }
        //Redrawing
        this.redraw();
    };
    Lobby.prototype.redraw = function () {
        //Draw BG and button
        image(this.bg, 0, 0, 0, height);
        //Draw url address
        textSize(24);
        text("Zadajte túto adresu vo svojom prehlidači:", width - textWidth("Zadajte túto adresu vo svojom prehlidači:"), height - height / 2.5 - 64);
        textSize(64);
        text(url, width - textWidth(url), height - height / 2.5);
        //Draw connected players
        textSize(24);
        var step = height - height / 3;
        for (var i = 0; i < players.length; i++) {
            var player = players[i].name;
            if (player != "Host") {
                step += 32;
                text(player, width / 20, step, 60, width);
            }
        }
        //Draw roomcode
        translate(width - width / 2.5, height / 3);
        textSize(72);
        angleMode(DEGREES);
        rotate(17);
        text(correction, 0, 0);
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
        image(this.bg, 0, 0);
        fill(0);
        textSize(64);
        text("Máte 30 sekúnd na pozretie si svojej roly", (width - textWidth("Máte 30 sekúnd na pozretie si svojej roly")) / 2, height / 4);
        textSize(100);
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
            this.unload();
        }
    };
    Role_assign.prototype.redraw = function () {
        socket.emit('roles', [correction, [roles, players]]);
    };
    Role_assign.prototype.load = function () {
        this.bg = loadImage('assets/RoleChoose.jpeg');
        this.timer = 30;
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
        this.timer = 90;
        this.bg = loadImage("assets/bg-1.png");
        this.rCode = roomCode.substring(16);
        socket.emit('vote', [this.rCode, players]);
    };
    Vote.prototype.update = function () {
        this.redraw();
        if (players.length - 1 == answers.length) {
            this.unload();
        }
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
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
        //Draw timer
        fill(255);
        textSize(48);
        text("Čas zostávajúci", width - textWidth("Čas zostávajúci"), height / 2);
        text(" na hlasovanie", width - textWidth(" na hlasovanie"), height / 2 + 50);
        textSize(72);
        text(this.timer, width - textWidth(this.timer), height / 2 + 100);
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
        answers = [];
        picked = [];
        switch (this.picked_role) {
            case "DETEKTÍV":
                roles_count[0]--;
                break;
            case "NEVINNÝ":
                roles_count[1]--;
                break;
            case "ZLODEJ":
                roles_count[2]--;
                break;
        }
        if ((roles_count[0] + roles_count[1]) == roles_count[2]) {
            //EPIC FINALE -> TRUE ENDGAME
        }
        else if (roles_count[2] < 1) {
            //Finale - Innocents win!
        }
        else {
            scenes.changeScene(new HandsOfTruth());
        }
    };
    Conclusion.prototype.load = function () {
        background(0);
        if (answers.length == 0 && picked.length == 0) {
            this.unload();
        }
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
        this.redraw();
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
        text(pick[0] + " poslal svoje posledné slová:", (width - textWidth(pick[0] + " poslal svoje posledné slová:")), height / 2);
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == pick[0]) {
                this.picked_role = roles[i];
                text("Som: " + roles[i], (width - textWidth("Som: " + roles[i])) / 2, height / 2);
            }
        }
    };
    return Conclusion;
}(Scene));
var HandsOfTruth = /** @class */ (function (_super) {
    __extends(HandsOfTruth, _super);
    function HandsOfTruth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandsOfTruth.prototype.unload = function () {
        scenes.changeScene(new Vote());
    };
    HandsOfTruth.prototype.load = function () {
        socket.emit('Hands', correction);
        this.bg = loadImage("assets/bg-3.jpg");
        this.size = 72;
        this.drawAnswer = 0;
        this.timer = 10;
        this.round = 1;
        this.label = "Hands of truth";
        textSize(this.size);
        while (this.task != undefined)
            ;
    };
    HandsOfTruth.prototype.update = function () {
        this.redraw();
    };
    HandsOfTruth.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(255);
        if (this.drawAnswer == 1) {
            text("Úloha znela:", (width - textWidth("Úloha znela:")) / 2, height / 2.5);
            if (textWidth(this.task) < width) {
                textSize(this.size);
            }
            else {
                while (textWidth(this.task) > width) {
                    this.size--;
                    textSize(this.size);
                }
            }
            text(this.task, (width - textWidth(this.task)) / 2, height / 2);
            if (frameCount % 60 == 0 && this.timer > 0) {
                this.timer--;
            }
            if (this.timer == 0) {
                if (this.round == 3) {
                    this.unload();
                }
            }
        }
        else {
            textSize(128);
            text(this.label, (width - textWidth(this.label)) / 2, height / 2);
            if (this.round == 1) {
                text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 2, height / 2 + 150);
            }
            if (frameCount % 60 == 0 && this.timer > 0) {
                this.timer--;
            }
            if (this.timer == 0) {
                if (this.round == 2) {
                    this.drawAnswer = 1;
                    this.timer = 20;
                    this.round = 3;
                }
                if (this.round == 1) {
                    //Play GO! sound
                    image(this.bg, 0, 0);
                    this.label = "Teraz!";
                    this.timer = 5;
                    this.round = 2;
                }
            }
        }
    };
    return HandsOfTruth;
}(Scene));
var YouGottaPoint = /** @class */ (function (_super) {
    __extends(YouGottaPoint, _super);
    function YouGottaPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YouGottaPoint.prototype.unload = function () {
        scenes.changeScene(new Vote());
    };
    YouGottaPoint.prototype.load = function () {
        socket.emit('Point', correction);
        this.bg = loadImage('assets/bg-3.png');
        this.size = 72;
        this.drawAnswer = 0;
        this.timer = 10;
        this.round = 1;
        this.label = "You gotta point!";
        while (this.task != undefined)
            ;
    };
    YouGottaPoint.prototype.update = function () {
        this.redraw();
    };
    YouGottaPoint.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(255);
        if (this.drawAnswer == 1) {
            text("Úloha znela:", (width - textWidth("Úloha znela:")) / 2, height / 2.5);
            if (textWidth(this.task) < width) {
                textSize(this.size);
            }
            else {
                while (textWidth(this.task) > width) {
                    this.size--;
                    textSize(this.size);
                }
            }
            text(this.task, (width - textWidth(this.task)) / 2, height / 2);
            if (frameCount % 60 == 0 && this.timer > 0) {
                this.timer--;
            }
            if (this.timer == 0) {
                if (this.round == 3) {
                    this.unload();
                }
            }
        }
        else {
            textSize(128);
            text(this.label, (width - textWidth(this.label)) / 2, height / 2);
            textSize(64);
            if (this.round == 1) {
                text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 2, height / 2 + 150);
            }
            if (frameCount % 60 == 0 && this.timer > 0) {
                this.timer--;
            }
            if (this.timer == 0) {
                if (this.round == 2) {
                    this.drawAnswer = 1;
                    this.timer = 20;
                    this.round = 3;
                }
                if (this.round == 1) {
                    //Play GO! sound
                    image(this.bg, 0, 0);
                    this.label = "Teraz!";
                    this.timer = 5;
                    this.round = 2;
                }
            }
        }
    };
    return YouGottaPoint;
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
var correction;
var url = "";
//SceneManager, canvas variables
var width;
var height;
var scenes;
function setup() {
    //Creating canvas
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    frameRate(60);
    //Initialize Scene
    scenes = new SceneManager();
    scenes.changeScene(new Lobby());
    background(0);
    //Update server with new Room
    socket.emit('createRoom');
    //Get room code
    socket.on('code', function (code) {
        correction = code;
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
    //DB Handeling
    socket.on('HandsTask', function (data) {
        scenes.currScene.task = data;
    });
    socket.on('PointTask', function (data) {
        scenes.currScene.task = data;
    });
}
function draw() {
    scenes.update();
}
function keyPressed() {
    if (key == 'a') {
        scenes.changeScene(new YouGottaPoint());
    }
}
