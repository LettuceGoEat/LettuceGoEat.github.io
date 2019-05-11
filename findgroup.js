// JavaScript source code


firebase.database().ref('/groups/').orderByChild('/week/').once("value", function(datasnapshot){
	datasnapshot.forEach((child)=>{
		x = child.val()
		var user = Cookies.getJSON("account")
		var checkinclude = 0;
		var checknumbermember = 0;
		console.log(x.members)
		for(key in x.members){
			checknumbermember = checknumbermember+1;
			/*
			if(x.members[key]==user["key"]){
				checkinclude = 1;
			}
			*/
		}
		if(checkinclude == 1){

		}
		else if(checknumbermember>=x.groupsize.toInt()){
			
		}
		else{
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
			if(x.week==0){
				cell11.innerHTML="Sunday";
			}
			else if(x.week==1){
				cell11.innerHTML="Monday";
			}
			else if(x.week==2){
				cell11.innerHTML="Tuesday";
			}
			else if(x.week==3){
				cell11.innerHTML="Wednesday";
			}
			else if(x.week==4){
				cell11.innerHTML="Thursday";
			}
			else if(x.week==5){
				cell11.innerHTML="Friday";
			}
			else{
					cell11.innerHTML = "Saturday"
			}
			cell11.colSpan = 4;
			cell21.innerHTML=x.title;
			cell21.colSpan = 4;
			if(x.time==0){
				cell31.innerHTML="lunch";
			}
			else{
				cell31.innerHTML="dinner";
			}
			cell32.innerHTML = checknumbermember + "/" + x.groupsize
			cell34.innerHTML="...";
			t.id='content'
			cell11.id = 'contenttitle';
			cell21.id = 'contentintext';
			cell31.id = 'contentmeal';
			cell32.id = 'contentpeople';
			cell33.id = 'contentintext';
			cell34.id = 'contentmore';
			var ta = document.getElementById('tableappend')
			t.className = child.key
			ta.appendChild(t)
			t.addEventListener("click", function(){
				seedetail(this)
			}, {
				once : true
			})
		}
	})
})
function closedetail(t){
	firebase.database().ref('groups/'+t.className).once("value", function(datasnapshot){
		var keys = datasnapshot.val()
		t.deleteRow(1)
		t.deleteRow(1)
		t.deleteRow(1)
		t.deleteRow(1)
		t.deleteRow(1)
		t.deleteRow(1)
		var row2 = t.insertRow(1);
		var row3 = t.insertRow(2);
		var cell21 = row2.insertCell(0);
		var cell31 = row3.insertCell(0);
		var cell32 = row3.insertCell(1);
		var cell33 = row3.insertCell(2);
		var cell34 = row3.insertCell(3);
		cell21.innerHTML=keys.title;
		cell21.colSpan = 4;
		if(keys.time==0){
			cell31.innerHTML="lunch";
		}
		else{
			cell31.innerHTML="dinner";
		}
		
		cell34.innerHTML="...";
		t.id='content'
		cell21.id = 'contentintext';
		cell31.id = 'contentmeal';
		cell32.id = 'contentpeople';
		cell33.id = 'contentintext';
		cell34.id = 'contentmore';
		t.addEventListener("click", function(){
			seedetail(this)
		}, {
			once : true
		})
	})
}

function seedetail(t){
	var ro1 = t.insertRow(3)
	var ro2 = t.insertRow(4)
	var ro3 = t.insertRow(5)
	var ro4 = t.insertRow(6)
	var ro5 = t.insertRow(7)
	var ro6 = t.insertRow(8)
	var c1 = ro1.insertCell(0)
	var c2 = ro2.insertCell(0)
	var c3 = ro3.insertCell(0)
	var c4 = ro4.insertCell(0)
	var c5 = ro5.insertCell(0)
	var c61 = ro6.insertCell(0)
	var c62 = ro6.insertCell(1)
	c1.colSpan = 2;
	c2.colSpan = 2;
	c3.colSpan = 2;
	c4.colSpan = 2;
	c5.colSpan = 2;
	var bbb = document.createElement('button')
	bbb.innerHTML = "Join";
	c62.appendChild(bbb)
	c1.innerHTML = t.rows[1].cells[0].innerHTML;
	c2.innerHTML = ""
	c3.innerHTML = "Day/Time : "+t.rows[0].cells[0].innerHTML + " for "+ t.rows[2].cells[0].innerHTML;
	c4.innerHTML = "People : "+t.rows[2].cells[1].innerHTML;
	c5.innerHTML = "Type(s) : "
	t.deleteRow(1)
	t.deleteRow(1)
	t.addEventListener("click", function(){
		closedetail(this)
	}, {
		once : true
	})
	bbb.onclick = function(){
		var newKey = firebase.database().ref('groups/'+t.className+'/members').push()
		var user = Cookies.getJSON("account")
		newKey.set(user["key"]).then(function(){
			window.location.href = "schedule.html"
		})
	}
}
var cg = document.getElementById('create')
var autof = document.getElementById('autofind')
autof.onclick = function(){
	alert("preparing")
}
cg.onclick = function(){
	window.location.href = "creategroup.html"
}
