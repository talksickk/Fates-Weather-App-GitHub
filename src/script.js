//Current Date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let calendar = `${day}. ${month} ${date}, ${year}`;

//Current Time
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
} else {
  hour = hour + "";
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}
let time = `${hour}:${minutes}`;

//innerHTML
let currentDate = document.querySelector("h2.date");
currentDate.innerHTML = `${calendar}`;

let currentTime = document.querySelector("h2.time");
currentTime.innerHTML = `${time}`;

//Search Bar - function: user submits input with event listener, input value is read, city HTML changed to new city
function showWeather(response) {
  console.log(response.data);
  document.querySelector("#name").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let changeWind = document.querySelector("#windspeed");
  changeWind.innerHTML = `${wind} km/h`;
  let description = response.data.weather[0].description;
  console.log(description);
  let changeDescription = document.querySelector("#condition");
  changeDescription.innerHTML = `${description}`;
}

function newCity(event) {
  event.preventDefault();
  let apiKey = "57d25c744a8f547696ba066272f3fb5a";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", newCity);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

//When form hears a "click", it reads the city that was inputted, and then changes the name of the city on the page, and pulls it's temperature information. But how?

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "57d25c744a8f547696ba066272f3fb5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let positionButton = document.querySelector("#locate");
positionButton.addEventListener("click", getCurrentPosition);
