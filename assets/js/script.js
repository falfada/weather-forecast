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

        for (let i = 0; i <= 5; i++) {
          let nextDay = apiDate.add([i], "day");
          let nextDayNewFormat = nextDay.format("DD-MM-YYYY 21:00:00");

          for (let j = 0; j < data.list.length; j++) {

            let apiDateItem = data.list[j].dt_txt;
            let apiDateItemNewFormat = dayjs(apiDateItem).format(
              "DD-MM-YYYY HH:mm:ss"
            );

            const dataList = data.list[j];
            const humidity = dataList.main.humidity;
            const temperature = dataList.main.temp;
            const windSpeed = dataList.wind.speed;
            const iconWeather = ` https://openweathermap.org/img/wn/${dataList.weather[0].icon}.png`;

            if (apiDateItemNewFormat === nextDayNewFormat) {
              console.log(
                `The temperature in ${city} on ${apiDateItemNewFormat} is ${temperature}C, the humidity is ${humidity}% and the wind speed is ${windSpeed}m/s`
              );
            }
          }
        }

      });
  }
}

cityForm.addEventListener("submit", searchCity);
