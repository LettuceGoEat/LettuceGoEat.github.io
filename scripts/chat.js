
var user
var userKey
var groupKey
var groupMembers
var groupInfo

function setup() {
    $("#headerSchedule").addClass("selected")
    findAccount()
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
  let inputBox = $('#myInput')
  let submitBtn = $('#submitBtn')
  submitBtn.on("click" , function() {
    var myValue = inputBox.val()
    if(myValue != '') {
      writeToDatabase(myValue, userKey);
      inputBox.val('')
    }
  })
}

function getColor(owner){
    return (owner == userKey ? "purple" : "red")
}
