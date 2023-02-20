$(document).ready(function () {
//  search function for input city name 
  $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    $("#search-value").val("");
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
 
  });

  $("#search-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13) {
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
    }
  });

  //check previous searches from local storage
  var history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length > 0) {
    weatherFunction(history[history.length - 1]);
  }
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

    //save the new search   
  function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
  }

  //listener for list item on click function
  $(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
  });

  function weatherFunction(searchTerm) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=ff328c709f930f3f5d34f579f4cc3b87",


    }).then(function (data) {
      console.log(data);
      //if index of search value does not exist
      if (history.indexOf(searchTerm) === -1) {
        //push new searchterm to history array
        history.push(searchTerm);
        //local storage
        localStorage.setItem("history", JSON.stringify(history));
        createRow(searchTerm);
      }
      $("#today").empty();

      var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");


      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
      var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
      console.log(data)


      // merge and add to page
      title.append(img);
      cardBody.append(title, temp, humid, wind);
      card.append(cardBody);
      $("#today").append(card);
      console.log(data);
    });
  }
  // forecast function 
  function weatherForecast(searchTerm) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=ff328c709f930f3f5d34f579f4cc3b87&units=imperial",

    }).then(function (data) {
      console.log(data);
      $("#forecast").html("<h2 class=\"text-bolder\">5-Day Forecast:</h2>").append("<div class=\"row\">");

      //loop to create a new card for 5 days data
      for (var i = 0; i < data.list.length; i++) {

        if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {

          var titleFive = $("<h2>").addClass("card-title text-bolder").text(new Date(data.list[i].dt_txt).toLocaleDateString());
          var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          var colFive = $("<div>").addClass("col-md-2.5");
          var cardFive = $("<div>").addClass("card bg-primary text-white");
          var cardBodyFive = $("<div>").addClass("card-body");
          var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
          var windFive =$("<p>").addClass("card-text").text("Windspeed: "+ data.list[i].wind.speed + "MPH");
          var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
          colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, windFive, humidFive)));
          $("#forecast .row").append(colFive);
        }
      }
    });
  }
});

