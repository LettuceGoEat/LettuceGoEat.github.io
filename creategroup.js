// JavaScript source code

var sun = document.getElementById('sun')
var mon = document.getElementById('mon')
var tue = document.getElementById('tue')
var wed = document.getElementById('wed')
var thu = document.getElementById('thu')
var fri = document.getElementById('fri')
var sat = document.getElementById('sat')
var lunch = document.getElementById('lunch')
var dinner = document.getElementById('dinner')
var next = document.getElementById('next')
var title = document.getElementById('title')
var mylocation = document.getElementById('location')
var groupsize = document.getElementById('groupsize')
var week = 7;
var time = 2;
function weekgray(){
	sun.style.color = 'gray';
	mon.style.color = 'gray';
	tue.style.color = 'gray';
	wed.style.color = 'gray';
	thu.style.color = 'gray';
	fri.style.color = 'gray';
	sat.style.color = 'gray';
}
sun.onclick = function(){
	weekgray();
	sun.style.color = 'black';
	week = 0;
}
mon.onclick = function(){
	weekgray();
	mon.style.color = 'black';
	week = 1;
}
tue.onclick = function(){
	weekgray();
	tue.style.color = 'black';
	week = 2;
}
wed.onclick = function(){
	weekgray();
	wed.style.color = 'black';
	week = 3;
}
thu.onclick = function(){
	weekgray();
	thu.style.color = 'black';
	week = 4;
}
fri.onclick = function(){
	weekgray();
	fri.style.color = 'black';
	week = 5;
}
sat.onclick = function(){
	weekgray();
	sat.style.color = 'black';
	week = 6;
}
lunch.onclick = function(){
	lunch.style.color = 'black';
	dinner.style.color = 'gray';
	time = 0;
}
dinner.onclick = function(){
	lunch.style.color = 'gray';
	dinner.style.color = 'black';
	time = 1;
}

next.onclick = function(){
	if(title.value==""){
		animateCSS("#title", 'shake')
	}
	else if(week==7){
		animateCSS(".week", 'shake')
	}
	else if(time==2){
		animateCSS(".time", 'shake')
	}
	
	else if(mylocation.value==""){
		animateCSS("#location", 'shake')
	}
	else if(groupsize.value==""){
		animateCSS("#groupsize", 'shake')
	}	
	else{
		var user = Cookies.getJSON("account")
		var newKey = firebase.database().ref('groups').push();
		var da = new Date();
		newKey.child('timestamp').set(da.getTime()+1000*60*60*24-da.getTime()%(1000*60*60*24)+1000*60*60*24*((week-da.getDay()+7)%7));
		newKey.child('title').set(title.value);
		newKey.child('week').set(week);
		newKey.child('time').set(time);
		newKey.child('mylocation').set(mylocation.value);
		newKey.child('groupsize').set(groupsize.value);
		newKey.child('members').child('mem1').set(user["key"]).then(function(){
			window.location.href = "schedule.html"
		})
	}
}
