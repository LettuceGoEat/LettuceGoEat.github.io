/* days corresponds to the ref of the cells of each day;
format is [day,timeOfDay(lunch/dinner)] */
var days = []
/*user corresponds key of the current user for lookup */
var user
/* userDinners corresponds to the dinners of each day;
format is [day,timeOfDay(lunch/dinner)] */
var userDinners = []
/* days of the week in order */
var daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]


$( document ).ready(function() {
  fillDatesInOrder()

  /*getUser()
  .then(result => getDinners())
  .then(result => displayDays())
  .then(result => displayDefaultDinnerInfo())*/
});



function getUser(){

}

function getDinners(){

}

function displayDays(){

}

function fillDatesInOrder(){
  //gets the current day of the week
  /*$(".row").children().each( function(index) => {

    }

  )*/
  var date = new Date();
  var dayOfWeek = daysOfTheWeek[date.getDay()];
  for (var i=0; i < 7; ++i){

  }
  console.log(dayOfWeek)
  console.log($(".row").children())

}

function displayDefaultDinnerInfo(){

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





