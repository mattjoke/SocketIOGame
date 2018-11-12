$(document).ready(function(){

	let socket = io();
	let allow_once = [true,true,true];

	$('#create').click( function(){
		$(location).attr('href', 'Game/play.html');
	});

	$('#join').click( function(){
		room = $('#code').val();
		nick = $('#name').val();
		socket.emit('joinRoom',{
			code: room,
			name: nick
		});
		$('.start').hide();
		$('#nick').append(nick);
		$('#lobby').show();
	});

	socket.on('EditUserName', function(username){
		nick = username;
		$('#nick').empty();
		$('#nick').append(nick);
	});

	socket.on('err', function (error) {
		alert(error);
		location.reload();
	});
	//Tasks
	socket.on("task_text", function(){
		if (allow_once[0]) {
			$('#lobby').hide();
			$('#textTask').show();
			allow_once[0] = false;
		}
	});

	$('#meme_button').click(function(){
		$('#textTask').hide();
		$('#nick').show();
		$('#lobby').show();

		socket.emit("TextTaskDone", {
			room: room,
			nick: nick,
			answer: $('#meme_text').val()
		});
	});

	socket.on("pick_answer_task", function(data){
		if (allow_once[1]){
			$("#lobby").hide();
			$("#pickAnswerTask").show();
			for(let i = 0; i < data.length;i++){
				console.log(data[i]);
				if (data[i].nick != nick){
					$("#answers_pick").append('<button>'+data[i].answer+'</button>');
				}
			}
			allow_once[1] = false;
		}

	});

	$(document).on("click", "#answers_pick button", function(){
		let picked = $(this).text();

		$("#answers_pick").hide();
		$("#answers_pick").empty();

		socket.emit("PickAnswerTaskDone", {
			room: room,
			nick: nick,
			picked_answer: picked
		});
	});

});