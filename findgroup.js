// JavaScript source code

function showthedata(selected, wee, din){
firebase.database().ref('/groups/').orderByChild('order').once("value", function(datasnapshot){
	var compare = 0
	var user = Cookies.getJSON("account")
	firebase.database().ref('/users/'+user["key"]+'/joinedtime/').once("value", function(datasnapshot2){
		var checkusertime = datasnapshot2.val()
		datasnapshot.forEach((child)=>{
			x = child.val()
			var checkinclude = 0;
			var checknumbermember = 0;
			for(key in x.members){
				checknumbermember = checknumbermember+1;
			}
			for(key in checkusertime){
				if(checkusertime[key]==x.order){
					checkinclude =1;
				}
			}
			if(checkinclude == 1){
			   
			}
			else if(checknumbermember>=x.groupsize.toInt){
				
			}
			else if(din=="lunch" && x.time!=0){
			
			}
			else if(din=="dinner" && x.time!=1){
			
			}
			else if(wee=="sunday" && x.week!=0){
			
			}
			else if(wee=="monday" && x.week!=1){
			
			}
			else if(wee=="tuesday" && x.week!=2){
			
			}
			else if(wee=="wednesday" && x.week!=3){
			
			}
			else if(wee=="thursday" && x.week!=4){
			
			}
			else if(wee=="friday" && x.week!=5){
			
			}
			else if(wee=="saturday" && x.week!=6){
			
			}
			else if(!selected.animalProducts && x.food.animalProducts){
			
			}
			else if(!selected.chicken && x.food.chicken){
			
			}
			else if(!selected.dairy && x.food.dairy){
			
			}
			else if(!selected.egg && x.food.egg){
			
			}
			else if(!selected.fish && x.food.fish){
			
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
				if(x.food.all == true){
					cell33.innerHTML = "all";
				}
				else if(x.food.animalProducts == true){
					cell33.innerHTML = "animalProducts...";
				}
				else if(x.food.chicken == true){
					cell33.innerHTML = "chicken...";
				}
				else if(x.food.dairy == true){
					cell33.innerHTML = "dairy...";
				}
				else if(x.food.egg == true){
					cell33.innerHTML = "egg...";
				}
				else if(x.food.fish == true){
					cell33.innerHTML = "fish...";
				}
				else{
					cell33.innerHTML = "None"
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
})
}

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
		var checknumbermember = 0;
		for(key in keys.members){
			checknumbermember = checknumbermember+1;
		}
		cell32.innerHTML = checknumbermember + "/" + keys.groupsize
		if(keys.food.all == true){
			cell33.innerHTML = "all";
		}
		else if(keys.food.animalProducts == true){
			cell33.innerHTML = "animalProducts...";
		}
		else if(keys.food.chicken == true){
			cell33.innerHTML = "chicken...";
		}
		else if(keys.food.dairy == true){
			cell33.innerHTML = "dairy...";
		}
		else if(keys.food.egg == true){
			cell33.innerHTML = "egg...";
		}
		else if(keys.food.fish == true){
			cell33.innerHTML = "fish...";
		}
		else{
			cell33.innerHTML = "None"
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
	firebase.database().ref('groups/'+t.className).once("value", function(datasnapshot){
		var x=datasnapshot.val()
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
		c1.innerHTML = x.title;
		c2.innerHTML = " "
		c3.innerHTML = "Day/Time : "+t.rows[0].cells[0].innerHTML + " for "+ t.rows[2].cells[0].innerHTML;
		c4.innerHTML = "People : "+t.rows[2].cells[1].innerHTML;
		c5.innerHTML = "Type(s) : "
		if(x.food.all == true){
			c5.innerHTML = "Type(s) : all"
		}
		else{
			c5.innerHTML = "Type(s) :"
			if(x.food.animalProducts){
			c5.innerHTML += " animalProducts";
			}
			if(x.food.chicken){
				c5.innerHTML += " chicken";
			}
			if(x.food.dairy){
				c5.innerHTML += " dairy";
			}
			if(x.food.egg){
				c5.innerHTML += " egg";
			}
			if(x.food.fish){
				c5.innerHTML += " fish";
			}
			if(x.food.animalProducts || x.food.chicken || x.food.dairy || x.food.egg || x.food.fish){
				
			}
			else{
				c5.innerHTML += " None"
			}
		}
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
			var secondKey = firebase.database().ref('users/'+user["key"]+'/joinedtime').push()
			firebase.database().ref('groups/'+t.className+'/order').once("value", function(datasnapshot){
				secondKey.set(datasnapshot.val())
			})
			newKey.set(user["key"]).then(function(){
				window.location.href = "schedule.html"
			})
		}
	})
}
var cg = document.getElementById('create')
var autof = document.getElementById('autofind')

cg.onclick = function(){
	window.location.href = "creategroup.html"
}

var acc = Cookies.getJSON('account')
if(acc != null && acc.user != null && acc.user.food != null){
	$('input[type=checkbox]').each(function(k, v) {
		$(this).prop('checked', acc.user.food[v.name])
	})
	var selected = {}
	$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
	});
	var v;
	for(i=0;i<changew.options.length;i++){
		if(changew.options[i].selected == true){
			v = changew.options[i].value;
		}
	}
	var changed = document.getElementById('changed');
	var vv;
	for(i=0;i<changed.options.length;i++){
		if(changed.options[i].selected == true){
			vv = changed.options[i].value;
		}
	}
	showthedata(selected, v, vv);
}

$("input[type=checkbox][name!=all]").on("click", (e)=>{
		var val = $(e.target).prop('checked')
		if(val == false){
			$("input[name=all]").prop('checked', false)
		}
		var selected = {}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
		});
		var v;
		for(i=0;i<changew.options.length;i++){
			if(changew.options[i].selected == true){
				v = changew.options[i].value;
			}
		}
		var changed = document.getElementById('changed');
		var vv;
		for(i=0;i<changed.options.length;i++){
			if(changed.options[i].selected == true){
				vv = changed.options[i].value;
			}
		}
		var ta = document.getElementById('tableappend')
		while (ta.firstChild) {
			 ta.removeChild(ta.firstChild);
		}
		showthedata(selected, v, vv);
})

function selectAll(val) {
	$("input[type=checkbox]").prop('checked', val)
	var selected = {}
	$('input[type=checkbox]').each(function(k, v) {
		selected[v.name] = $(this).prop('checked')
	});
	var changew = document.getElementById('changew');
	var v;
	for(i=0;i<changew.options.length;i++){
		if(changew.options[i].selected == true){
			v = changew.options[i].value;
		}
	}
	var changed = document.getElementById('changed');
	var vv;
	for(i=0;i<changed.options.length;i++){
		if(changed.options[i].selected == true){
			vv = changed.options[i].value;
		}
	}
	var ta = document.getElementById('tableappend')
	while (ta.firstChild) {
		 ta.removeChild(ta.firstChild);
	}
	showthedata(selected, v, vv);
}

function changeweek(){
	var changew = document.getElementById('changew');
	var v;
	for(i=0;i<changew.options.length;i++){
		if(changew.options[i].selected == true){
			v = changew.options[i].value;
		}
	}
	var changed = document.getElementById('changed');
	var vv;
	for(i=0;i<changed.options.length;i++){
		if(changed.options[i].selected == true){
			vv = changed.options[i].value;
		}
	}
	var selected = {}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
	});
	var ta = document.getElementById('tableappend')
	while (ta.firstChild) {
		 ta.removeChild(ta.firstChild);
	}
	showthedata(selected, v, vv);
}
function changedinner(){
	var changed = document.getElementById('changed');
	var vv;
	for(i=0;i<changed.options.length;i++){
		if(changed.options[i].selected == true){
			vv = changed.options[i].value;
		}
	}
	var changew = document.getElementById('changew');
	var v;
	for(i=0;i<changew.options.length;i++){
		if(changew.options[i].selected == true){
			v = changew.options[i].value;
		}
	}
	var selected = {}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
	});
	var ta = document.getElementById('tableappend')
	while (ta.firstChild) {
		 ta.removeChild(ta.firstChild);
	}
	showthedata(selected, v, vv);
}

