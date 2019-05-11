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
		if(x[key].day==0){
			cell11.innerHTML="Sunday";
		}
		else if(x[key].day==1){
			cell11.innerHTML="Monday";
		}
		else if(x[key].day==2){
			cell11.innerHTML="Tuesday";
		}
		else if(x[key].day==3){
			cell11.innerHTML="Wednesday";
		}
		else if(x[key].day==4){
			cell11.innerHTML="Thursday";
		}
		else if(x[key].day==5){
			cell11.innerHTML="Friday";
		}
		else{
			cell11.innerHTML = "Saturday"
		}
		cell11.colSpan = 4;
		cell21.innerHTML=x[key].name;
		cell21.colSpan = 4;
		if(x[key].dinner==0){
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
	}
})
