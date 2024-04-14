const cityForm = document.getElementById("searchCity");
const forecastContainer = document.getElementById("forecastContainer");
const citiesContainer = document.getElementById("citiesContainer");

// Creates the button
function createCityButton(city) {
  const cityButton = document.createElement("button");
  cityButton.classList.add("btn", "btn-light", "mt-1", "col-12");
  cityButton.setAttribute('data-city', city);
  cityButton.textContent = `${city}`;

  citiesContainer.appendChild(cityButton);
}
function displayInfo(cityArray, city) {
  // Checking and Reseting Forecast Container
  if(forecastContainer.hasAttribute('data-city')){
    forecastContainer.setAttribute('data-city', '');
    forecastContainer.innerHTML = '';
  }

  // Setting City Attribute
  forecastContainer.setAttribute('data-city', city);

  // Changing the background depending on the weather info
  let weatherInfo = cityArray[0].weather[0].main;
  const weatherContainer = document.getElementById("weather_container");
  weatherContainer.setAttribute("class", "text-white");

  if (weatherInfo === "Thunderstorm") {
    weatherContainer.style.backgroundImage =
      "url('./assets/img/thunderstorm.jpg')";
  } else if (weatherInfo === "Drizzle") {
    weatherContainer.style.backgroundImage = "url('./assets/img/drizzle.jpg')";
  } else if (weatherInfo === "Rain") {
    weatherContainer.style.backgroundImage = "url('./assets/img/rain.jpg')";
  } else if (weatherInfo === "Snow") {
    weatherContainer.style.backgroundImage = "url('./assets/img/snow.jpg')";
  } else if (weatherInfo === "Clear") {
    weatherContainer.style.backgroundImage = "url('./assets/img/clear.jpg')";
  } else {
    weatherContainer.style.backgroundImage = "url('./assets/img/clouds.jpg')";
  }

  // Creating Current Day Container
  const todayTemp = Math.round(cityArray[0].main.temp);
  const todayDate = dayjs(cityArray[0].dt_txt).format("ddd D MMM YYYY");
  const todayIconWeather = `https://openweathermap.org/img/wn/${cityArray[0].weather[0].icon}.png`;
  const todayWindSpeed = cityArray[0].wind.speed;
  const todayHumidity = cityArray[0].main.humidity;

  const currentDayContainer = document.createElement("article");
  currentDayContainer.classList.add(
    "col-12",
    "p-4",
    "glass_container",
    "rounded-3",
    "row",
    "shadow"
  );
  currentDayContainer.innerHTML = `<div class="col-7">
  <h2 class="m-0">${city}</h2>
  <p class="m-0">${todayDate}</p>
  <p class="fw-bold fs_temperature">${todayTemp}</p>
</div>`;
  currentDayContainer.innerHTML += ` <div class="col-5 text-end">
<img src="${todayIconWeather}" />
<div class="mt-1">
  <div
    class="glass_container rounded-5 d-inline-flex ps-2 pe-3"
  >
    <span class="material-symbols-outlined"> air </span>
    Wind
  </div>
  <p>${todayWindSpeed} m/s</p>
</div>
<div class="mt-1">
  <div
    class="glass_container rounded-5 d-inline-flex ps-1 pe-3 mt-1"
  >
    <span class="material-symbols-outlined">
      humidity_low
    </span>
    Humidity
  </div>
  <p>${todayHumidity}%</p>
</div>
</div>`;

  forecastContainer.appendChild(currentDayContainer);

  const fiveDayTitle = document.createElement("h2");
  fiveDayTitle.classList.add("mt-3");
  fiveDayTitle.textContent = "5-day forecast:";
  forecastContainer.appendChild(fiveDayTitle);

  const fiveDayContainer = document.createElement("article");
  fiveDayContainer.classList.add("d-grid", "mt-2");
  fiveDayContainer.setAttribute("id", "forecast");
  forecastContainer.appendChild(fiveDayContainer);

  // Looping through the 5-day forecast to create each container
  for (let i = 1; i < cityArray.length; i++) {
    let forecastDate = dayjs(cityArray[i].dt_txt).format("ddd D MMM");
    let forecastTemp = Math.round(cityArray[i].main.temp);
    let forecastIconWeather = `https://openweathermap.org/img/wn/${cityArray[i].weather[0].icon}.png`;
    let forecastWindSpeed = cityArray[i].wind.speed;
    let forecastHumidity = cityArray[i].main.humidity;

    // Creating each container for the forecast
    const forecastDailyContainer = document.createElement("div");
    forecastDailyContainer.classList.add("rounded-3", "glass_container", "p-3");
    forecastDailyContainer.innerHTML = `<h5>${forecastDate}</h5>`;
    forecastDailyContainer.innerHTML += `<p class="forecast_temperature fw-bold">${forecastTemp}</p>`;
    forecastDailyContainer.innerHTML += `<img
    src="${forecastIconWeather}"
    class="d-block"
  />`;
    forecastDailyContainer.innerHTML += `<div class="d-flex">
    <span class="material-symbols-outlined">
        air
        </span>
    <p class="m-0">${forecastWindSpeed} m/s</p>
</div>`;
    forecastDailyContainer.innerHTML += `<div class="d-flex mt-1">
    <span class="material-symbols-outlined"> humidity_low </span>
    <p class="m-0">${forecastHumidity}%</p>
  </div>`;

  fiveDayContainer.appendChild(forecastDailyContainer);
  }
}
function searchCity(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;

  const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51efec98b19c84eb27282dcdc29d86a8&units=metric`;
  if (city !== "") {
    fetch(weatherApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const apiDate = dayjs(data.list[0].dt_txt);
        const apiCity = data.city.name;

        const cityArray = [];

        // Creating the next five days for the forecast
        for (let i = 0; i <= 5; i++) {
          let nextDay = apiDate.add(i, "day");
          let nextDayNewFormat = nextDay.format("DD/MM/YYYY");
          let foundMatch = false;

          // Looping through the data array to check if it matches to store the 5-day forecast
          for (let j = 0; j < data.list.length; j++) {
            let apiDateItem = data.list[j].dt_txt;
            let apiDateItemNewFormat = dayjs(apiDateItem).format("DD/MM/YYYY");

            if (apiDateItemNewFormat === nextDayNewFormat && !foundMatch) {
              cityArray.push(data.list[j]);

              foundMatch = true;
            }
          }
        }

        // Creates the city button
        createCityButton(apiCity);

        // Display info
        displayInfo(cityArray, apiCity);

        // Saves the information to localStorage

        // Empty input value
      });
  }
}

cityForm.addEventListener("submit", searchCity);

// Handle  display the information click when clicking the city button

// Render the info stored from localStorage
