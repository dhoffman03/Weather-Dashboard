var APIKey = "35c957c16012eeb7f6426754f22347c9";

var input = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var history = document.querySelector("#history");
var cityName = document.querySelector("#cityName");
var date = document.querySelector("#currentDate");
var image = document.querySelector("#weatherIcon");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#windSpeed");
var humidity = document.querySelector("#humidity");
var forecast = document.querySelector("#fiveDayResults");

//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history

//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed

//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city