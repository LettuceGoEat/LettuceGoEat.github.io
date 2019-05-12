
var user
var userKey
var groupKey
var groupMembers = {}
var groupInfo

function setup() {

    findAccount()
    getMembers()
    $("#headerSchedule").addClass("selected")
    readFromDatabase()
    bindEvents()
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
    var members = groupInfo["members"]
    members = Object.values(members)
    members = jQuery.map(Object.values(members), (memKey,index) =>{
            return firebase.database().ref('/users/' + memKey ).once('value', function(snapshot) {
                var myValue = snapshot.val()
                if(myValue != null){
                    groupMembers[memKey] = myValue
                }

            });

        })
    Promise.all(members).then( () => initInfo())


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
    //create username
    var bubbleClass = owner == userKey ? "leftBubble" : "rightBubble"
    var userClass = owner == userKey ? "owner" : "other"
    var giveInfoOnUsernameButton =$('<button/>').attr({
        class: "jumpToInfoUserButton "+ userClass,

    }).html(user["username"])

    let commentText =$('<div/>').attr({
        class: "row bubble "+bubbleClass ,
    }).html(comment["comment"])

    let entryRow =$('<div/>').attr({
        class: "row entry",
    })
    let color = getColor(owner)
    let icon =$('<div/>').attr({
        class: "col",
        style:("background-color:" + color),
    })
    let notIcon =$('<div/>').attr({
        class: "col",
    })

    let username =$('<div/>').attr({
        class: "row",
    })

    let commentWrap =$('<div/>').attr({
        class: "row",
    })

    var container = $(".chat")

    username.append(giveInfoOnUsernameButton)

    commentWrap.append(commentText)

    notIcon.append(username)
    notIcon.append(commentWrap)

    entryRow.append(icon)
    entryRow.append(notIcon)

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
    return (owner == userKey ? "purple" : "red")
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
    let info = $('.info')
    let users = $('.users')

    jQuery.each(groupMembers, (index,member) => {
        let nameRow = $('<div/>').attr({
            class: "row",
        })
        let nameCol = $('<div/>').attr({
            class: "col",
        })
        let name = $('<button/>').attr({
            class: "nameButton",
        }).html(member["username"])
        nameCol.append(name)
        nameRow.append(nameCol)
        users.append(nameRow)

    })
}

