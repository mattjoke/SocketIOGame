let socket = io();

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

socket.on('err', function (error) {
	alert(error);
	location.reload();
});
let onlyOnce = true;
socket.on("task_text", function(){
	if (onlyOnce) {
		$('#lobby').hide();
		$('#textTask').show();
		onlyOnce = false;
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
