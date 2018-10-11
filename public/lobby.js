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

