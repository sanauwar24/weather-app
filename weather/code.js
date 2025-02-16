

const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="; // Ensure API URL is correct
const apiKey = "cf56dde974890d92c55165fc93484a4c"; // Replace with your actual API key

const weatherIcon = document.querySelector(".weather-icon"); // Define the icon image element
const searchBtn = document.querySelector(".search-btn"); // Define the search button element
const searchBox = document.querySelector(".search-box"); // Define the search input box element

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`); // Make sure the unit is set to metric for Celsius
    const data = await response.json();

    if (data.cod !== 200) {
        console.log("Error:", data.message); // Handle errors if city not found
        return;
    }

    console.log(data); // Log the entire data object for debugging

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".tempr").innerHTML = `${data.main.temp}°C`; // Added °C symbol
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`; // Fixed humidity units
    document.querySelector(".winds").innerHTML = `${data.wind.speed} km/h`; // Fixed wind speed units

    // Update the weather icon based on the weather condition
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else {
        weatherIcon.src = "images/default.png"; // A default icon in case no condition matches
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


