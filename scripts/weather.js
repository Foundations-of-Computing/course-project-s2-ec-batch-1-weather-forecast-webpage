const apiKey = "013c931839329470d9f2a39dcee1fe95";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            return;
        }
        
        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        const weatherCondition = data.weather[0].main;
        
        const weatherIcons = {
            "Clouds": "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
            "Clear": "https://cdn-icons-png.flaticon.com/128/6974/6974833.png",
            "Rain": "https://cdn-icons-png.flaticon.com/128/4724/4724094.png",
            "Drizzle": "https://cdn-icons-png.flaticon.com/128/7774/7774399.png",
            "Mist": "https://cdn-icons-png.flaticon.com/128/3313/3313998.png",
            "Haze": "https://cdn-icons-png.flaticon.com/128/1779/1779807.png",
            "Snow": "https://cdn-icons-png.flaticon.com/128/2315/2315309.png"
        };
        
        weatherIcon.src = weatherIcons[weatherCondition] || weatherIcons["Clear"];
        
        errorDiv.style.display = "none";
        weatherDiv.style.display = "block";
        
    } catch (error) {
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
