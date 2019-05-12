
var user
var userKey
var groupKey
var groupMembers

$( document ).ready(function() {
    findAccount()
    readFromDatabase()
    bindEvent()
})

function getGroupMembers(){
    return firebase.database().ref('/groups/' + groupKey + '/members').on('value', function(snapshot) {
        groupMembers = snapshot.val()
        var keyList = Object.keys(myValue)
    });
}
function writeToDatabase(comment, owner) {
  var newKey = firebase.database().ref('/chat/' + groupKey + '/comments').push();
  newKey.set({
    comment: comment,
    owner: owner
  });
}

function eraseTable() {
    $(".container").children().remove()
}
function readFromDatabase() {
  return firebase.database().ref('/chats/' + groupKey + '/comments').on('value', function(snapshot) {
        eraseTable()

        var myValue = snapshot.val()
        var keyList = Object.keys(myValue)

        for(var i=0;i<keyList.length;i++) {
          var myKey = keyList[i]
          addComment(myValue[myKey]["comment"])
        }
    });
}

function findAccount(){
    var account = Cookies.getJSON("account")
    user = account["user"]
    userKey = account["key"]
    groupKey = account["groupChat"]
}

function addComment(comment){

}

function bindEvent() {
  var inputBox = $('myInput')
  var submitBtn = $('submitBtn')

  submitBtn.attr("onclick" , function() {
    var myValue = inputBox.attr("value");
    if(myValue != '') {
      addComment(myValue);
      writeToDatabase(myValue, userKey);
      inputBox.attr("value", "")
    }
  })
}
