//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
function citySearch() {
    //declare cityName
    var cityName = titleCase($("#search-input")[0].value.trim());

    //request url
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //set date
                $("#city-name")[0].textContent = cityName + " (" + moment().format('MM/DD/YYYY') + ")";

                //create search history list and append to html
                $("#historic-cities").append('<li class="list-group-item text-center city-name">' + cityName);

                //declare latitude and longitude
                const lat = data.coord.lat;
                const lon = data.coord.lon;

                var latLon = lat.toString() + " " + lon.toString();

                //set localStorage key 
                localStorage.setItem(cityName, latLon);

                //request url with lat and lon parameters
                apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

                //check if city exists
                fetch(apiURL).then(function (newResponse) {
                    if (newResponse.ok) {
                        newResponse.json().then(function (newData) {
                            getCurrentForecast(newData);
                            getFiveDayForecast(newData);

                        })
                    }
                })
            })
        //if (!newResponse.ok), then show alert
        } else {
            alert("Cannot find city!");
        }
    })
}

//get city from list
function getcity(coordinates) {
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&exclude=minutely,hourly&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //run forecast functions
                getCurrentForecast(data);
                getFiveDayForecast(data);

            })
        }
    })

}

//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed
//get current weather and add to html
function getCurrentForecast(data) {
    //make weather cards visable
    $("#weather-content").addClass("visible");

    //get weather icon and change resolution "@2x.png"
    $("#weather-icon")[0].src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    //get current temp
    $("#temp")[0].textContent = "Temperature: " + data.current.temp.toFixed(1) + " F";
    //get current wind-speed
    $("#wind-speed")[0].textContent = "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
    //get current humidity
    $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + " %";
}

//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//get five-day forecast and add to html
function getFiveDayForecast(data) {
    console.log(data);

    //get date
    //use .html() to add to index.html file
    ($("#day-1")).html($("#day-1").textContent = moment().add(1, "days").format("MM/DD/YYYY"));
    //get daily[] image
    ($("#img-1")).html($("#img-1").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png"));
    //get daily[] temp
    ($("#temp-1")).html($("#temp-1").textContent = "Temperature: " + data.daily[1].temp.day + " F");
    //get daily[] wind-speed
    ($("#wind-1")).html($("#wind-1").textContent = "Wind Speed: " + data.daily[1].wind_speed.toFixed(1) + " MPH");
    //get daily[] humidity
    ($("#humidity-1")).html($("#humidity-1").textContent = "Humidity: " + data.daily[1].humidity + " %");

    ($("#day-2")).html($("#day-2").textContent = moment().add(2, "days").format("MM/DD/YYYY"));
    ($("#img-2")).html($("#img-2").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png"));
    ($("#temp-2")).html($("#temp-2").textContent = "Temperature: " + data.daily[2].temp.day + " F");
    ($("#wind-2")).html($("#wind-2").textContent = "Wind Speed: " + data.daily[2].wind_speed.toFixed(1) + " MPH");
    ($("#humidity-2")).html($("#humidity-2").textContent = "Humidity: " + data.daily[2].humidity + " %");

    ($("#day-3")).html($("#day-3").textContent = moment().add(3, "days").format("MM/DD/YYYY"));
    ($("#img-3")).html($("#img-3").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png"));
    ($("#temp-3")).html($("#temp-3").textContent = "Temperature: " + data.daily[3].temp.day + " F");
    ($("#wind-3")).html($("#wind-3").textContent = "Wind Speed: " + data.daily[3].wind_speed.toFixed(1) + " MPH");
    ($("#humidity-3")).html($("#humidity-3").textContent = "Humidity: " + data.daily[3].humidity + " %");

    ($("#day-4")).html($("#day-4").textContent = moment().add(4, "days").format("MM/DD/YYYY"));
    ($("#img-4")).html($("#img-4").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png"));
    ($("#temp-4")).html($("#temp-4").textContent = "Temperature: " + data.daily[4].temp.day + " F");
    ($("#wind-4")).html($("#wind-4").textContent = "Wind Speed: " + data.daily[4].wind_speed.toFixed(1) + " MPH");
    ($("#humidity-4")).html($("#humidity-4").textContent = "Humidity: " + data.daily[4].humidity + " %");

    ($("#day-5")).html($("#day-5").textContent = moment().add(5, "days").format("MM/DD/YYYY"));
    ($("#img-5")).html($("#img-5").attr("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png"));
    ($("#temp-5")).html($("#temp-5").textContent = "Temperature: " + data.daily[5].temp.day + " F");
    ($("#wind-5")).html($("#wind-5").textContent = "Wind Speed: " + data.daily[5].wind_speed.toFixed(1) + " MPH");
    ($("#humidity-5")).html($("#humidity-5").textContent = "Humidity: " + data.daily[5].humidity + " %");

}

//applies title case to a city name if there is more than one word
function titleCase(city) {
    var updatedCity = city.toLowerCase().split(" ");
    var returnedCity = "";
    for (var i = 0; i < updatedCity.length; i++) {
        updatedCity[i] = updatedCity[i][0].toUpperCase() + updatedCity[i].slice(1);
        returnedCity += " " + updatedCity[i];
    }
    return returnedCity;
}

//When search is clicked, run citySearch()
$("#search-btn").on("click", function (e) {
    e.preventDefault();

    citySearch();

})

//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
//When history city is clicked, load city data
$("#history").on("click", ".city-name", function () {

    var coordinates = (localStorage.getItem($(this)[0].textContent)).split(" ");
    //convert string to number
    coordinates[0] = parseFloat(coordinates[0]);
    coordinates[1] = parseFloat(coordinates[1]);

    $("#city-name")[0].textContent = $(this)[0].textContent + " (" + moment().format('M/D/YYYY') + ")";

    getcity(coordinates);
})