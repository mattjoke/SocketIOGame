//$(document).ready(function(){

	let socket = io();
	let allow_once = [true,true,true, true, true]; //Handle more than one call
	let dead = false;
	let role;
	let answer;
	let run = false;

	function clearAll(){
		$('#duel').addClass('d-none');
		$('#lobby').addClass('d-none');
		$('#Voting').addClass('d-none');
		$('#thanks').addClass('d-none');
		$('#roleTask').addClass('d-none');
		$('#roleContent').addClass('d-none');
		$('#answers_pick').addClass('d-none');
		$('#HandsPointTask').addClass('d-none');
	}

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
		         'background': 'black url(../Host/assets/RIP.png) no-repeat center center fixed',
		         'width': '100%',
		         'z-index': 1000
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
		    	'font-size': '30px',
		        'position' : 'absolute',
		        'left' : '45vw',
		        'top' : '47vh',
		        'margin-left' : -$('.overlay').innerWidth()/2,
		        'margin-top' : -$('.overlay').outerHeight()/2
		    });
		    allow_once[3] = false;
		}
	}

	$('.probeProbe').on('switchChange.bootstrapSwitch', function (event, state) {
	    if (state) {
		    $('#roleContent').removeClass('d-none');
	    }else {
	    	$('#roleContent').addClass('d-none');
	    }
    });

	$('#create').click( function(){
		$(location).attr('href', 'Game/index.html');
	});

	$('#join').click( function(){
		$('.nick').removeClass('d-none');
		room = $('#code').val().toUpperCase();
		nick = $('#name').val().replace(/ /g, '');
		socket.emit('joinRoom',{
			code: room,
			name: nick
		});
		$('.start').addClass('d-none');
		$('#nick').append(nick);
		$('#lobby').removeClass('d-none');

		$('body').css('background', 'initial');
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
		clearAll();
		if (socket.id == data) {
			overlay();
			dead = true;
		}
	});

	socket.on('NewRound', function(){
		clearAll();
		for (var i = 0; i < allow_once.length; i++) {
			allow_once[i] = true;
		}
	});

	function pickRandomThief(arr){
		let help = [];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].role == "ZLODEJ") {
				help.push(i);
			}
		}
		return "<br><h6>"+arr[help[Math.floor(Math.random()*help.length)]].name+"</h6>";
	}

	socket.on('roles', function(data){
		let players = data;
		for (let i = 0; i < players.length;i++){
			let player = players[i];
			if(socket.id == player.id){
				$('#role').append('<h3>'+player.role+'</h3>');
				switch (player.role) {
					case "DETEKTÍV":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je presvedčit ostatných, že tento človek je zlodej:"+pickRandomThief(players));
						role = player.role;
						break;
					case "NEVINNÝ":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je pomôcť detektívovi nájsť zločincov.");
						role = player.role;
						break;
					case "ZLODEJ":
						$('#description').empty();
						$('#description').append("Tvojou úlohou je presvedčit ostatných, že nie si zlodej.");
						let partners = [];
						for (var j = 0; j < players.length; j++) {
							if (players[j].role == "ZLODEJ" && socket.id != players[j].id){
								partners.push(players[j].name);
							}
						}
						if (partners.length > 0) {
							$('#description').append("<br>Tvoji parťáci sú: ");
							for (var k = 0; k < partners.length; k++) {
								$('#description').append("<strong>"+partners[k]+"</strong>");
							}
						}
						role = player.role;
						break;
				}
			}
		}
		$('#lobby').addClass('d-none');
		$('#roleTask').removeClass('d-none');
	});

	socket.on('HandsTask', function(data){
		if(allow_once[4]){
			clearAll();
			$('#task').empty();
			if(role == "ZLODEJ"){
				$('#task').append("Dvihni ruku... <br>Si zlodej. Nemáš právo vedieť úlohu. Snaž sa zapadnúť tak, aby si ťa nikto nevšimol.");
			}else {
				$('#task').append(data);
			}
			$('#HandsPointTask').removeClass('d-none');
			allow_once[1] = true;
		}
	});

	socket.on('PointTask', function(data){
		if(allow_once[4]){
			clearAll();
			$('#task').empty();
			if(role == "ZLODEJ"){
				$('#task').append("Ukáž na niekoho... <br>Si zlodej. Nemáš právo vedieť úlohu. Snaž sa zapadnúť tak, aby si ťa nikto nevšimol.");
			}else {
				$('#task').append(data);
			}
			$('#HandsPointTask').removeClass('d-none');
			allow_once[1] = true;
		}
	});

	function EndMinigame(){
		if (run) {
			$('#Answer').empty();
			$('#question').empty();

			let operations = ["+","-","x"];

			let first = Math.floor(Math.random() * 30 - 10);
			let second = Math.floor(Math.random() * 15);
			let operation = operations[Math.floor(Math.random() * operations.length)];

			switch(operation){
				case '+': answer = first + second; break;
				case '-': answer = first - second; break;
				case 'x': answer = first * second; break;
			}

			$('#question').append('<p class="lead">'+first+' '+operation+' '+second+'</p>');
		}else{
			$('#duel').addClass('d-none');
		}
	}

	socket.on('StartEnd', function(room){
		clearAll();

		$('#duel').removeClass('d-none');

		run = true;
		EndMinigame();
	});

	socket.on('StopEnd', function(){
		run = false;
		clearAll();
	});

	$('#Answer').bind('input', function(room){
		if($('#Answer').val() == answer){
			let to = $('#code').val().toUpperCase();
			socket.emit('Ping', [to,role]);
			$('#Answer').val('');
			EndMinigame();
		}
	});

	socket.on('voting', function(data){
		if (allow_once[1]){
			clearAll();
			$("#answers_pick").empty();
			data = data[1];

			for(let i = 0; i < data.length;i++){
				if (data[i].name != nick && data[i].name != "Host"){
					$("#answers_pick").append('<button class="btn btn-secondary btn-lg mb-1">'+data[i].name+'</button><br>');
				}
			}

			$('#answers_pick').removeClass('d-none');
			$("#Voting").removeClass('d-none');
			allow_once[2] = true;
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

			$('#lobby').addClass('d-none');
			$('#Voting').addClass('d-none');

			$('#thanks').removeClass('d-none');
			allow_once[2] = false;
		}
	});
//});