/* days corresponds to the ref of the cells of each day;
format is [day,timeOfDay(lunch/dinner)] */
var days = []
/* day of the week*/
var dayOfWeek = new Date().getDay();
/*user corresponds key of the current user for lookup */
var user
/* userDinners corresponds to the dinners of each day;
format is [day,timeOfDay(lunch/dinner)] */
var userDinners = []
/* days of the week in order */
var daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]


$( document ).ready(function() {
  fillDatesInOrder()

  getUser()
  displayDays()
  displayDefaultDinnerInfo()
});



function getUser(){
  user = Cookies.getJSON("user")
}

function getDinners(){

}

function displayDays(){

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

}

function getDayFromIndex(index){
  return ( dayOfWeek+index ) % 7
}

function getIndexFromDay(day){
  return ( dayOfWeek-day ) % 7
}

/*
w.fn.init(38) [div.col-4.nextTitle, div.col-4, div.col-4.nextTitle,
 div.col-2, div.col-4, div.col-2, div.col-4, div.col-2.day, div.col-4.rectangle.rightRect,
  div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
   div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
    div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
     div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
      div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
       div.col-2, div.col-4.rectangle.leftRect, div.col-2.day, div.col-4.rectangle.rightRect,
        div.col-2, div.col-4.rectangle.leftRect, div.col-1, div.col-10.info, div.col-1, prevObject: w.fn.init(10)]
*/





