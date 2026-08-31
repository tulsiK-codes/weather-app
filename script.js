document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const info = document.getElementById('info');
    const errorMsg = document.getElementById('error-message');
    const API = `Your API`; 


    getWeatherBtn.addEventListener('click', async () => {
        console.log("Clicked");
        const city = cityInput.value.trim();
        if (!city) return;

        errorMsg.classList.add('hidden');
        info.textContent = "Fetching..."; 
        try {
            const data = await getWeather(city);
            console.log(data);
            if (data.cod !== 200) {
            showError();
            return;
           } 
            displayUI(data);
        } catch (error) {
            console.log(error);            
            showError();
        }

    });

    async function getWeather(city) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(URL);
        if (!response.ok) {
        throw new Error("City not found");
        }   
        const data = await response.json();
        return data;
    }

    function displayUI(dataObject) {
        weatherInfo.classList.remove('hidden');
        errorMsg.classList.add('hidden');
        cityName.textContent = dataObject.name;
        temperature.textContent = dataObject.main.temp + "°C";
        info.textContent = dataObject.weather[0].main;
        cityInput.value = "";
    }
    
    function showError() {
        weatherInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');
        cityInput.value = "";
    }
})