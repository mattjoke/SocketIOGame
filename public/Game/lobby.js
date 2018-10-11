let questions;
let trivia = [];
let choose;
function start() {
	state = 1;
	for (var i = 0; i < questions.length; i++) {
		trivia.push(questions[i]);
	}
	choose = questions[Math.floor(Math.random()*trivia.length)];
}

function sendQuestionsToDevice(question){
	socket.emit("questions", question);
}