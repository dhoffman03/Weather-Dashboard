function citySearch() {
    var cityName = titleCase($("#search-input")[0].value.trim());

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                $("#city-name")[0].textContent = cityName + " (" + moment().format('MM/DD/YYYY') + ")";

                $("#historic-cities").append('<li class="btn btn-block list-group-item list-group-item city-name">' + cityName);

                const lat = data.coord.lat;
                const lon = data.coord.lon;

                var latLon = lat.toString() + " " + lon.toString();

                localStorage.setItem(cityName, latLon);

                apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

                fetch(apiURL).then(function (newResponse) {
                    if (newResponse.ok) {
                        newResponse.json().then(function (newData) {
                            getCurrentForecast(newData);
                            getFiveDayForecast(newData);

                        })
                    }
                })
            })
        } else {
            alert("Cannot find city!");
        }
    })
}

function getcity(coordinates) {
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&exclude=minutely,hourly&units=imperial&appid=f2c05a37295f90b7db7d346676e806e9";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getCurrentForecast(data);
                getFiveDayForecast(data);

            })
        }
    })

}

function getCurrentForecast(data) {
    $("#weather-content").addClass("visible");

    $("#weather-icon")[0].src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    $("#temp")[0].textContent = "Temperature: " + data.current.temp.toFixed(1) + " F";
    $("#wind-speed")[0].textContent = "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
    $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + " %";
}


function getFiveDayForecast(data) {
    console.log(data);

    ($("#day-1")).html($("#day-1").textContent = moment().add(1, "days").format("MM/DD/YYYY"));
    ($("#img-1")).html($("#img-1").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png"));
    ($("#temp-1")).html($("#temp-1").textContent = "Temperature: " + data.daily[1].temp.day + " F");
    ($("#wind-1")).html($("#wind-1").textContent = "Wind Speed: " + data.daily[1].wind_speed.toFixed(1) + " MPH");
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

// This function applies title case to a city name if there is more than one word.
function titleCase(city) {
    var updatedCity = city.toLowerCase().split(" ");
    var returnedCity = "";
    for (var i = 0; i < updatedCity.length; i++) {
        updatedCity[i] = updatedCity[i][0].toUpperCase() + updatedCity[i].slice(1);
        returnedCity += " " + updatedCity[i];
    }
    return returnedCity;
}

$("#search-btn").on("click", function (e) {
    e.preventDefault();

    citySearch();

})

$("#history").on("click", ".city-name", function () {

    var coordinates = (localStorage.getItem($(this)[0].textContent)).split(" ");
    coordinates[0] = parseFloat(coordinates[0]);
    coordinates[1] = parseFloat(coordinates[1]);

    $("#city-name")[0].textContent = $(this)[0].textContent + " (" + moment().format('M/D/YYYY') + ")";

    getcity(coordinates);
})