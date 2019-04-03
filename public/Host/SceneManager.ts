abstract class Scene{
	abstract update():void;
	abstract redraw():void;
	abstract load():void;
	abstract unload():void;
}
//Camera movement
class LobbyMoveRolechoose extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Role_assign());
	}

	load():void{
		background(0);
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -268;
		this.y = -47;
		this.targetX = 973;
		this.targetY = 397;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMovePoint extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new YouGottaPoint());
	}

	load():void{
		background(0);
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 487;
		this.targetY = 1101;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMoveHands extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new HandsOfTruth());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 1427;
		this.targetY = 1084;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class RolechooseMoveDice extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new DiceOfLuck());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -973;
		this.y = -397;
		this.targetX = 2363;
		this.targetY = 1177;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DiceMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2363;
		this.y = -1177;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		let xhelp = abs(this.targetX+this.x);
		let yhelp = abs(this.targetY+this.y);
		if (xhelp < 1 && yhelp < 1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class PointMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -487;
		this.y = -1101;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class HandsMoveVote extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Vote());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -1427;
		this.y = -1084;
		this.targetX = -420;
		this.targetY = 1131;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class VoteMoveDead extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new Conclusion());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = 420;
		this.y = -1131;
		this.targetX = 2094;
		this.targetY = 6;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveHands extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new HandsOfTruth());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 1427;
		this.targetY = 1084;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMovePoint extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new YouGottaPoint());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 487;
		this.targetY = 1101;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveDice extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new DiceOfLuck());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 2363;
		this.targetY = 1177;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveEndInnocents extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new EndInnocents());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 4014;
		this.targetY = 6;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveEndThiefs extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new EndThief());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 4014;
		this.targetY = 6;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
class DeadMoveEndGame extends Scene{

	private bg: Image;
	private x: number;
	private y: number;
	private targetX: number;
	private targetY: number;

	unload():void{
		scenes.changeScene(new EndGameIntro());
	}

	load():void{
		this.bg = loadImage('assets/Full.jpeg');
		this.x = -2094;
		this.y = -6;
		this.targetX = 4014;
		this.targetY = 6;

		while(this.bg == undefined);
	}

	update():void {
		if ((this.targetX+this.x) < 1 && (this.targetY+this.y)<1) {
			this.unload();
		}else{
			this.redraw();
		}
	}

	redraw():void{
		image(this.bg,this.x,this.y);
		this.x = lerp(this.x, -this.targetX, 0.03);
		this.y = lerp(this.y, -this.targetY, 0.03);
	}
}
//Scenes with game
class Lobby extends Scene{
	private bg: Image;

	unload():void{
		//Changing scene to next one
		scenes.changeScene(new LobbyMoveRolechoose());
	}

	load():void{
		//loading imags to cache
		this.bg = loadImage("assets/Lobby.jpeg");
	}

	update():void {
		//Chceking if button is pressed
		width, height - height/2.3
		if (mouseX > (width - 823)  && mouseX < (width - 138) && mouseY > (height - 429) && mouseY < (height - 90)){
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
		image(this.bg,0,0,width,height);

		//Draw url address
		textSize(24);
		text("Zadajte túto adresu vo svojom prehlidači:", width-textWidth("Zadajte túto adresu vo svojom prehlidači:"), height - height/2.5 - 64);
		textSize(64);
		text(url, width-textWidth(url), height - height/2.5);

		//Draw connected players
		textSize(24);
		let step = height-height/3;
		if (players.length - 1 < 9) {
			for (var i = 0; i < players.length; i++) {
				let player = players[i].name;
				if (player != "Host") {
					step += 32;
					text(player,width/15,step,60,width);
				}
			}
		}else{
			let eight = 8;
			let divisor = 15;
			for (var i = 0; i < players.length; i++) {
				let player = players[i].name;
				if (player != "Host") {
					if (eight > 0) {
						step += 32;
						text(player,width/divisor,step,60,width);
						eight--;
					}
					if(eight == 0){
						step = height-height/3;
						eight = 8;
						divisor -= (15*.55);
					}
				}
			}
		}
		//Draw roomcode
		translate(width-width/2.5,height/3);
		textSize(72);
		angleMode(DEGREES);
		rotate(17);
		text(correction, 0, 0);
	}
}
class Role_assign extends Scene{

	private timer: number;
	private bg: Image;

