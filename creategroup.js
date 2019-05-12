// JavaScript source code

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
	} else if (groupsize.val() == "") {
		animateCSS('#groupsize', 'shake')
	} 
	else {
		var user = Cookies.getJSON("account")
		var newKey = firebase.database().ref('groups').push()
		var date = new Date()
		var day = 1000 * 60 * 60 * 24 //in milliseconds
		var secondKey = firebase.database().ref('/users/'+user["key"]).child('joinedtime').push();
		firebase.database().ref('/users/'+user["key"]+'/joinedtime').once("value", function(datasn){
			var checkusertime = true;
			for(key in datasn.val()){
				if(time ==0){
					if(datasn.val()[key] ==date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7)){
						checkusertime = false
					}
				}
				else{
					if(datasn.val()[key] ==date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7)+1){
						checkusertime = false
					}
				}
			}
			if(checkusertime){
				newKey.child('timestamp').set(date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7))
				newKey.child('title').set(title.val())
				newKey.child('week').set(week)
				newKey.child('time').set(time)
				newKey.child('chat')
				if(time == 0){
					newKey.child('order').set(date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7))
					secondKey.set(date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7))
				}
				else{
					newKey.child('order').set(date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7)+1)
					secondKey.set(date.getTime() - date.getTime() % (day) + day * ((week - date.getDay() + 7) % 7)+1)
				}
				firebase.database().ref('/users/'+user["key"]+'/food').once("value", function(datasnapshot){
					newKey.child('food').set(datasnapshot.val())
				})
				newKey.child('mylocation').set(mylocation.val())
				newKey.child('groupsize').set(groupsize.val())
				newKey.child('members').child('mem1').set(user["key"]).then(function() {
					window.location.href = "schedule.html"
				})
			}
			else{
				alert("you already have schedule in that time")
			}
		})
	}
})
