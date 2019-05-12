/* days corresponds to the ref of the cells of each day;
format is [day,timeOfDay(lunch/dinner)] */
var days = []
/* day of the week*/
var dayOfWeek = new Date().getDay();

/*user corresponds to an object with the user attributes */
var user
/*userKey corresponds to key of the current user for lookup */
var userKey
/* userDinners corresponds to the dinners of each day;
format is [day,timeOfDay(lunch/dinner)] */
var userDinners = []
/* days of the week in order */
var daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

var daysOfTheWeekSmall = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"]


function setup() {
  $("#headerSchedule").addClass("selected")
  fillDatesInOrder()
  getUser()
  getDinners().then(() => displayDays()).then( () => displayDefaultDinnerInfo())
}

function getUser(){
  var obj = Cookies.getJSON("account")
  user = obj["user"]
  userKey = obj["key"]
}

function getDinners(){
  return firebase.database().ref('groups').once("value", (snapshot) => {
        var obj = snapshot.val()
        var keys = Object.keys(obj)
        //not secure but this isn't the point of this project
        if(obj != null){
          userDinners = Object.entries(obj).filter( elem => {
            return Object.values(elem[1]["members"]).includes(userKey)
          }).map( elem => {
              dinner = elem[1]
              dinner["key"] = elem[0]
              return dinner
          })
          userDinners = userDinners.sort( (elemA,elemB) => getIndexFromDay(elemA["week"]) - getIndexFromDay(elemB["week"])  == 0 ? elemA["time"] - elemB["time"] : getIndexFromDay(elemA["week"]) - getIndexFromDay(elemB["week"]))
          /* current timestamp for removind old dinners*/
          var timeStamp = new Date().getTime()
          jQuery.each(userDinners,(index,elem) => elem["i"] = index)
          var oldDinners = userDinners
          oldDinners = oldDinners.filter((elem) => elem["timestamp"] < timeStamp).map((x) => keys[x["i"]])
          userDinners = userDinners.filter((elem) => elem["timestamp"] >= timeStamp)
          removeFromDatabase(oldDinners)
        }
      })
}

function removeFromDatabase(oldDinners){
  for(var i = 0; i < oldDinners.length; ++i){
    firebase.database().ref('/groups/'+oldDinners[i]).remove()
  }
}
function displayInfoForDinner(dinner){
  resetInfo()
  if(dinner != null){
    formatInfo(dinner)
    //create go to chat button
    let goToChatButton =$('<button/>').attr({
        class: "chatButton"
    }).html("Chat")
	//create unjoinbutton
	let unjoinButton =$('<button/>').attr({
        class: "unjoinButton"
    }).html("Leave")
    //add cookie creater and go to chat function
    goToChatButton.on('click', function() {
          //get cookie
          var obj = Cookies.getJSON("account")
          //set cookie to add groupChat dinner
          obj["groupChat"] = dinner
          Cookies.set("account",obj)
          //go to chat page of selected dinner
          window.location.href = "chat.html"

       })
	   unjoinButton.on('click', function(){ 
	   	   var obj = Cookies.getJSON("account")
		   firebase.database().ref('groups/'+dinner.key+'/order').once("value", function(akey){
			   firebase.database().ref('groups/'+dinner.key+'/members').once("value", function(bkey){
					firebase.database().ref('users/'+obj["key"]+'/joinedtime').once("value", function(ckey){
						var savedata1
						var savelength1 = 0;
						for(key in ckey.val()){
							savelength1 += 1
							//remove the joinedtime from the users info
							if(akey.val()==ckey.val()[key]){
								savedata1 = key;
							}
							
						}
						if(savelength1 == 1){
							firebase.database().ref('users/'+obj["key"]+'/joinedtime').remove()
						}
						else{
							firebase.database().ref('users/'+obj["key"]+'/joinedtime/'+savedata1).remove()
						}
						var savedata2
						var savelength2 = 0
						for(key in bkey.val()){
							//remove from the groups member
							savelength2 += 1
							if(bkey.val()[key]==obj["key"]){
								savedata2 = key
							}	
						}
						if(savelength2 == 1){
							firebase.database().ref('groups/'+dinner.key).remove()
						}
						else{
							firebase.database().ref('groups/'+dinner.key+'/members'+savedata2).remove()
						}
					 })
					
			   })
		   }).then(function(){
				setup()
		   })
		  
		  
	   })

    //append function to the dinner information
    $(".info6").append(goToChatButton)
	$(".info6").append(unjoinButton)
  }
}

function formatInfo(dinner){

  $(".info2").html('<b>' + dinner["title"] + '</b>')

  $(".info3").html('<b>' + (dinner["time"] > 0 ? "Dinner" : "Lunch") + '</b>'+ " on " + '<b>' + daysOfTheWeek[dinner["week"]] + "!'</b>'")

  $(".info4").html('<b>'+ dinner["groupsize"] +" people </b> coming ")

  $(".info5").html("Location: " + '<b>' + dinner["mylocation"] + '</b>')


}
function displayDays(){
  for(var i = 0, length1 = userDinners.length; i < length1; i++){
    let dinner = userDinners[i]
    var lunchDinner = (dinner["time"] > 0 ? "dinner" : "lunch")
    let giveInfoButton =$('<button/>').attr({
        class: "scheduleButtons"
    }).html(lunchDinner)

    giveInfoButton.on('click', function() {
          displayInfoForDinner(dinner)
          $(".info1").html("Information on this dinner: ")
          $("button").removeClass("selected")
          giveInfoButton.addClass("selected")

       })
    $( days[dinner["time"]][ getIndexFromDay(dinner["week"])] ) .append(giveInfoButton)

  }
}

function fillDatesInOrder(){

  //gets the current day of the week

  //modify each day cell to be its corresponding day from your current day
  $(".day").each(function( index ) {
     $( this ).html( daysOfTheWeekSmall[ getDayFromIndex( index ) ] )
  })
  days[0] = $(".leftRect")
  days[1] = $(".rightRect")

}

function displayDefaultDinnerInfo(){
  if(userDinners.length > 0){
     var dinner = userDinners[0]
     $( days[dinner["time"]][ getIndexFromDay(dinner["week"])] ).children("button").addClass("selected")
     displayInfoForDinner(userDinners[0])
     $(".info1").html("Information on your next meal:")
  } else {
     $(".info1").html("You currently have no dinner scheduled. ")
     $(".info2").html("Find a group you like and join it! ")

  }



}

function getDayFromIndex(index){
  return ( dayOfWeek+index ) % 7
}

function getIndexFromDay(day){
  var value = ( day-dayOfWeek ) % 7
  return value > 0 ? value : value + 7
}

function resetInfo(){
  $(".info").html("")
}






