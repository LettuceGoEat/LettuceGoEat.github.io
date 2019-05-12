function setup(){

	$("#headerProfile").addClass('selected')

	//if there are already selections show them
	var acc = Cookies.getJSON('account')
	if(acc != null && acc.user != null && acc.user.food != null){
		$('input[type=checkbox]').each(function(k, v) {
			$(this).prop('checked', acc.user.food[v.name])
		})
	}

	$("input[type=checkbox]").on("click", (e)=>{
		var val = $(e.target).prop('checked')
		if(val == false){
			$("input[name=all]").prop('checked', false)
		}
	})


	$("#next").click(() => {

		var selected = {}
		$('input[type=checkbox]').each(function(k, v) {
			selected[v.name] = $(this).prop('checked')
		});
		delete selected.all;	//don't need value for all
		var username = Cookies.getJSON("account").user.username
		firebase.database().ref('/users/').orderByChild('username').equalTo(username).once("value", (snapshot) => {
			var obj = snapshot.val()
			if(obj == null){
				fail(failReason.INCORRECT)
			} else{
				var key = Object.keys(obj)[0]
				var user = obj[key]
				user.food = selected
				var newKey = firebase.database().ref('/users/').child(key).set(user)
				next({user: user,
					key: key})
			}
		})
	})
}


function fail(reason) {
	switch (reason) {
		case failReason.USERNAME:
			console.og("username");
			break;
		case failReason.PASSWORD:
			console.log("password");
			break;
			l
		case failReason.INCORRECT:
			console.log("incorrect");
			break;
		default:
			console("loginFail");
			break;
	}
}

function next(user) {

	//add cookie
	Cookies.set("account", user)

	//change to first page (schedule page)
	window.location.href = "schedule.html";
}

function selectAll(val) {
	$("input[type=checkbox]").prop('checked', val)
}