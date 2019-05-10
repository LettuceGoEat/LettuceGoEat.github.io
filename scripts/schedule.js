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


$( document ).ready(function() {
  fillDatesInOrder()
  getUser()
  getDinners().then(() => displayDays()).then( () => displayDefaultDinnerInfo())

})

function getUser(){
  var obj = user = Cookies.getJSON("account")
  user = obj["user"]
  userKey = obj["key"]
}

function getDinners(){
  return firebase.database().ref('groups').once("value", (snapshot) => {
        var obj = snapshot.val()
        //not secure but this isn't the point of this project
        if(obj != null){
          userDinners = Object.values(obj).filter( elem => {
            return Object.values(elem["members"]).includes(userKey)
          })
        }
      })
}

function displayInfoForDinner(dinner){
  resetInfo()
  if(dinner != null){
    formatInfo(dinner)
  }
}

function formatInfo(dinner){

  $(".info2").html("You have " + (dinner["dinner"] > 0 ? "dinner" : "lunch") + " on " + daysOfTheWeek[dayOfWeek] + "!")

  $(".info3").html("There are " + 5 + " people planning to come")

  $(".info4").html("Placeholder!!!")

  $(".info5").html("Any questions or confusion on where and when to go?")

  $(".info6").html("Go ask your group members!")


}
function displayDays(){
  for(var i = 0, length1 = userDinners.length; i < length1; i++){
    var dinner = userDinners[i]

    var giveInfoButton =$('<input/>').attr({
        type: "button",
        class: "scheduleButtons"
    })

    giveInfoButton.on('click', function() { displayInfoForDinner("", dinner, ""); })
    $( days[dinner["dinner"]][ getIndexFromDay(dinner["day"])] ) .append(giveInfoButton)

  }
}

function fillDatesInOrder(){

  //gets the current day of the week

  //modify each day cell to be its corresponding day from your current day
  $(".day").each(function( index ) {
     $( this ).html( daysOfTheWeek[ getDayFromIndex( index ) ] )
  })
  days[0] = $(".leftRect")
  days[1] = $(".rightRect")

}

function displayDefaultDinnerInfo(){
  if(userDinners.length > 0){
    userDinners.sort( (elemA,elemB) =>  getIndexFromDay(elemB["day"]) - getIndexFromDay(elemA["day"]) == 0 ? getIndexFromDay(elemB["dinner"]) - getIndexFromDay(elemA["dinner"]) : getIndexFromDay(elemB["day"]) - getIndexFromDay(elemA["day"]))
     displayInfoForDinner(userDinners[0])
     $(".info1").html("This is the information on your next dinner or lunch appointment:")
  } else {
     $(".info1").html("You currently have no dinner scheduled. Find a group you like and join it!")
  }


}

function getDayFromIndex(index){
  return ( dayOfWeek+index ) % 7
}

function getIndexFromDay(day){
  return ( dayOfWeek-day ) % 7
}

function resetInfo(){
  $(".info").html("")
}






