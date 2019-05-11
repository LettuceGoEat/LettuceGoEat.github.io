// JavaScript source code


firebase.database().ref('groups').orderByChild('/day').once("value", function(datasnapshot){
	var x = datasnapshot.val();
	for (var key in x){
		var t = document.createElement('table');
		var row1 = t.insertRow(0);
		var row2 = t.insertRow(1);
		var row3 = t.insertRow(2);
		var cell11 = row1.insertCell(0);
		var cell21 = row2.insertCell(0);
		var cell31 = row3.insertCell(0);
		var cell32 = row3.insertCell(1);
		var cell33 = row3.insertCell(2);
		var cell34 = row3.insertCell(3);
		if(x[key].week==0){
			cell11.innerHTML="Sunday";
		}
		else if(x[key].week==1){
			cell11.innerHTML="Monday";
		}
		else if(x[key].week==2){
			cell11.innerHTML="Tuesday";
		}
		else if(x[key].week==3){
			cell11.innerHTML="Wednesday";
		}
		else if(x[key].week==4){
			cell11.innerHTML="Thursday";
		}
		else if(x[key].week==5){
			cell11.innerHTML="Friday";
		}
		else{
			cell11.innerHTML = "Saturday"
		}
		cell11.colSpan = 4;
		cell21.innerHTML=x[key].title;
		cell21.colSpan = 4;
		if(x[key].time==0){
			cell31.innerHTML="lunch";
		}
		else{
			cell31.innerHTML="dinner";
		}
		
		cell34.innerHTML="...";
		t.id='content'
		cell11.id = 'contenttitle';
		cell21.id = 'contentintext';
		cell31.id = 'contentmeal';
		cell32.id = 'contentpeople';
		cell33.id = 'contentintext';
		cell34.id = 'contentmore';
		var ta = document.getElementById('tableappend')
		ta.appendChild(t);
		t.addEventListener("click", function(){
			seedetail(this)
		})
	}
})
function seedetail(t){
	ta2 = document.createElement('table');
	t.appendChild
	var ro1 = t.insertRow(3)
	var ro2 = t.insertRow(4)
	var ro3 = t.insertRow(5)
	var ro4 = t.insertRow(6)
	var ro5 = t.insertRow(7)
	var c1 = ro1.insertCell(0)
	var c2 = ro2.insertCell(0)
	var c3 = ro3.insertCell(0)
	var c4 = ro4.insertCell(0)
	var c5 = ro5.insertCell(0)
	c1.innerHTML = t.rows[1].cells[0].innerHTML;
	c2.innerHTML = ""
	c3.innerHTML = "Day/Time : "+t.rows[0].cells[0].innerHTML + " for "+ t.rows[2].cells[0].innerHTML;
	c4.innerHTML = "People : "+t.rows[2].cells[1].innerHTML;
	c5.innerHTML = "Type(s) : "
	t.deleteRow(1)
	t.deleteRow(1)
}
var cg = document.getElementById('create')
var autof = document.getElementById('autofind')
autof.onclick = function(){
	alert("preparing")
}
cg.onclick = function(){
	window.location.href = "creategroup.html"
}
