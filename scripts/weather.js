const apiKey = "013c931839329470d9f2a39dcee1fe95" ;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city){

    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    else{
        document.querySelector(".error").style.display = "none";
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1146/1146869.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/6974/6974833.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4724/4724094.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/7774/7774399.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/3313/3313998.png";
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1779/1779807.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/2315/2315309.png";
        }

        document.querySelector(".weather").style.display = "block";

    }

}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
