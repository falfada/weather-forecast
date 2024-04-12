const cityForm = document.getElementById('searchCity');


function searchCity(event){
    event.preventDefault();
    const city = document.getElementById('city').value;

    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51efec98b19c84eb27282dcdc29d86a8&units=metric`;
    if(city !== ''){
        fetch(weatherApi)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
        
          const dataList = data.list[0];
          const humidity = dataList.main.humidity;
          const temperature = dataList.main.temp;
          const windSpeed = dataList.wind.speed;
          const iconWeather = ` https://openweathermap.org/img/wn/${dataList.weather[0].icon}.png`;
            
          console.log(`The temperature in ${city} is ${temperature}C, the humidity is ${humidity}% and the wind speed is ${windSpeed}m/s`);
         
        });
    }
}

cityForm.addEventListener("submit", searchCity);
