$(document).ready(function(){

	let socket = io();
	let allow_once = [true,true,true];

	function pickRandomThief(arr){
		let help = [];
		let role = arr[0];
		let players = arr[1];
		for (var i = 0; i < role.length; i++) {
			if (role[i] == "ZLODEJ") {
				help.push(i);
			}
		}
		return "<br><h6>"+players[help[Math.floor(Math.random()*help.length)]].name+"</h6>";
	}

	$('#btn_role').change(function(){
	    if ($(this).prop('checked')) {
		    $('#roleContent').removeClass('d-none');
	    }else {
	    	$('#roleContent').addClass('d-none');
	    }
    });

	$('#create').click( function(){
		$(location).attr('href', 'Game/index.html');
	});

	$('#join').click( function(){
		room = $('#code').val().toUpperCase();
		nick = $('#name').val();
		socket.emit('joinRoom',{
			code: room,
			name: nick
		});
		$('.start').addClass('d-none');
		$('#nick').append(nick);
		$('#lobby').removeClass('d-none');
	});

	socket.on('EditUserName', function(username){
		nick = username;
		$('#nick').empty();
		$('#nick').append(nick);
	});

	socket.on('err', function (error) {
		$('#exampleModal').modal({backdrop: 'static', keyboard: false})
		if (error == "Odpojené!") {
			$(".modal-body").empty();
			$(".modal-body").append("Hra skončila");
		}
		$("#exampleModalLabel").append(error);
		$("#exampleModal").modal("show");
	});
	//Tasks
	socket.on('roles', function(data){
		let roles = data[0];
		let players = data[1];
		for (let i = 0; i < roles.length;i++){
			if(socket.id == players[i].id){
				$('#role').append('<h3>'+roles[i]+'</h3>');
				switch (roles[i]) {
					case "DETEKTÍV":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je presvedčit ostatných, že tento človek je zlodej:"+pickRandomThief(data));
						break;
					case "NEVINNÝ":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je pomôcť detektívovi nájsť zločincov.");
						break;
					case "ZLODEJ":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je presvedčit ostatných, že nie si zlodej.");
						let partners = [];
						for (var j = 0; j < roles.length; j++) {
							if (roles[j] == "ZLODEJ" && socket.id != players[j].id){
								$('#description').push(players[j]);
							}
						}
						if (partners.length > 0) {
							$('#description').append("Tvoji parťáci sú: ");
							for (var k = 0; k < partners.length; k++) {
								$('#description').append("<strong>"+partners[k]+"</strong>");
							}
						}
						break;
				}
			}
		}
		$('#lobby').addClass('d-none');
		$('#roleTask').removeClass('d-none');
	});

	socket.on("task_text", function(){
		if (allow_once[0]) {
			$('#lobby').addClass('d-none');
			$('#textTask').removeClass('d-none');
			allow_once[0] = false;
		}
	});

	$('#meme_button').click(function(){
		$('#textTask').addClass('d-none');
		$('#nick').removeClass('d-none');
		$('#lobby').removeClass('d-none');

		socket.emit("TextTaskDone", {
			room: room,
			nick: nick,
			answer: $('#meme_text').val()
		});
	});

	socket.on("pick_answer_task", function(data){
		if (allow_once[1]){
			$("#lobby").addClass('d-none');
			$("#pickAnswerTask").removeClass('d-none');
			for(let i = 0; i < data.length;i++){
				if (data[i].nick != nick){
					$("#answers_pick").append('<button>'+data[i].answer+'</button>');
				}
			}
			allow_once[1] = false;
		}

	});

	$(document).on("click", "#answers_pick button", function(){
		let picked = $(this).text();

		$("#answers_pick").addClass('d-none');
		$("#answers_pick").empty();

		socket.emit("PickAnswerTaskDone", {
			room: room,
			nick: nick,
			picked_answer: picked
		});
	});


});