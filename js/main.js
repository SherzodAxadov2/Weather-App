const card_details = document.querySelector(".continent");
const weather_icon = document.querySelector(".weather-icon");
const searchBtn = document.querySelector("button");
const searchInput = document.querySelector(".search-input");
const bodyImg = document.querySelector(".body-bg");
const loader = document.querySelector(".loader");

// setWeather
const setWeather = (weather) => {
  document.querySelector("body").classList.remove("animate");
  bodyImg.src = "";
  bodyImg.style.transition = "all 1s";
  document.querySelector("body").classList.add("animate");
  switch (weather.weather[0].main) {
    case "Clouds":
      bodyImg.src = "images/cloudy.jpg";
      break;
    case "Clear":
      bodyImg.src = "images/permission.png";
      break;
    case "Rain":
      bodyImg.src = "images/rain.jpg";
      break;
    case "Snow":
      bodyImg.src = "images/snow.avif";
      break;

    default:
      bodyImg.src = "images/permission.png";
      break;
  }
  card_details.innerHTML = ``;
  card_details.innerHTML += `
      <h2 class="city-name">Weather in ${weather.name}, ${
    weather?.sys?.country
  }</h2>
      <h4 class="temperature">${Math.round(weather.main.temp)} °C</h4>
      <div class="weather">
        <img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@2x.png" alt="sun" class="weather-icon">
        <span class="text">${weather.weather[0].main}</span>
      </div>
      <p class="text">
        Humidity: ${weather.main.humidity}%
      </p>
      <p class="text">Wind Speed: ${weather.wind.speed} km/hr</p>
    `;
};

// get the weather
const getWeather = async (city) => {
  const data = await getData(city);

  return data;
};

// get location
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loader.style.display = "block";

  const cityName = searchInput.value.trim();
  if (cityName) {
    searchInput.value = "";
    getWeather(cityName)
      .then((data) => {
        if (data.name) setWeather(data);
        else
          card_details.innerHTML = `<h2 class="city-name text-center">Location not found</h2>`;
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }
});