	unload():void{
		//Starts Game Loop
		let pick = round(random(0,2));
		switch(pick){
			case 0: scenes.changeScene(new RolechooseMovePoint()); break;
			case 1: scenes.changeScene(new RolechooseMoveHands()); break;
		}
	}
	update():void {
		image(this.bg,0,0);
		fill(0);
		textSize(64);
		text("Máte 15 sekúnd na pozretie si svojej roly",(width-textWidth("Máte 15 sekúnd na pozretie si svojej roly"))/2, height/4);
		textSize(100);
		if(frameCount % 60 == 0  && this.timer > 0){
			this.timer--;
		}
		if (this.timer == 0) {
			this.unload();
		}
	}
	redraw():void{
		socket.emit('roles', [correction, players]);
	}
	load():void{
		this.bg = loadImage('assets/RoleChoose.jpeg');
		this.timer = 15;

		let count = floor((players.length-1)/3);
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

		for (var i = 0; i < players.length; i++) {
			let player = players[i];
			player.role = roles[i];
			players[i] = player;
		}

		this.redraw();
	}
}
class Vote extends Scene{

	private bg: Image;
	private tick: Sound;
	private ding: Sound;
	private rCode: string;
	private timer: number;

	private song: Sound;

	unload():void{
		this.song.stop();
		scenes.changeScene(new VoteMoveDead());
	}

	load():void{
		this.timer = 90;
		this.bg = loadImage("assets/Výsluch.jpeg");
		this.ding = loadSound("assets/ding.mp3");
		this.tick = loadSound("assets/tick.mp3");
		this.song = loadSound('assets/sounds/Vote.mp3');
		this.rCode = roomCode.substring(16);
		socket.emit('vote',[this.rCode, players]);
	}

	update():void {
		this.redraw();
		if (players.length-1 == answers.length) {
			this.unload();
		}
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
			this.tick.play();
		}
		if (this.timer == 0) {
			this.ding.play();
			this.unload();
		}
		if(this.song.isLoaded()&&!this.song.isPlaying()){
			this.song.setVolume(0.1);
			this.song.play();
		}
	}

	redraw():void{
		image(this.bg,0,0);
		//Draw title
		fill(0);
		textSize(32);
		text("Na svojom zariadení si zvoľte,",width/85, height/5);
		text(" kto je podľa vás zlodej.", width/85, height/5+35);
		//Draw selected users
		textSize(42);
		step = height/6+160;
		text("Hráči, ktorí nehlasovali:", width/85, height/3);
		textSize(32);
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
				step += 40;
            	text(players[i].name, width/85, step, 60, width);
			}
		}
		//Draw timer
		fill(0);
		translate(width/2.64 - textWidth(this.timer)/2, height - height/5);
		angleMode(DEGREES);
		rotate(17);
		textSize(96);
		text(this.timer,0,0);
	}
}
class Conclusion extends Scene{

	private bg: Image;
	private timer: number;

	private picked_id: string;
	private picked_role: string;
	private picked_name: string;

