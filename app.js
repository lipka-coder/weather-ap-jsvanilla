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

  //let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  //icon = document.querySelector("#weather-icon").innerHTML;
  //let icon = response.data.weather[0].icon;
  //document.querySelector("#weather-icon").innerHTML = `https://openweathermap.org/img/wn/${icon}@2x.png`;
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

searchCity("Mexico City");

//function showFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temperature");
//let temperature = temperatureElement.innerHTML;
//temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
//}

//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", showFahrenheit);

//function showCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temperature");
//let temperature = temperatureElement.innerHTML;
//temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
//}
//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", showCelsius);

//When someone types the city and clicks Search, axios makes an API call for that place.
//From the call, we can fetch temperature, description, wind, humidity, precipitation.
//When we click CUrrent Location Button, an axios call is made to check the current location (longitude and latitude).
//From that call, we can fetch temperature, description, wind humidity, precipitation.
