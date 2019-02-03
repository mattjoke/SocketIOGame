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
        var pick = round(random(0, 2));
        console.log(pick);
        switch (pick) {
            case 0:
                scenes.changeScene(new RolechooseMovePoint());
                break;
            case 1:
                scenes.changeScene(new RolechooseMoveHands());
                break;
            case 2:
                scenes.changeScene(new RolechooseMoveDice());
                break;
        }
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
        scenes.changeScene(new VoteMoveDead());
    };
    Vote.prototype.load = function () {
        this.timer = 90;
        this.bg = loadImage("assets/Výsluch.jpeg");
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
        translate(width / 2.75, height - height / 4.5);
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
        var pick = round(random(0, 2));
        switch (pick) {
            case 0:
                scenes.changeScene(new HandsOfTruth());
                break;
            case 1:
                scenes.changeScene(new YouGottaPoint());
                break;
            case 2:
                scenes.changeScene(new DiceOfLuck());
                break;
        }
        /*if ((roles_count[0]+roles_count[1]) == roles_count[2]) {
            //EPIC FINALE -> TRUE ENDGAME
        }else if (roles_count[2] < 1) {
            //Finale - Innocents win!
        } else {
            scenes.changeScene(new HandsOfTruth());
        }*/
    };
    Conclusion.prototype.load = function () {
        background(0);
        if (answers.length == 0 && picked.length == 0) {
            this.unload();
        }
        this.bg = loadImage("assets/Dead.jpeg");
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
        this.timer = 30;
        this.redraw();
    };
    Conclusion.prototype.update = function () {
        this.redraw();
    };
    Conclusion.prototype.removePerson = function (id) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == id) {
                players.splice(i, 1);
            }
        }
    };
    Conclusion.prototype.redraw = function () {
        image(this.bg, 0, 0);
        //Draw Title
        fill(0);
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
        //Draw player's name
        textSize(56);
        text(pick[0], width / 2 - textWidth(pick[0]) / 1.4, height / 6.45);
        //Emits dead person to server
        socket.emit('dead', {
            room: correction,
            id: id
        });
        //Draw picked's role
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == pick[0]) {
                this.picked_role = roles[i];
                text(roles[i], width - textWidth(roles[i]) - width / 30, height - height / 3);
            }
        }
        //Timer
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
            this.removePerson(id);
            this.unload();
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
        this.size = 72;
        this.drawAnswer = 0;
        this.timer = 10;
        this.round = 1;
        textSize(this.size);
        while (this.task != undefined)
            ;
    };
    HandsOfTruth.prototype.update = function () {
        this.redraw();
    };
    HandsOfTruth.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(0);
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
            textSize(56);
            if (this.round == 1) {
                text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 2.1, height / 2 + 72);
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
        scenes.changeScene(new PointMoveVote());
    };
    YouGottaPoint.prototype.load = function () {
        socket.emit('Point', correction);
        this.bg = loadImage('assets/YouGottaPoint.jpeg');
        this.size = 56;
        this.drawAnswer = 0;
        this.timer = 10;
        this.round = 1;
        while (this.task != undefined)
            ;
    };
    YouGottaPoint.prototype.update = function () {
        this.redraw();
    };
    YouGottaPoint.prototype.redraw = function () {
        image(this.bg, 0, 0);
        fill(0);
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
            text(this.task, (width - textWidth(this.task)) / 2, height / 2 - 25);
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
            textSize(56);
            if (this.round == 1) {
                text("Na svojom zariadení si prečítajte úlohu.", (width - textWidth("Na svojom zariadení si prečítajte úlohu.")) / 2 + 150, height / 2 - 25);
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
        if (frameCount % 60 == 0) {
            this.unload();
        }
    };
    DiceOfLuck.prototype.redraw = function () {
        image(this.bg, 0, 0);
    };
    return DiceOfLuck;
}(Scene));
var LobbyMoveRolechoose = /** @class */ (function (_super) {
    __extends(LobbyMoveRolechoose, _super);
    function LobbyMoveRolechoose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyMoveRolechoose.prototype.unload = function () {
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
        if ((this.targetX + this.x) < 1 && (this.targetY + this.y) < 1) {
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