	unload():void{
		for (var i = 0; i < players.length; i++) {
			if(players[i].id == this.picked_id){
				players.splice(i, 1);
			}
		}
		//pick random events or launch endgame
		answers = [];
		picked = [];

		switch(this.picked_role){
			case "DETEKTÍV": roles_count[0]--; break;
			case "NEVINNÝ": roles_count[1]--; break;
			case "ZLODEJ": roles_count[2]--; break;
		}

		socket.emit("NewRound", correction);

		if ((roles_count[2] == 2 && ((roles_count[0]+roles_count[1]) == roles_count[2])) || (roles_count[2] == 1 && ((roles_count[0]+roles_count[1]) == roles_count[2])) ){
			scenes.changeScene(new EndGameIntro());
		}else if (roles_count[2] == 0) {
			scenes.changeScene(new DeadMoveEndInnocents());
		} else {
			switch(lastRandomEvent){
				case "Hands":
					if(random()<0.8){
						lastRandomEvent = "Point";
						scenes.changeScene(new DeadMovePoint());
					}else{
						lastRandomEvent = "Hands";
						scenes.changeScene(new DeadMoveHands());
					}
					break;
				case "Point":
					if(random()<0.8){
						lastRandomEvent = "Hands";
						scenes.changeScene(new DeadMoveHands());
					}else{
						lastRandomEvent = "Point";
						scenes.changeScene(new DeadMovePoint());
					}
					break;
			}
		}
	}
	load():void{
		background(0);

		this.bg = loadImage("assets/Dead.jpeg");
		this.timer = 10;
		this.picked_id = -1;
		this.picked_name = "";
		this.picked_role = "";

		for (var i = 0; i < answers.length; i++) {
			let answer = answers[i];
			answer = answer[0];
			let isThere = false;
			for (var j = 0; j < picked.length; j++) {
				let help = picked[j];
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
			let pick = random(players);
			while(pick.name == "Host"){
				pick = random(players);
			}
			picked.push([pick.name, 1]);
		}

		//Determine who is out
		let tmp = picked[0];
		for (var i = 1; i < picked.length; i++) {
			tmp2 = picked[i];
			if(tmp[1] < tmp2[1]){
				tmp = tmp2;
			}
		}
		picked = [];
		picked = tmp;
		//Determine out's role and gather ID
		for (var i = 0; i < players.length; i++) {
			if(players[i].name === picked[0]){
				console.log(players);
				this.picked_role = players[i].role;
				this.picked_id = players[i].id;
				this.picked_name = players[i].name;
				console.log(players);
			}
		}

		//Emits dead person to server
		socket.emit('dead', {
			room: correction,
			id: this.picked_id
		});

		this.redraw();
	}
	update():void {
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
			if (this.timer == 0) {
				this.unload();
			}else{
				this.redraw();
			}
		}
	}
	redraw():void{
		try{
			image(this.bg,0,0);
			//Draw Title
			fill(0);
			textSize(72);
	
			//Draw player's name
			textSize(56);
			text(this.picked_name, width/2 - textWidth(this.picked_name)/1.4, height/6.45);
	
			//Draw picked's role
			text(this.picked_role,width-textWidth(this.picked_role)-width/30, height-height/3);
		}catch(error){
			console.log("ERRRRRROOORRRR!");
			console.log(error);
			console.log(picked, players);
		}
	}
}
class HandsOfTruth extends Scene{

	private bg: Image;
	private ding: Sound;
	private round: number;
	private timer: number;

	unload():void{
		scenes.changeScene(new HandsMoveVote());
	}

	load():void{
		socket.emit('Hands', correction);
		this.bg = loadImage("assets/handOfTruth.jpeg");
		this.ding = loadSound("assets/ding.mp3");
		this.timer = 10;
		this.round = 0;
	}
	update():void {
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
		}
		this.redraw();
	}

	redraw():void{
		image(this.bg,0,0);

		fill(0);
		textSize(56);
		text("Na svojom zariadení si prečítajte úlohu.",(width-textWidth("Na svojom zariadení si prečítajte úlohu."))/1.5, height/2+72);
		if (this.timer == 0 && this.round == 0) {
			this.ding.play();
			this.timer = 5;
			this.round = 1;
		}
		if (this.timer == 0 && this.round == 1) {
			this.unload();
		}
	}
}
class YouGottaPoint extends Scene{

	private bg: Image;
	private ding: Sound;
	private round: number;
	private timer: number;

	unload():void{
		scenes.changeScene(new PointMoveVote());
	}

	load():void{
		socket.emit('Point', correction);

		this.bg = loadImage('assets/YouGottaPoint.jpeg');
		this.ding = loadSound("assets/ding.mp3");
		this.timer = 10;
		this.round = 0;
	}

	update():void {
		if(frameCount % 60 == 0 && this.timer > 0){
			this.timer--;
		}
		this.redraw();
	}

	redraw():void{
		image(this.bg,0,0);

		fill(0);
		textSize(56);
		text("Na svojom zariadení si prečítajte úlohu.",(width-textWidth("Na svojom zariadení si prečítajte úlohu."))/1.5, height/2-32);
		if (this.timer == 0 && this.round == 0) {
			this.ding.play();
			this.timer = 5;
			this.round = 1;
		}
		if (this.timer == 0 && this.round == 1) {
			this.unload();
		}
	}
}
class EndInnocents extends Scene{

	private bg: Image;
	private upjs: Image;
	private textCol: color;
	private move: number;

	private song_fadeIn: Sound;
	private song: Sound;
	private once: boolean;

	unload():void{
		scenes.changeScene(new Lobby());
	}

	load():void{
		this.bg = loadImage('assets/EndScene.png');
		this.upjs = loadImage('assets/upjs.png');
		this.textCol = color(252, 206, 58);
		this.move = height + 50;

		this.song = loadSound('assets/sounds/End.mp3');
		this.song_fadeIn = loadSound('assets/sounds/End-FadeIn.mp3');
		this.once = true;
	}

