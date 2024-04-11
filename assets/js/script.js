const cityForm = document.getElementById('searchCity');


function searchCity(event){
    event.preventDefault();
    const city = document.getElementById('city').value;

    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51efec98b19c84eb27282dcdc29d86a8`;
    if(city !== ''){
        fetch(weatherApi)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        });
    }
}

cityForm.addEventListener("submit", searchCity);
