const cityForm = document.getElementById("searchCity");

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
        let weatherInfo = data.list[0].weather[0].main;
        const weatherContainer = document.getElementById("weather_container");
        weatherContainer.setAttribute("class", "text-white");

        if(weatherInfo === 'Thunderstorm'){
          weatherContainer.style.backgroundImage = "url('../assets/img/thunderstorm.jpg')";
        } else if(weatherInfo === 'Drizzle'){
          weatherContainer.style.backgroundImage = "url('../assets/img/drizzle.jpg')";
        } else if(weatherInfo === 'Rain'){
          weatherContainer.style.backgroundImage = "url('../assets/img/rain.jpg')";
        } else if(weatherInfo === 'Snow'){
          weatherContainer.style.backgroundImage = "url('../assets/img/snow.jpg')";
        } else if(weatherInfo === 'Clear'){
          weatherContainer.style.backgroundImage = "url('../assets/img/clear.jpg')";
        } else{
          weatherContainer.style.backgroundImage = "url('../assets/img/clouds.jpg')";
        }

        // Creating the next five days for the forecast
        for (let i = 0; i <= 5; i++) {
          let nextDay = apiDate.add(i, "day");
          let nextDayNewFormat = nextDay.format("DD/MM/YYYY");
          let foundMatch = false;

          // Looping through the data array to check if it matches to 5-day forecast
          for (let j = 0; j < data.list.length; j++) {
            let apiDateItem = data.list[j].dt_txt;
            let apiDateItemNewFormat = dayjs(apiDateItem).format("DD/MM/YYYY");

            if (apiDateItemNewFormat === nextDayNewFormat && !foundMatch) {
              const dataList = data.list[j];
              const humidity = dataList.main.humidity;
              const temperature = dataList.main.temp;
              const windSpeed = dataList.wind.speed;
              const iconWeather = `https://openweathermap.org/img/wn/${dataList.weather[0].icon}.png`;

              
              foundMatch = true;
            }
          }
        }
      });
  }
}

cityForm.addEventListener("submit", searchCity);
