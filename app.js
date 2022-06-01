function getDateTime(currentDate) {
  let today = currentDate;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let hour = today.getHours();
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0` + minute;
  }
  if (hour < 10) {
    hour = `0` + hour;
  }
  return `${day} ${hour}:${minute}`;
}

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = getDateTime(new Date());

function searchCity(city) {
  let apiKey = "08c89d7c2dd394c882a212087337db19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let city = document.querySelector("#city-search");
city.addEventListener("submit", handleSubmit);

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  celsiusTemperature = Math.round(response.data.main.temp);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "08c89d7c2dd394c882a212087337db19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", searchCurrentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = ``;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     <div class="col-2 forecast">
       <p class="mb-0" id="weekday">
         ${day}
       </p>
       <p class="mb-0" id="week-date">
         May 27
       </p>
       <img src="cloudy_s_rain.png" id="weekday-weather-icon" />
       <p>
         <span id="weekday-temp">25°C</span>
         <span id="weekday-temp-min"> 17°C</span>
       </p>
     </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Mexico City");
displayForecast();
