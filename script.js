const apiKey = "1f77a943affd0894d1b98ec4fc28d4e7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchIn = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mist.png"; // Corrected capitalization of Mist
    } else {
      weatherImg.src = "images/clear.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

function handleEnterKey(event) {
  if (event.keyCode === 13) {
    checkWeather(searchIn.value);
  }
}


searchBtn.addEventListener("click", () => {
  checkWeather(searchIn.value);
});

searchIn.addEventListener("keydown", handleEnterKey);
