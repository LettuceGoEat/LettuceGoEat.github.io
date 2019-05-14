
var user
var userKey
var groupKey
var groupMembers = {}
var groupInfo
var groupCreator

const NUMBER_COLORS = 10;

function setup() {

    findAccount()
    getMembers()
}

function finishSetup(){
    readFromDatabase()
    bindEvents()
    $("#headerSchedule").addClass("selected")
}
function writeToDatabase(comment, owner) {
  var newKey = firebase.database().ref('/chats/' + groupKey + '/comments/').push();
  newKey.set({
    comment: comment,
    owner: owner
  });
}

function eraseTable() {
    $(".entry").remove()
}

function getMembers(){

    return firebase.database().ref('/groups/'+groupKey + '/members/').on('value', function(snap) {
        var obj = snap.val()
        if(obj != null){
            groupMembers = {}
            var members = Object.values(obj)
            members = jQuery.map(Object.values(members), (memKey,index) =>{
                return firebase.database().ref('/users/' + memKey ).once('value', function(snapshot) {
                    var myValue = snapshot.val()
                        if(myValue != null){
                            groupMembers[memKey] = myValue
                        }

                    });

                })

            }
        return Promise.all(members).then( () => {
            initInfo()
            finishSetup()
        })
    })







}
function readFromDatabase() {
  return firebase.database().ref('/chats/' + groupKey + '/comments/').on('value', function(snapshot) {
        eraseTable()

        var myValue = snapshot.val()
        if(myValue != null){
            var keyList = Object.keys(myValue)
            for(var i=0;i<keyList.length;i++) {
              var myKey = keyList[i]
              addComment(myValue[myKey])
            }
            var chat = $(".chat")
            var scrollFor = chat.height() + chat.prop("scrollHeight")

            $(".chat").stop().animate({ scrollTop: scrollFor}, 1000);
        }

    });
}

function findAccount(){
    var account = Cookies.getJSON("account")
    user = account["user"]
    userKey = account["key"]
    groupInfo = account["groupChat"]
    groupKey = groupInfo["key"]
    groupCreator = groupInfo["members"]["mem1"]
}

/*
  <div class="row">
    <div class="col" style="background-color:red;">Span 5</div>
    <div class="col">
      <div class="row">
        <div class="container" style="background-color:green;">Span 2</div>
      </div>
      <div class="row">
        <div class="container" style="background-color:purple;">Span 2</div>
      </div>
    </div>
*/

function addComment(comment){
    var owner = comment["owner"]
    var color = getColor(owner)
    //create username
    var isOwner = owner == userKey
    var bubbleClass = !isOwner ? "leftBubble" : "rightBubble"
    var userClass = !isOwner ? "owner" : "other"
    var isChatCreator = owner == groupCreator

    var giveInfoOnUsernameButton =$('<button/>').attr({
        class: "jumpToInfoUserButton "+ userClass,

    }).html(groupMembers[owner].username)
    giveInfoOnUsernameButton.on("click" , function() {
        $('#showInfoButton').attr("hidden","true")
        $('#hideInfoButton').removeAttr("hidden")
        displayInfoForUser(groupMembers[owner])
        seeMembers()
     }).css("background-color", "hsl(105, 40%, 67%)")/* needs to be same color as body background */



    let commentText =$('<div/>').attr({
        class: "row comment bubble "+bubbleClass ,
    }).html(comment["comment"])

    let entryRow =$('<div/>').attr({
        class: "row entry",
    })

     let iconNameWrapper =$('<div/>').attr({
        class: "col-2",
    })

      let iconRowWrapper =$('<div/>').attr({
        class: "row",
    })

      let nameRowWrapper =$('<div/>').attr({
        class: "row",
    })


    let nameWrapper =$('<div/>').attr({
        class: "col nameDiv",

    })

    let commentWrap =$('<div/>').attr({
        class: "col-10 commentDiv",
    })
    var faClass = isChatCreator ? "fa-crown" : "fa-user"
    let icon =$('<div/>').attr({
        class: "col iconDiv",

    }).addClass("fas "+faClass).css("background-color", getColor(owner)).css("background-blend-mode", "multiply").css("color", getColor(owner)).css("background-color", "hsl(105, 40%, 67%)")/* needs to be same color as body background */

    icon.on("click" , function() {
        $('#showInfoButton').attr("hidden","true")
        $('#hideInfoButton').removeAttr("hidden")
        displayInfoForUser(groupMembers[owner])
        seeMembers()
     })

    var container = $(".chat")

    nameWrapper.append(giveInfoOnUsernameButton)
    nameRowWrapper.append(nameWrapper)

    iconRowWrapper.append(icon)

    iconNameWrapper.append(iconRowWrapper)
    iconNameWrapper.append(nameRowWrapper)

    commentWrap.append(commentText)


    if(!isOwner){
        entryRow.append(iconNameWrapper)
        entryRow.append(commentWrap)
    } else {
        entryRow.append(commentWrap)
        entryRow.append(iconNameWrapper)
    }


    container.append(entryRow)
    //maybe add a remove?

}

