var firebaseConfig = {
  apiKey: "AIzaSyC4gYItaWV0Qilxl3k8CBwgjpIdKQs_WG8",
  authDomain: "lettucegoeat.firebaseapp.com",
  databaseURL: "https://lettucegoeat.firebaseio.com/",
  projectId: "lettucegoeat",
  storageBucket: "lettucegoeat.appspot.com",
  messagingSenderId: "491280351750",
  appId: "1:491280351750:web:2d45c5065ab4ecdb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const failReason = {
  USERNAME: 0,
  PASSWORD: 1,
  INCORRECT: 2
}

function animateCSS(element, animationName, callback) {
  var el = $(element).addClass('animated ' + animationName)

  function handleAnimationEnd() {
    el.removeClass('animated ' + animationName)
    el.off('animationend')

    if (typeof callback === 'function') callback()
  }

  el.on('animationend', handleAnimationEnd)
}

function hashString(s) {//not my function: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

$(document).ready(function() {

  let viewheight = $(window).height();
  let viewwidth = $(window).width();
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=0.4," + "maximum-scale=0.4, minimum-scale=0.4, user-scalable=no, minimal-ui");

  $("header").load("../header.html", ()=>{
    setup()
  })

});
