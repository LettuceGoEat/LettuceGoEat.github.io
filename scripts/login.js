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
				if(obj != null){
					var key = Object.keys(obj)[0]
					var user = obj[key]
					if (user.password == password) {
						login({user: user,
							key: key})
					} else {
						failLogin(failReason.INCORRECT)
					}
				} else{
					failLogin(failReason.INCORRECT)
				}
			})
		}
	})

});

function failLogin(reason) {
	switch (reason) {
		case failReason.USERNAME:
			animateCSS("input[name='username']", 'shake')
			console.log("username");
			break;
		case failReason.PASSWORD:
			animateCSS("input[name='password']", 'shake')
			console.log("password");
			break;
		case failReason.INCORRECT:
			animateCSS("input[name='username']", 'shake')
			animateCSS("input[name='password']", 'shake')
			console.log("incorrect");
			break;
		default:
			console("loginFail");
			break;
	}
}

function login(user) {

	//add cookie
	Cookies.set("account", user)

	//change to first page (schedule page)
	window.location.href = "schedule.html"
}