function bindEvents() {

    //bind input and submit
    let inputBox = $('#myInput')
    let submitBtn = $('#submitBtn')

    submitBtn.on("click" , function() {
        var myValue = inputBox.val()
        if(myValue != '') {
          writeToDatabase(myValue, userKey);
          inputBox.val('')
        }
    })
    //bind show and hide members, and usersInfo
    let showMembers = $('#showInfoButton')
    let hideMembers = $('#hideInfoButton')

    showMembers.on("click" , function() {
        hideMembers.removeAttr("hidden")
        showMembers.attr("hidden","true")
        seeMembers()
     })
    hideMembers.on("click" , function() {
        showMembers.removeAttr("hidden")
        hideMembers.attr("hidden","true")
        noSeeMembers()
    })
}

function getColor(owner){
    var value = hashString(owner)%NUMBER_COLORS
    value = value >= 0 ? value : value + NUMBER_COLORS
    value = (value*359)/NUMBER_COLORS
    var color = "hsl(" + value +", 70%, 41%)"
    return color
}

function seeMembers(){
    let usersInfo = $('#usersInfo')
    usersInfo.removeAttr("hidden")
    usersInfo.css( { display: "block" } )

}

function noSeeMembers(){
    let usersInfo = $('#usersInfo')
    usersInfo.attr("hidden","true")
    usersInfo.css( { display: "none" } )


}

function initInfo(){
    let usersInfo = $('#usersInfo')

    let users = $('.users')

    jQuery.each(groupMembers, (index,member) => {
        let nameRow = $('<div/>').attr({
            class: "row",
        })
        let nameCol = $('<div/>').attr({
            class: "col",
        })
        let name = $('<button/>').attr({
            class: "nameButton fas fa-question",
        }).html(" " + member["username"])
        nameCol.append(name)
        nameRow.append(nameCol)
        users.append(nameRow)

        //create onclick
        name.on('click', function() {
          displayInfoForUser(member)

       })

    })
}

function displayInfoForUser(member){
    $(".hello").remove()
    var table = $('.info')
    addInfo(member["username"] +  " eats:", table, null)
    var prefs = Object.entries(member["food"])
    const len = prefs.length
    for(var i = 0; i<len;++i){
        if(prefs[i][1]){
            var food = prefs[i][0]
            if(food == "animalProducts"){
                addInfo(" - animal products", table, "green")
            } else {
                addInfo(" - " +food, table, "green")
            }


        }
    }
    addInfo(member["username"] +  " does not eat:", table, null)
    for(var i = 0; i<len;++i){
        if(!prefs[i][1]){
            var food = prefs[i][0]
            if(food == "animalProducts"){
                addInfo(" - animal products", table, "red")
            } else {
                addInfo(" - " +food, table, "red")
            }

        }
    }




}

function addInfo(info,table,color){
    let nameRow
    let nameCol
    if(color == null){
        nameRow = $('<div/>').attr({
            class: "row hello",
            })
        nameCol = $('<div/>').attr({
            class: "col",
        }).html(info).css("color", "black" )
    } else {
        nameRow = $('<div/>').attr({
            class: "row hello",
            })
        nameCol = $('<div/>').attr({
            class: "col",
        }).html(info).css("color", color)
    }

    nameRow.append(nameCol)
    table.append(nameRow)
}

