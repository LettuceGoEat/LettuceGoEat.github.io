const failReason = {
	USERNAME: 0,
	PASSWORD: 1,
	INCORRECT: 2
}


$(document).ready(function() {

	$("#login").click(() => {
		var username = $("input[name='username']").val()
		var password = $("input[name='password']").val()

		if (username.length == 0) {
			failLogin(failReason.USERNAME)
		} else if (password.length == 0) {
			failLogin(failReason.PASSWORD)
		} else {

			firebase.database().ref('/users/').orderByChild('username').equalTo(username).once("value", (snapshot) => {
				var obj = snapshot.val()
				//not secure but this isn't the point of this project
				var key = Object.keys(obj)[0]
				if (obj[key].password == password) {
					login(username)
				} else {
					failLogin(failReason.INCORRECT)
				}
			})
		}
	})

});

function failLogin(reason) {
	switch (reason) {
		case failReason.USERNAME:
			console.log("username");
			break;
		case failReason.PASSWORD:
			console.log("password");
			break;
		case failReason.INCORRECT:
			console.log("incorrect");
			break;
		default:
			console("loginFail");
			break;
	}
}

function login(username) {

	//add cookie
	var cookie = "username=" + username
	console.log(cookie)
	document.cookie = cookie;

	//change to first page (schedule page)
	window.location.href = "schedule.html";
}