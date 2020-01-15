var now = moment();
var currentDate = now.format('l');
var cities = ["Altanta", "Los Angeles"];


var APIKey = "2bca8808676f3776bfbc587d4a852ac4";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Atlanta&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city-text").html("<h3>" + response.name + " " + "(" + currentDate + ")" + "</h3>");
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#temp").text("Temperature (F) " + response.main.temp);

        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
});