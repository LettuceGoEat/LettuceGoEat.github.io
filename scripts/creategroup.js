// JavaScript source code

function setup() {
	var acc = Cookies.getJSON('account')
	var selected = {}
	if (acc != null && acc.user != null && acc.user.food != null) {
		$('input[type=checkbox]').each(function(k, v) {
			$(this).prop('checked', acc.user.food[v.name])
		})
		if(!Object.values(Cookies.getJSON("account")["user"].food).includes(false)){
			$('input[name=all]').prop('checked', true)
		}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
		});
	}

	$("input[type=checkbox][name!=all]").on("click", (e) => {
		var val = $(e.target).prop('checked')
		if (val == false) {
			$("input[name=all]").prop('checked', false)
		}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
		});
	})
	console.log(selected)

	var al =document.getElementById('al')
	al.style.display='none'
	$("#headerFindGroup").addClass('selected')


	var sun = $('#sun')
	var mon = $('#mon')
	var tue = $('#tue')
	var wed = $('#wed')
	var thu = $('#thu')
	var fri = $('#fri')
	var sat = $('#sat')
	var lunch = $('#lunch')
	var dinner = $('#dinner')
	var next = $('#next')
	var title = $('#title')
	var mylocation = $('#location')
	var groupsize = $('#groupsize')
	var week = 7
	var time = 2

	function weekgray() {
		sun.removeClass('selected')
		mon.removeClass('selected')
		tue.removeClass('selected')
		wed.removeClass('selected')
		thu.removeClass('selected')
		fri.removeClass('selected')
		sat.removeClass('selected')
	}
	sun.on('click', () => {
		weekgray()
		sun.addClass('selected')
		week = 0
	})
	mon.on('click', () => {
		weekgray()
		mon.addClass('selected')
		week = 1
	})
	tue.on('click', () => {
		weekgray()
		tue.addClass('selected')
		week = 2
	})
	wed.on('click', () => {
		weekgray()
		wed.addClass('selected')
		week = 3
	})
	thu.on('click', () => {
		weekgray()
		thu.addClass('selected')
		week = 4
	})
	fri.on('click', () => {
		weekgray()
		fri.addClass('selected')
		week = 5
	})
	sat.on('click', () => {
		weekgray()
		sat.addClass('selected')
		week = 6
	})
	lunch.on('click', () => {
		lunch.addClass('selected')
		dinner.removeClass('selected')
		time = 0
	})
	dinner.on('click', () => {
		lunch.removeClass('selected')
		dinner.addClass('selected')
		time = 1
	})

	next.on('click', () => {

		if (title.val() == "") {
			animateCSS('#title', 'shake')
		} else if (week == 7) {
			animateCSS('.week', 'shake')
		} else if (time == 2) {
			animateCSS('.time', 'shake')
		} else if (mylocation.val() == "") {
			animateCSS('#location', 'shake')
		} else if (groupsize.val() == "" || Number(groupsize.val())<2 || Number(groupsize.val())>99) {
			animateCSS('#groupsize', 'shake')
		} else {
			var user = Cookies.getJSON("account")
			var newKey = firebase.database().ref('groups').push()
			var date = new Date()
			var day = 1000 * 60 * 60 * 24 //in milliseconds
			var secondKey = firebase.database().ref('/users/' + user["key"]).child('joinedtime').push();
			firebase.database().ref('/users/' + user["key"] + '/joinedtime').once("value", function(datasn) {
				var checkusertime = true;
				for (key in datasn.val()) {
					if (time == 0) {
						if (datasn.val()[key] == date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7)) {
							checkusertime = false
						}
					} else {
						if (datasn.val()[key] == date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7) + 1) {
							checkusertime = false
						}
					}
				}
				if (checkusertime) {
					newKey.child('timestamp').set(date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7))
					newKey.child('title').set(title.val())
					newKey.child('week').set(week)
					newKey.child('time').set(time)
					newKey.child('chat')
					if (time == 0) {
						newKey.child('order').set(date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7))
						secondKey.set(date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7))
					} else {
						newKey.child('order').set(date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7) + 1)
						secondKey.set(date.getTime() - date.getTime() % (day) + day + day * ((week - date.getDay() + 7) % 7) + 1)
					}
					newKey.child('food').set(selected)
					newKey.child('mylocation').set(mylocation.val())
					newKey.child('groupsize').set(groupsize.val())
					newKey.child('members').child('mem1').set(user["key"]).then(function() {
						window.location.href = "schedule.html"+"?joined="+newKey.key
					})
				} else {
					var al =document.getElementById('al')
					var al2 = document.getElementById('al2')
					al.style.display='none'
					al2.onclick = function(){
						al.style.display='none'
					}
					al.style.display = 'block'
				}
			})
		}
	})
}

function toggleFilter() {

	var display = $("#filter").css('display')

	if (display == "block") {
		$("#filter").css('display', 'none')
		$("#tableappend").css('height', '55vh')
	} else if (display == "none") {
		$("#filter").css('display', 'block')
		$("#tableappend").css('height', '36vh')
	} else {
		console.log("ERR: toggleFilter")
	}
}


function selectAll(val) {
	$("input[type=checkbox]").prop('checked', val)
	var selected = {}
	$('input[type=checkbox]').each(function(k, v) {
		selected[v.name] = $(this).prop('checked')
	});
	
}

