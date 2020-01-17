var now = moment();
var currentDate = now.format('l');



var APIKey = "2bca8808676f3776bfbc587d4a852ac4";

function cityInfo(city) {
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // // Log the queryURL
      // console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city-text").html("<h3>" + response.name + " " + "(" + currentDate + ")" + "</h3>");
      $("#wind").text("Wind Speed: " + response.wind.speed);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#temp").text("Temperature (F) " + response.main.temp);

      var lat = response.coord.lat;
            var lon = response.coord.lon;
            getUV (lat, lon);
            var iconCode = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            var icon = $("#wicon").attr("src", iconURL);
        });
}

function getUV(lat, lon) {
  // an API call to get UV data an post data to the DOM
  var latitude = lat;
  var longitude = lon;
  var queryUv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;

  $.ajax({
    url: queryUv,
    method: "GET"
  })
    .then(function (response) {
      $("#uv").text("UV Index: " + response.value);
      console.log(response)
    });
};



function renderButtons() {
  var cities = JSON.parse(localStorage.getItem("cities")) || []
  $("#city-list").empty();
  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    a.addClass("city");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $("#city-list").append(a);
  }
}

$("#add-city").on("click", function (event) {
  event.preventDefault();
  var cities = JSON.parse(localStorage.getItem("cities")) || []

  var city = $("#city-input").val().trim();
  cityInfo(city)
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities))
  renderButtons();
});

renderButtons();

$(document).on("click", ".city", function () {
  var city = $(this).attr("data-name");
  cityInfo(city);
});