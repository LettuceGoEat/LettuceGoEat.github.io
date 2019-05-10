$(document).ready(function() {

	$("#next").click(() => {
		var username = $("input[name='username']").val()
		var password = $("input[name='password']").val()

		if (username.length == 0) {
			fail(failReason.USERNAME)
		} else if (password.length == 0) {
			fail(failReason.PASSWORD)
		} else {

			firebase.database().ref('/users/').orderByChild('username').equalTo(username).once("value", (snapshot) => {
				var obj = snapshot.val()
				if(obj != null){
					fail(failReason.USERNAME)
				} else{
					user = {
						username: username,
						password: password
					}
					var newKey = firebase.database().ref('/users/').push()
					newKey.set({user: user,
						key: key})
					next(user)
				}
			})
		}
	})

});

function fail(reason) {
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
			console("signUpFail");
			break;
	}
}

function next(user) {

	//add cookie
	Cookies.set("account", user)

	//change to first page (schedule page)
	window.location.href = "signup_2.html";
}