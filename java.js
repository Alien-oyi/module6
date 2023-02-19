$(document).ready(function () {
//  search function for input city name 
  $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    $("#search-value").val("");
 
  });

  $("#search-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13) {

    }
  });

  //check previous searches from local storage
  var history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length > 0) {
    W(history[history.length - 1]);
  }
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

