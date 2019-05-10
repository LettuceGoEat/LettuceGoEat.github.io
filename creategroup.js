// JavaScript source code
var firebaseConfig = {
    apiKey: "AIzaSyC4gYItaWV0Qilxl3k8CBwgjpIdKQs_WG8",
    authDomain: "lettucegoeat.firebaseapp.com",
    databaseURL: "https://lettucegoeat.firebaseio.com/",
    projectId: "lettucegoeat",
    storageBucket: "lettucegoeat.appspot.com",
    messagingSenderId: "491280351750",
    appId: "1:491280351750:web:2d45c5065ab4ecdb"
};
firebase.initializeApp(firebaseConfig);
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
var week = "";
var time = "";
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
	week = "sunday";
}
mon.onclick = function(){
	weekgray();
	mon.style.color = 'black';
	week = "monday";
}
tue.onclick = function(){
	weekgray();
	tue.style.color = 'black';
	week = "tuesday";
}
wed.onclick = function(){
	weekgray();
	wed.style.color = 'black';
	week = "wednesday";
}
thu.onclick = function(){
	weekgray();
	thu.style.color = 'black';
	week = "thursday";
}
fri.onclick = function(){
	weekgray();
	fri.style.color = 'black';
	week = "friday";
}
sat.onclick = function(){
	weekgray();
	sat.style.color = 'black';
	week = "saturday";
}
lunch.onclick = function(){
	lunch.style.color = 'black';
	dinner.style.color = 'gray';
	time = "lunch";
}
dinner.onclick = function(){
	lunch.style.color = 'gray';
	dinner.style.color = 'black';
	time = "dinner";
}

next.onclick = function(){
	if(title.value==""){
		alert("please fillin title")
	}
	else if(week==""){
		alert("please select Date")
	}
	else if(time==""){
		alert("please select time")
	}
	
	else if(mylocation.value==""){
		alert("please fillin location")
	}
	else if(groupsize.value==""){
		alert("please fillin group size")
	}	
	else{
		var user = Cookies.getJSON("user")
		var newKey = firebase.database().ref('groups').push();
		newKey.child('title').set(title.value);
		newKey.child('week').set(week);
		newKey.child('time').set(time);
		newKey.child('mylocation').set(mylocation.value);
		newKey.child('groupsize').set(groupsize.value);
		newKey.child('members').child('mem1').set(user.key)
		window.location.href = "schedule.html"
	}
}

