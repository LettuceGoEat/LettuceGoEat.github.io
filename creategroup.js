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
var week = 0;
var time = 0;
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
	week = 1;
}
mon.onclick = function(){
	weekgray();
	mon.style.color = 'black';
	week = 2;
}
tue.onclick = function(){
	weekgray();
	tue.style.color = 'black';
	week = 3;
}
wed.onclick = function(){
	weekgray();
	wed.style.color = 'black';
	week = 4;
}
thu.onclick = function(){
	weekgray();
	thu.style.color = 'black';
	week = 5;
}
fri.onclick = function(){
	weekgray();
	fri.style.color = 'black';
	week = 6;
}
sat.onclick = function(){
	weekgray();
	sat.style.color = 'black';
	week = 7;
}
lunch.onclick = function(){
	lunch.style.color = 'black';
	dinner.style.color = 'gray';
	time = 1;
}
dinner.onclick = function(){
	lunch.style.color = 'gray';
	dinner.style.color = 'black';
	time = 2;
}

next.onclick = function(){
	console.log(title.innerHTML)
	if(title.value==""){
		alert("please fillin title")
	}
	else if(week==0){
		alert("please select Date")
	}
	else if(time==0){
		alert("please select time")
	}
	
	else if(mylocation.value==""){
		alert("please fillin location")
	}
	else if(groupsize.value==""){
		alert("please fillin group size")
	}	
	else{
	
	}
}





