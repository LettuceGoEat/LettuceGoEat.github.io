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


$( document ).ready(function() {
  fillDatesInOrder()
  getUser()
  getDinners().then(() => displayDays()).then( () => displayDefaultDinnerInfo())

})

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
    //append function to the dinner information
    $(".info5").append(goToChatButton)
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
     userDinners.sort( (elemA,elemB) => getIndexFromDay(elemA["week"]) - getIndexFromDay(elemB["week"])  == 0 ? getIndexFromDay(elemB["time"]) - elemA["time"] : getIndexFromDay(elemA["week"]) - getIndexFromDay(elemB["week"]))
     displayInfoForDinner(userDinners[0])
     $(".info1").html("Information on your next dinner:")
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






