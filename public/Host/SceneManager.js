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
//Camera movement
var LobbyMoveRolechoose = /** @class */ (function (_super) {
    __extends(LobbyMoveRolechoose, _super);
    function LobbyMoveRolechoose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyMoveRolechoose.prototype.unload = function () {
        stopMusic();
        scenes.changeScene(new Role_assign());
    };
    LobbyMoveRolechoose.prototype.load = function () {
        background(0);
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -268;
        this.y = -47;
        this.targetX = 973;
        this.targetY = 397;
        while (this.bg == undefined)
            ;
    };
    LobbyMoveRolechoose.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    LobbyMoveRolechoose.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return LobbyMoveRolechoose;
}(Scene));
var RolechooseMovePoint = /** @class */ (function (_super) {
    __extends(RolechooseMovePoint, _super);
    function RolechooseMovePoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RolechooseMovePoint.prototype.unload = function () {
        stopMusic();
        scenes.changeScene(new YouGottaPoint());
    };
    RolechooseMovePoint.prototype.load = function () {
        background(0);
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -973;
        this.y = -397;
        this.targetX = 487;
        this.targetY = 1101;
        while (this.bg == undefined)
            ;
    };
    RolechooseMovePoint.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    RolechooseMovePoint.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return RolechooseMovePoint;
}(Scene));
var RolechooseMoveHands = /** @class */ (function (_super) {
    __extends(RolechooseMoveHands, _super);
    function RolechooseMoveHands() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RolechooseMoveHands.prototype.unload = function () {
        stopMusic();
        scenes.changeScene(new HandsOfTruth());
    };
    RolechooseMoveHands.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -973;
        this.y = -397;
        this.targetX = 1427;
        this.targetY = 1084;
        while (this.bg == undefined)
            ;
    };
    RolechooseMoveHands.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    RolechooseMoveHands.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return RolechooseMoveHands;
}(Scene));
var RolechooseMoveDice = /** @class */ (function (_super) {
    __extends(RolechooseMoveDice, _super);
    function RolechooseMoveDice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RolechooseMoveDice.prototype.unload = function () {
        stopMusic();
        scenes.changeScene(new DiceOfLuck());
    };
    RolechooseMoveDice.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -973;
        this.y = -397;
        this.targetX = 2363;
        this.targetY = 1177;
        while (this.bg == undefined)
            ;
    };
    RolechooseMoveDice.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    RolechooseMoveDice.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return RolechooseMoveDice;
}(Scene));
var DiceMoveVote = /** @class */ (function (_super) {
    __extends(DiceMoveVote, _super);
    function DiceMoveVote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiceMoveVote.prototype.unload = function () {
        stopMusic();
        scenes.changeScene(new Vote());
    };
    DiceMoveVote.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2363;
        this.y = -1177;
        this.targetX = -420;
        this.targetY = 1131;
        while (this.bg == undefined)
            ;
    };
    DiceMoveVote.prototype.update = function () {
        var xhelp = abs(this.targetX + this.x);
        var yhelp = abs(this.targetY + this.y);
        if (xhelp < 1 && yhelp < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DiceMoveVote.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DiceMoveVote;
}(Scene));
var PointMoveVote = /** @class */ (function (_super) {
    __extends(PointMoveVote, _super);
    function PointMoveVote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointMoveVote.prototype.unload = function () {
        scenes.changeScene(new Vote());
    };
    PointMoveVote.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -487;
        this.y = -1101;
        this.targetX = -420;
        this.targetY = 1131;
        while (this.bg == undefined)
            ;
    };
    PointMoveVote.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    PointMoveVote.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return PointMoveVote;
}(Scene));
var HandsMoveVote = /** @class */ (function (_super) {
    __extends(HandsMoveVote, _super);
    function HandsMoveVote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandsMoveVote.prototype.unload = function () {
        scenes.changeScene(new Vote());
    };
    HandsMoveVote.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -1427;
        this.y = -1084;
        this.targetX = -420;
        this.targetY = 1131;
        while (this.bg == undefined)
            ;
    };
    HandsMoveVote.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    HandsMoveVote.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return HandsMoveVote;
}(Scene));
var VoteMoveDead = /** @class */ (function (_super) {
    __extends(VoteMoveDead, _super);
    function VoteMoveDead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoteMoveDead.prototype.unload = function () {
        scenes.changeScene(new Conclusion());
    };
    VoteMoveDead.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = 420;
        this.y = -1131;
        this.targetX = 2094;
        this.targetY = 6;
        while (this.bg == undefined)
            ;
    };
    VoteMoveDead.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    VoteMoveDead.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return VoteMoveDead;
}(Scene));
var DeadMoveHands = /** @class */ (function (_super) {
    __extends(DeadMoveHands, _super);
    function DeadMoveHands() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMoveHands.prototype.unload = function () {
        scenes.changeScene(new HandsOfTruth());
    };
    DeadMoveHands.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 1427;
        this.targetY = 1084;
        while (this.bg == undefined)
            ;
    };
    DeadMoveHands.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMoveHands.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMoveHands;
}(Scene));
var DeadMovePoint = /** @class */ (function (_super) {
    __extends(DeadMovePoint, _super);
    function DeadMovePoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMovePoint.prototype.unload = function () {
        scenes.changeScene(new YouGottaPoint());
    };
    DeadMovePoint.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 487;
        this.targetY = 1101;
        while (this.bg == undefined)
            ;
    };
    DeadMovePoint.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMovePoint.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMovePoint;
}(Scene));
var DeadMoveDice = /** @class */ (function (_super) {
    __extends(DeadMoveDice, _super);
    function DeadMoveDice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMoveDice.prototype.unload = function () {
        scenes.changeScene(new DiceOfLuck());
    };
    DeadMoveDice.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 2363;
        this.targetY = 1177;
        while (this.bg == undefined)
            ;
    };
    DeadMoveDice.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMoveDice.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMoveDice;
}(Scene));
var DeadMoveEndInnocents = /** @class */ (function (_super) {
    __extends(DeadMoveEndInnocents, _super);
    function DeadMoveEndInnocents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMoveEndInnocents.prototype.unload = function () {
        scenes.changeScene(new EndInnocents());
    };
    DeadMoveEndInnocents.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 4014;
        this.targetY = 6;
        while (this.bg == undefined)
            ;
    };
    DeadMoveEndInnocents.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMoveEndInnocents.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMoveEndInnocents;
}(Scene));
var DeadMoveEndThiefs = /** @class */ (function (_super) {
    __extends(DeadMoveEndThiefs, _super);
    function DeadMoveEndThiefs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMoveEndThiefs.prototype.unload = function () {
        scenes.changeScene(new EndThief());
    };
    DeadMoveEndThiefs.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 4014;
        this.targetY = 6;
        while (this.bg == undefined)
            ;
    };
    DeadMoveEndThiefs.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMoveEndThiefs.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMoveEndThiefs;
}(Scene));
var DeadMoveEndGame = /** @class */ (function (_super) {
    __extends(DeadMoveEndGame, _super);
    function DeadMoveEndGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadMoveEndGame.prototype.unload = function () {
        scenes.changeScene(new EndGameIntro());
    };
    DeadMoveEndGame.prototype.load = function () {
        this.bg = loadImage('assets/Full.jpeg');
        this.x = -2094;
        this.y = -6;
        this.targetX = 4014;
        this.targetY = 6;
        while (this.bg == undefined)
            ;
    };
    DeadMoveEndGame.prototype.update = function () {
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
            this.unload();
        }
        else {
            this.redraw();
        }
    };
    DeadMoveEndGame.prototype.redraw = function () {
        image(this.bg, this.x, this.y);
        this.x = lerp(this.x, -this.targetX, 0.03);
        this.y = lerp(this.y, -this.targetY, 0.03);
    };
    return DeadMoveEndGame;
}(Scene));
//Scenes with game
var Lobby = /** @class */ (function (_super) {
    __extends(Lobby, _super);
    function Lobby() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lobby.prototype.unload = function () {
        //Changing scene to next one
        scenes.changeScene(new LobbyMoveRolechoose());
    };
    Lobby.prototype.load = function () {
        //loading imags to cache
        this.bg = loadImage("assets/Lobby.jpeg");
    };
    Lobby.prototype.update = function () {
        //Chceking if button is pressed
        width, height - height / 2.3;
        if (mouseX > (width - 823) && mouseX < (width - 138) && mouseY > (height - 429) && mouseY < (height - 90)) {
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
        image(this.bg, 0, 0, width, height);
        //Draw url address
        textSize(24);
        text("Zadajte túto adresu vo svojom prehlidači:", width - textWidth("Zadajte túto adresu vo svojom prehlidači:"), height - height / 2.5 - 64);
        textSize(64);
        text(url, width - textWidth(url), height - height / 2.5);
        //Draw connected players
        textSize(24);
        var step = height - height / 3;
        if (players.length - 1 < 9) {
            for (var i = 0; i < players.length; i++) {
                var player = players[i].name;
                if (player != "Host") {
                    step += 32;
                    text(player, width / 15, step, 60, width);
                }
            }
        }
        else {
            var eight = 8;
            var divisor = 15;
            for (var i = 0; i < players.length; i++) {
                var player = players[i].name;
                if (player != "Host") {
                    if (eight > 0) {
                        step += 32;
                        text(player, width / divisor, step, 60, width);
                        eight--;
                    }
                    if (eight == 0) {
                        step = height - height / 3;
                        eight = 8;
                        divisor -= (15 * .55);
                    }
                }
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
        var pick = round(random(0, 2));
        switch (pick) {
            case 0:
                scenes.changeScene(new RolechooseMovePoint());
                break;
            case 1:
                scenes.changeScene(new RolechooseMoveHands());
                break;
        }
    };
    Role_assign.prototype.update = function () {
        image(this.bg, 0, 0);
        fill(0);
        textSize(64);
        text("Máte 15 sekúnd na pozretie si svojej roly", (width - textWidth("Máte 15 sekúnd na pozretie si svojej roly")) / 2, height / 4);
        textSize(100);
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
            this.unload();
        }
    };
    Role_assign.prototype.redraw = function () {
        socket.emit('roles', [correction, players]);
    };
    Role_assign.prototype.load = function () {
        this.bg = loadImage('assets/RoleChoose.jpeg');
        this.timer = 15;
        var count = floor((players.length - 1) / 3);
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
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            player.role = roles[i];
            players[i] = player;
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
        this.song.stop();
        scenes.changeScene(new VoteMoveDead());
    };
    Vote.prototype.load = function () {
        this.timer = 90;
        this.bg = loadImage("assets/Výsluch.jpeg");
        this.ding = loadSound("assets/ding.mp3");
        this.tick = loadSound("assets/tick.mp3");
        this.song = loadSound('assets/sounds/Vote.mp3');
        this.rCode = roomCode.substring(16);
        socket.emit('vote', [this.rCode, players]);
    };
    Vote.prototype.update = function () {
        this.redraw();
        if (players.length - 1 == answers.length) {
            this.song.stop();
            this.unload();
        }
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
            this.tick.play();
        }
        if (this.timer == 0) {
            this.ding.play();
            this.song.stop();
            this.unload();
        }
        if (this.song.isLoaded() && !this.song.isPlaying()) {
            this.song.setVolume(0.1);
            this.song.play();
        }
    };
    Vote.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw title
        fill(0);
        textSize(32);
        text("Na svojom zariadení si zvoľte,", width / 85, height / 5);
        text(" kto je podľa vás zlodej.", width / 85, height / 5 + 35);
        //Draw selected users
        textSize(42);
        step = height / 6 + 160;
        text("Hráči, ktorí nehlasovali:", width / 85, height / 3);
        textSize(32);
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
                step += 40;
                text(players[i].name, width / 85, step, 60, width);
            }
        }
        //Draw timer
        fill(0);
        translate(width / 2.64 - textWidth(this.timer) / 2, height - height / 5);
        angleMode(DEGREES);
        rotate(17);
        textSize(96);
        text(this.timer, 0, 0);
    };
    return Vote;
}(Scene));
var Conclusion = /** @class */ (function (_super) {
    __extends(Conclusion, _super);
    function Conclusion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Conclusion.prototype.unload = function () {
        this.song.stop();
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == this.picked_id) {
                players.splice(i, 1);
            }
        }
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
        socket.emit("NewRound", correction);
        if ((roles_count[2] == 2 && ((roles_count[0] + roles_count[1]) == roles_count[2])) || (roles_count[2] == 1 && ((roles_count[0] + roles_count[1]) == roles_count[2]))) {
            scenes.changeScene(new EndGameIntro());
        }
        else if (roles_count[2] == 0) {
            scenes.changeScene(new DeadMoveEndInnocents());
        }
        else {
            switch (lastRandomEvent) {
                case "Hands":
                    if (random() < 0.8) {
                        lastRandomEvent = "Point";
                        scenes.changeScene(new DeadMovePoint());
                    }
                    else {
                        lastRandomEvent = "Hands";
                        scenes.changeScene(new DeadMoveHands());
                    }
                    break;
                case "Point":
                    if (random() < 0.8) {
                        lastRandomEvent = "Hands";
                        scenes.changeScene(new DeadMoveHands());
                    }
                    else {
                        lastRandomEvent = "Point";
                        scenes.changeScene(new DeadMovePoint());
                    }
                    break;
            }
        }
    };
    Conclusion.prototype.load = function () {
        background(0);
        this.song = loadSound('assets/sounds/Melancholy.mp3');
        this.bg = loadImage("assets/Dead.jpeg");
        this.timer = 10;
        this.picked_id = -1;
        this.picked_name = "";
        this.picked_role = "";
        this.once = true;
        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            answer = answer[0];
            var isThere = false;
            for (var j = 0; j < picked.length; j++) {
                var help = picked[j];
                if (answer == help[0]) {
                    help[1] += 1;
                    isThere = true;
                }
            }
            if (!isThere) {
                picked.push([answer, 1]);
            }
        }
        if (picked.length < 1) {
            var pick = random(players);
            while (pick.name == "Host") {
                pick = random(players);
            }
            picked.push([pick.name, 1]);
        }
        //Determine who is out
        var tmp = picked[0];
        for (var i = 1; i < picked.length; i++) {
            tmp2 = picked[i];
            if (tmp[1] < tmp2[1]) {
                tmp = tmp2;
            }
        }
        picked = [];
        picked = tmp;
        //Determine out's role and gather ID
        for (var i = 0; i < players.length; i++) {
            if (players[i].name === picked[0]) {
                this.picked_role = players[i].role;
                this.picked_id = players[i].id;
                this.picked_name = players[i].name;
            }
        }
        //Emits dead person to server
        socket.emit('dead', {
            room: correction,
            id: this.picked_id
        });
        this.redraw();
    };
    Conclusion.prototype.update = function () {
        if (this.song.isLoaded() && !this.song.isPlaying()) {
            if (this.once) {
                this.song.setVolume(0.1, 5);
                this.song.play();
                this.once = false;
            }
        }
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
            if (this.timer == 0) {
                this.unload();
            }
            else {
                this.redraw();
            }
        }
    };
    Conclusion.prototype.redraw = function () {
        try {
            image(this.bg, 0, 0);
            //Draw Title
            fill(0);
            textSize(72);
            //Draw player's name
            textSize(56);
            text(this.picked_name, width / 2 - textWidth(this.picked_name) / 1.4, height / 6.45);
            //Draw picked's role
            text(this.picked_role, width - textWidth(this.picked_role) - width / 30, height - height / 3);
        }
        catch (error) {
            console.log("ERRRRRROOORRRR!");
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
        scenes.changeScene(new HandsMoveVote());
    };
    HandsOfTruth.prototype.load = function () {
        socket.emit('Hands', correction);
        this.bg = loadImage("assets/handOfTruth.jpeg");
        this.ding = loadSound("assets/ding.mp3");
        this.timer = 10;
        this.round = 0;
    };
    HandsOfTruth.prototype.update = function () {
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        this.redraw();
    };
    HandsOfTruth.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(0);
        textSize(56);
        text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 1.5, height / 2 + 72);
        if (this.timer == 0 && this.round == 0) {
            this.ding.play();
            this.timer = 5;
            this.round = 1;
        }
        if (this.timer == 0 && this.round == 1) {
            this.unload();
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
        scenes.changeScene(new PointMoveVote());
    };
    YouGottaPoint.prototype.load = function () {
        socket.emit('Point', correction);
        this.bg = loadImage('assets/YouGottaPoint.jpeg');
        this.ding = loadSound("assets/ding.mp3");
        this.timer = 10;
        this.round = 0;
    };
    YouGottaPoint.prototype.update = function () {
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        this.redraw();
    };
    YouGottaPoint.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(0);
        textSize(56);
        text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 1.5, height / 2 - 32);
        if (this.timer == 0 && this.round == 0) {
            this.ding.play();
            this.timer = 5;
            this.round = 1;
        }
        if (this.timer == 0 && this.round == 1) {
            this.unload();
        }
    };
    return YouGottaPoint;
}(Scene));
var EndInnocents = /** @class */ (function (_super) {
    __extends(EndInnocents, _super);
    function EndInnocents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndInnocents.prototype.unload = function () {
        scenes.changeScene(new Lobby());
    };
    EndInnocents.prototype.load = function () {
        this.bg = loadImage('assets/EndScene.png');
        this.soc = loadImage('assets/upjs.png');
        this.textCol = color(252, 206, 58);
        this.move = height + 50;
        this.song = loadSound('assets/sounds/End.mp3');
        this.song_fadeIn = loadSound('assets/sounds/End-FadeIn.mp3');
        this.once = true;
    };
    EndInnocents.prototype.update = function () {
        this.redraw();
        if (this.move < -1170) {
            this.move = height + 50;
        }
        if ((this.song_fadeIn.isLoaded() && this.song.isLoaded()) && !this.song.isPlaying()) {
            if (this.once) {
                this.song_fadeIn.setVolume(0.5, 6);
                this.song_fadeIn.play();
                this.once = false;
            }
            else {
                this.song.play();
            }
        }
    };
    EndInnocents.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw win label
        fill(this.textCol);
        textAlign(LEFT);
        this.textCol = lerpColor(this.textCol, color(0, 0, 0), 0.01);
        textSize(256);
        text("Nevinní", (width - textWidth("Nevinní")) / 2 - 135, height / 2);
        textSize(179);
        text("vyhrali!", (width - textWidth("vyhrali!")) / 2, height / 2 + 130);
        //Draw movie rolling credits
        textSize(40);
        textAlign(CENTER);
        fill(0);
        text("Prípady detektíva LUDUMA\nKto ukradol diamant?\n\nAutor\t\tMatej Hakoš\nFavicon\t\tNick Roach\n\nCelý kód je dostupný na GitHube\nhttps://bit.ly/2SpIqVe\n\nVytvorené ako súťažná práca pre\nsúťaž IHRA\n2018/2019", width - width / 6.5, this.move);
        this.move -= .5;
        //Draw UPJS logo
        image(this.soc, width - width / 3.5, this.move + 650);
    };
    return EndInnocents;
}(Scene));
var EndThief = /** @class */ (function (_super) {
    __extends(EndThief, _super);
    function EndThief() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndThief.prototype.unload = function () {
        scenes.changeScene(new Lobby());
    };
    EndThief.prototype.load = function () {
        this.bg = loadImage('assets/EndScene.png');
        this.soc = loadImage('assets/upjs.png');
        this.song = loadSound('assets/sounds/End.mp3');
        this.song_fadeIn = loadSound('assets/sounds/End-FadeIn.mp3');
        this.textCol = color(252, 206, 58);
        this.move = height + 50;
        this.once = true;
    };
    EndThief.prototype.update = function () {
        if ((this.song_fadeIn.isLoaded() && this.song.isLoaded()) && !this.song.isPlaying()) {
            if (this.once) {
                this.song_fadeIn.setVolume(0.5, 6);
                this.song_fadeIn.play();
                this.once = false;
            }
            else {
                this.song.play();
            }
        }
        this.redraw();
        if (this.move < -1170) {
            this.move = height + 50;
        }
    };
    EndThief.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw win label
        fill(this.textCol);
        textAlign(LEFT);
        this.textCol = lerpColor(this.textCol, color(0, 0, 0), 0.01);
        textSize(256);
        text("Zlodeji", (width - textWidth("Zlodeji")) / 2 - 95, height / 2);
        textSize(179);
        text("vyhrali!", (width - textWidth("vyhrali!")) / 2, height / 2 + 130);
        //Draw movie rolling credits
        textSize(40);
        textAlign(CENTER);
        fill(0);
        text("Prípady detektíva LUDUMA\nKto ukradol diamant?\n\nAutor\t\tMatej Hakoš\nFavicon\t\tNick Roach\n\nCelý kód je dostupný na GitHube\nhttps://bit.ly/2SpIqVe\n\nVytvorené ako súťažná práca pre\nsúťaž IHRA\n2018/2019", width - width / 6.5, this.move);
        this.move -= .5;
        //Draw UPJS logo
        image(this.soc, width - width / 3.5, this.move + 650);
    };
    return EndThief;
}(Scene));
var EndGameIntro = /** @class */ (function (_super) {
    __extends(EndGameIntro, _super);
    function EndGameIntro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndGameIntro.prototype.unload = function () {
        scenes.changeScene(new EndGame());
    };
    EndGameIntro.prototype.load = function () {
        this.bg = loadImage('assets/EndScene.png');
        this.counter = 15;
        this.textCol = color(252, 206, 58);
    };
    EndGameIntro.prototype.update = function () {
        this.redraw();
        if (frameCount % 60 == 0 && this.counter > 0) {
            this.counter--;
        }
        if (this.counter == 0) {
            this.unload();
        }
    };
    EndGameIntro.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(0);
        textSize(128);
        text("Je remíza!", (width - textWidth("Je remíza!")) / 2, height / 3);
        var inc = 75;
        textSize(32);
        text("Zlodeji", (width - textWidth("Zlodeji")) / 3, height - height / 2.8);
        text("Nevinní", (width - textWidth("Nevinní")) / 1.5, height - height / 2.8);
        for (var i = 0; i < players.length; i++) {
            if (players[i].role == "HOST") {
                continue;
            }
            if (players[i].role != "HOST" && players[i].role == "ZLODEJ") {
                text(players[i].name, (width - textWidth(players[i].name)) / 3, height - height / 3 + inc);
            }
            if (players[i].role != "HOST" && (players[i].role == "NEVINNÝ" || players[i].role == "DETEKTÍV")) {
                text(players[i].name, (width - textWidth(players[i].name)) / 1.5, height - height / 3 + inc);
            }
            if (i % 2 == 0) {
                inc += 75;
            }
        }
        fill(this.textCol);
        this.textCol = lerpColor(this.textCol, color(0, 0, 0), 0.01);
        textSize(64);
        text("Je čas zmerať si sily v prestrelke.", (width - textWidth("Je čas zmerať si sily v prestrelke.")) / 2, height / 2);
    };
    return EndGameIntro;
}(Scene));
var EndGame = /** @class */ (function (_super) {
    __extends(EndGame, _super);
    function EndGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndGame.prototype.unload = function () {
        this.song.stop();
        socket.emit('StopEndGame', correction);
        if (this.InnCorr > this.ThiefCorr) {
            scenes.changeScene(new EndInnocents());
        }
        else {
            scenes.changeScene(new EndThief());
        }
    };
    EndGame.prototype.load = function () {
        socket.emit('StartEndGame', correction);
        this.bg = loadImage('assets/EndScene.png');
        this.tick = loadSound('assets/tick.mp3');
        this.ding = loadSound('assets/ding.mp3');
        this.counter = round(random(15, 60));
        this.ThiefCorr = 0;
        this.InnCorr = 0;
        this.song = loadSound('assets/sounds/EndGame.mp3');
    };
    EndGame.prototype.update = function () {
        this.redraw();
        textSize(256);
        text(this.counter, (width - textWidth(this.counter)) / 2, height / 2);
        textSize(128);
        text(this.InnCorr + ":" + this.ThiefCorr, (width - textWidth(this.InnCorr + ":" + this.ThiefCorr)) / 2, height - height / 3);
        if (frameCount % 60 == 0 && this.counter > 0) {
            this.counter--;
            this.tick.play();
        }
        if (this.counter == 0) {
            this.ding.play();
            this.unload();
        }
        if (this.song.isLoaded() && !this.song.isPlaying()) {
            this.song.play();
        }
    };
    EndGame.prototype.redraw = function () {
        image(this.bg, 0, 0);
    };
    return EndGame;
}(Scene));
//Work in progress
var DiceOfLuck = /** @class */ (function (_super) {
    __extends(DiceOfLuck, _super);
    function DiceOfLuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiceOfLuck.prototype.unload = function () {
        scenes.changeScene(new DiceMoveVote());
    };
    DiceOfLuck.prototype.load = function () {
        this.bg = loadImage('assets/DiceOfLuck.jpeg');
    };
    DiceOfLuck.prototype.update = function () {
        this.redraw();
        if (frameCount % 300 == 0) {
            this.unload();
        }
    };
    DiceOfLuck.prototype.redraw = function () {
        image(this.bg, 0, 0);
    };
    return DiceOfLuck;
}(Scene));
//Scene manager
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
        this.currScene = null;
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
var lastRandomEvent = "Hands";
var pause = false;
var font;
//SceneManager, canvas variables
var width;
var height;
var scenes;
function stopMusic() {
    try {
        scenes.currScene.song.stop();
        scenes.currScene.song_fadeIn.stop();
    }
    catch (e) { }
}
function preload() {
    font = loadFont('assets/Pixelate.ttf');
    textFont(font);
}
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
    //Endgame handeling
    socket.on('AddPoint', function (data) {
        if (data[1] == "ZLODEJ") {
            scenes.currScene.ThiefCorr++;
        }
        else {
            scenes.currScene.InnCorr++;
        }
    });
}
function draw() {
    if (pause) {
        textAlign(LEFT);
        fill(0, 0, 0, 150);
        image(scenes.currScene.bg, 0, 0, width, height);
        rect(0, 0, width, height);
        textSize(128);
        fill(255);
        text("Pozastavené", (width - textWidth("Pozastavené")) / 2, height / 2);
        textSize(64);
        text("Stlačte Esc pre pokračovanie", (width - textWidth("Stlačte Esc pre pokračovanie")) / 2, height / 2 + 72);
    }
    else {
        scenes.update();
    }
}
function keyPressed() {
    if (keyCode === ESCAPE) {
        pause = !pause;
        fill(0);
        try {
            scenes.currScene.song.pause();
            scenes.currScene.song_fadeIn.pause();
        }
        catch (e) { }
    }
}