	update():void {
		this.redraw();
		if(this.move < -1170){
			this.move = height + 50;
		}

		if((this.song_fadeIn.isLoaded()&&this.song.isLoaded())&&!this.song.isPlaying()){
			if(this.once){
				this.song_fadeIn.play();
				this.once = false;
			}else{
				this.song.play();
			}
		}
	}

	redraw():void{
		image(this.bg, 0, 0);

		//Draw win label
		fill(this.textCol);
		textAlign(LEFT);
		this.textCol = lerpColor(this.textCol, color(0,0,0), 0.01);
		textSize(256);
		text("Nevinní", (width-textWidth("Nevinní"))/2-135, height/2);
		textSize(179);
		text("vyhrali!", (width-textWidth("vyhrali!"))/2, height/2+130);

		//Draw movie rolling credits
		textSize(40);
		textAlign(CENTER);
		fill(0);
		text(
			"Prípady detektíva LUDUMA\nKto ukradol diamant?\n\nAutor\t\tMatej Hakoš\nFavicon\t\tNick Roach\n\nCelý kód je dostupný na GitHube\nhttps://bit.ly/2SpIqVe\n\nVytvorené ako súťažná práca pre\nsúťaž IHRA\n2018/2019",width-width/6.5, this.move);
		this.move -= .5;

		//Draw UPJS logo
		image(this.upjs, width-width/3.5, this.move + 650);
	}
}
class EndThief extends Scene{

	private bg: Image;
	private upjs: Image;
	private textCol: color;
	private move: number;

	private song_fadeIn: Sound;
	private song: Sound;
	private once: boolean;

	unload():void{
		scenes.changeScene(new Lobby());
	}

	load():void{
		this.bg = loadImage('assets/EndScene.png');
		this.upjs = loadImage('assets/upjs.png');
		this.song = loadSound('assets/sounds/End.mp3');
		this.song_fadeIn = loadSound('assets/sounds/End-FadeIn.mp3');

		this.textCol = color(252, 206, 58);
		this.move = height + 50;
		this.once = true;
	}

	update():void {

		if((this.song_fadeIn.isLoaded()&&this.song.isLoaded())&&!this.song.isPlaying()){
			if(this.once){
				this.song_fadeIn.play();
				this.once = false;
			}else{
				this.song.play();
			}
		}

		this.redraw();
		if(this.move < -1170){
			this.move = height + 50;
		}
	}

	redraw():void{
		image(this.bg, 0, 0);

		//Draw win label
		fill(this.textCol);
		textAlign(LEFT);
		this.textCol = lerpColor(this.textCol, color(0,0,0), 0.01);
		textSize(256);
		text("Zlodeji", (width-textWidth("Zlodeji"))/2-95, height/2);
		textSize(179);
		text("vyhrali!", (width-textWidth("vyhrali!"))/2, height/2+130);

		//Draw movie rolling credits
		textSize(40);
		textAlign(CENTER);
		fill(0);
		text(
			"Prípady detektíva LUDUMA\nKto ukradol diamant?\n\nAutor\t\tMatej Hakoš\nFavicon\t\tNick Roach\n\nCelý kód je dostupný na GitHube\nhttps://bit.ly/2SpIqVe\n\nVytvorené ako súťažná práca pre\nsúťaž IHRA\n2018/2019",width-width/6.5, this.move);
		this.move -= .5;

		//Draw UPJS logo
		image(this.upjs, width-width/3.5, this.move + 650);
	}
}
class EndGameIntro extends Scene{

	private bg: Image;
	private textCol:color;
	private counter: number;

	unload():void{
		scenes.changeScene(new EndGame());
	}

	load():void{
		this.bg = loadImage('assets/EndScene.png');
		this.counter = 15;
		this.textCol = color(252, 206, 58);
		
	}

	update():void {
		this.redraw();
		if(frameCount % 60 == 0 && this.counter > 0){
			this.counter--;
		}
		if (this.counter == 0) {
			this.unload();
		}
	}

