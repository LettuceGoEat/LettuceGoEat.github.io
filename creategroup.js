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
	if (title.value == "") {
		animateCSS("#title", 'shake')
	} else if (week == 7) {
		animateCSS(".week", 'shake')
	} else if (time == 2) {
		animateCSS(".time", 'shake')
	} else if (mylocation.value == "") {
		animateCSS("#location", 'shake')
	} else if (groupsize.value == "") {
		animateCSS("#groupsize", 'shake')
	} else {
		var user = Cookies.getJSON("account")

		var newKey = firebase.database().ref('groups').push();
		var da = new Date();
		newKey.child('timestamp').set(da.getTime() + 1000 * 60 * 60 * 24 - da.getTime() % (1000 * 60 * 60 * 24) + 1000 * 60 * 60 * 24 * ((week - da.getDay() + 7) % 7));
		newKey.child('title').set(title.value);
		newKey.child('week').set(week);
		newKey.child('time').set(time);
		newKey.child('mylocation').set(mylocation.value);
		newKey.child('groupsize').set(groupsize.value);
		newKey.child('members').child('mem1').set(user["key"]).then(function() {
			window.location.href = "schedule.html"
		})
	}
})