//$(document).ready(function(){

	let socket = io();
	let allow_once = [true,true,true, true];
	let dead = false;

	function overlay(){
		if (allow_once[3]) {
			let title = $('#name').val();
			$("body").append("<div id='overlay'><p class='rip'>RIP</p><p class='rip_title'>"+title+"</p></div>");
			$("#overlay")
		      .height(window.innerHeight)
		      .css({
		         'opacity' : 1,
		         'position': 'absolute',
		         'top': 0,
		         'left': 0,
		         'right': 0,
		         'background': 'black url(./Game/assets/RIP.png) no-repeat center center fixed',
		         'width': '100%',
		         'z-index': 5000
		      });
		    $('.rip').css({
		    	'font-size': '84px',
		        'position' : 'absolute',
		        'left' : '47vw',
		        'top' : '30vh',
		        'margin-left' : -$('.overlay').innerWidth()/2,
		        'margin-top' : -$('.overlay').outerHeight()/2
		    });
		    $('.rip_title').css({
		    	'font-size': '64px',
		        'position' : 'absolute',
		        'left' : '35vw',
		        'top' : '45vh',
		        'margin-left' : -$('.overlay').innerWidth()/2,
		        'margin-top' : -$('.overlay').outerHeight()/2
		    });
		    allow_once[3] = false;
		}
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
		$('#exampleModal').modal({backdrop: 'static', keyboard: false});
		if (error == "Odpojené!") {
			$(".modal-body").empty();
			$(".modal-body").append("Hra skončila");
		}
		$("#exampleModalLabel").append(error);
		$("#exampleModal").modal("show");
	});

	socket.on('DeadPlayer', function(data){
		if (socket.id == data) {
			//dead = true;
			overlay();
		}
	});

	if (!dead) {
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


		socket.on('voting', function(data){
			if (allow_once[1]){
				data = data[1];
				$("#roleTask").addClass('d-none');
				$("#roleContent").addClass('d-none');

				$("#Voting").removeClass('d-none');
				for(let i = 0; i < data.length;i++){
					if (data[i].name != nick && data[i].name != "Host"){
						$("#answers_pick").append('<button class="btn btn-secondary">'+data[i].name+'</button>');
					}
				}
				allow_once[1] = false;
			}
		});

		$(document).on("click", "#answers_pick button", function(){
			if (allow_once[2]) {
				let picked = $(this).text();
				$("#answers_pick").addClass('d-none');
				$("#answers_pick").empty();

				socket.emit('VoteSubmit', {
					room: room,
					id: socket.id,
					answer: picked
				});
				allow_once[2] = false;
			}
		});
	}else{
		overlay();
	}
//});