	redraw():void{
		image(this.bg,0,0);

		fill(0);
		textSize(128);
		text("Je remíza!", (width-textWidth("Je remíza!"))/2, height/3);

		let inc = 75;
		textSize(32);
		text("Zlodeji", (width-textWidth("Zlodeji"))/3, height - height/2.8);
		text("Nevinní", (width-textWidth("Nevinní"))/1.5, height - height/2.8);
		for (var i = 0; i < players.length; i++) {
			if (players[i].role == "HOST") {
				continue;
			}
			if (players[i].role != "HOST" && players[i].role == "ZLODEJ") {
				text(players[i].name, (width-textWidth(players[i].name))/3, height - height/3 + inc);
			}
			if (players[i].role != "HOST" && (players[i].role == "NEVINNÝ" || players[i].role == "DETEKTÍV")) {
				text(players[i].name, (width-textWidth(players[i].name))/1.5, height - height/3 + inc);
			}
			if (i % 2==0) {
				inc += 75;
			}
		}

		fill(this.textCol);
		this. textCol = lerpColor(this.textCol, color(0,0,0), 0.01);
		textSize(64);
		text("Je čas zmerať si sily v prestrelke.",(width-textWidth("Je čas zmerať si sily v prestrelke."))/2, height/2);
	}
}
class EndGame extends Scene{

	private bg: Image;
	private tick: Sound;
	private ding: Sound;
	private counter: number;
	private song: Sound;

	public InnCorr: number;
	public ThiefCorr: number;

	unload():void{
		this.song.stop();

		socket.emit('StopEndGame', correction);
		if(this.InnCorr > this.ThiefCorr){
			scenes.changeScene(new EndInnocents());
		}else{
			scenes.changeScene(new EndThief());
		}
	}

	load():void{
		socket.emit('StartEndGame', correction);

		this.bg = loadImage('assets/EndScene.png');
		this.tick = loadSound('assets/tick.mp3');
		this.ding = loadSound('assets/ding.mp3');
		this.counter = round(random(15,60));
		this.ThiefCorr = 0;
		this.InnCorr = 0;
		this.song = loadSound('assets/sounds/EndGame.mp3');
	}

	update():void {
		this.redraw();

		textSize(256);
		text(this.counter, (width-textWidth(this.counter))/2,height/2);
		textSize(128);
		text(this.InnCorr+":"+this.ThiefCorr, (width-textWidth(this.InnCorr+":"+this.ThiefCorr))/2,height-height/3);

		if(frameCount % 60 == 0 && this.counter > 0){
			this.counter--;
			this.tick.play();
		}
		if (this.counter == 0) {
			this.ding.play();
			this.unload();
		}

		if(this.song.isLoaded()&&!this.song.isPlaying()){
			this.song.play();
		}

	}

	redraw():void{
		image(this.bg,0,0);
	}
}
//Work in progress
class DiceOfLuck extends Scene{

	private bg: Image;

	unload():void{
		scenes.changeScene(new DiceMoveVote());
	}

	load():void{
		this.bg = loadImage('assets/DiceOfLuck.jpeg');
	}

	update():void {
		this.redraw();
		if(frameCount % 300 == 0){
			this.unload();
		}
	}

	redraw():void{
		image(this.bg,0,0);
	}
}
//Scene manager
class SceneManager{
	currScene: Scene;
	private static instance: SceneManager;

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
		this.currScene = null;
		newScene.load();
		this.currScene = newScene;
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
let correction;
let url = "";
let lastRandomEvent = "Hands";
let pause = false;
//SceneManager, canvas variables
let width;
let height;
let scenes;

function setup(){
	//Creating canvas
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width,height);
	frameRate(60);

	//Initialize Scene
	scenes = new SceneManager();
	scenes.changeScene(new Lobby());
	background(0);

	//Update server with new Room
	socket.emit('createRoom');
	//Get room code
	socket.on('code', function(code){
		correction = code;
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
	//Endgame handeling
	socket.on('AddPoint', function(data){
		if (data[1] == "ZLODEJ") {
			scenes.currScene.ThiefCorr++;
		}else{
			scenes.currScene.InnCorr++;
		}
	});
}

function draw(){
	if (pause) {
		textAlign(LEFT);

		fill(0,0,0,150);
		image(scenes.currScene.bg, 0, 0, width, height);
		rect(0,0,width,height);
		textSize(128);
		fill(255);
		text("Pozastavené", (width-textWidth("Pozastavené"))/2, height/2);
		textSize(64);
		text("Stlačte Esc pre pokračovanie", (width-textWidth("Stlačte Esc pre pokračovanie"))/2, height/2+72);
	}else{
		scenes.update();
	}
}

function keyPressed(){
	if(keyCode === ESCAPE){
		pause = !pause;
		fill(0);
		try {
			scenes.currScene.song.pause();
			scenes.currScene.song_fadeIn.pause();
		} catch (e){}
	}
}