const cityForm = document.getElementById("searchCity");
const forecastContainer = document.getElementById("forecastContainer");
const citiesContainer = document.getElementById("citiesContainer");

// Creates the button
function createCityButton(city){
  const cityButton = document.createElement('button');
  cityButton.classList.add("btn", "btn-light", "mt-1", "col-12");
  cityButton.textContent = `${city}`;

  citiesContainer.appendChild(cityButton);
}
function displayInfo(data){

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

        // Changing the background depending on the weather info
        // let weatherInfo = data.list[0].weather[0].main;
        // const weatherContainer = document.getElementById("weather_container");
        // weatherContainer.setAttribute("class", "text-white");

        // if (weatherInfo === "Thunderstorm") {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/thunderstorm.jpg')";
        // } else if (weatherInfo === "Drizzle") {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/drizzle.jpg')";
        // } else if (weatherInfo === "Rain") {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/rain.jpg')";
        // } else if (weatherInfo === "Snow") {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/snow.jpg')";
        // } else if (weatherInfo === "Clear") {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/clear.jpg')";
        // } else {
        //   weatherContainer.style.backgroundImage =
        //     "url('../assets/img/clouds.jpg')";
        // }

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
        displayInfo(cityArray);

        // Saves the information to localStorage

      });
  }
}

cityForm.addEventListener("submit", searchCity);

// Handle  display the information click when clicking the city button
