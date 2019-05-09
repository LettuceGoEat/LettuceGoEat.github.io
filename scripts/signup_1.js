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
					fail(failReason.INCORRECT)
				} else{
					user = {
						username: username,
						password: password
					}
					var newKey = firebase.database().ref('/users/').push()
					newKey.set(user)
					next(user)
				}
			})
		}
	})

});

function fail(reason) {
	switch (reason) {
		case failReason.USERNAME:
			console.og("username");
			break;
		case failReason.PASSWORD:
			console.log("password");
			break;l
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
	Cookies.set("user", user)

	//change to first page (schedule page)
	window.location.href = "signup_2.html";
}