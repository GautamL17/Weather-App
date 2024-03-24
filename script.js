//city name and metric
let currCity = 'Tokyo'
let unit = 'metric'
//css selectors
let city = document.querySelector('.weather__city')
let datetime = document.querySelector('.weather__datetime')
let weather__forecast = document.querySelector('.weather__forecast')
let weather__temperature = document.querySelector('.weather__temperature')
let weather__icon = document.querySelector('.weather__icon')
let weather__minmax = document.querySelector('.weather__minmax')
let weather__realfeel = document.querySelector('.weather__realfeel')
let weather__humidity = document.querySelector('.weather__humidity')
let weather__wind = document.querySelector('.weather__wind')
let weather__pressure = document.querySelector('.weather__pressure')


//country code to country name function 
function convertcountrycode(country) {
    let regionName = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionName.of(country)
}
//timezone conversion 
function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600; // convert seconds to hours 
    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)

}

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getweather();
    // clear form
    search.value = ""
})

// units
let weather_unit_celsius = document.querySelector(".weather_celsius")
weather_unit_celsius.addEventListener('click', () => {
    if(unit !== "metric"){
        // change to metric
        unit = "metric"
        // get weather forecast 
        getweather()
    }
})
document.querySelector('.weather_farenheit').addEventListener('click', () => {
    if (unit !== 'imperial') {
        unit = 'imperial'
        getweather()
    }
})




function getweather() {
    const API_KEY = 'ce1188d9017d7a931291818e3b2523a8'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${unit}`).then(res => res.json()).then(data => {
        city.innerHTML = `${data.name},${convertcountrycode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`
        weather__temperature.innerHTML = `${data.main.temp}&#176`;
        weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min}&#176</p> <p> Max: ${data.main.temp_max}&#176</p>`
        weather__realfeel.innerHTML = `${data.main.feels_like}&#176`
        weather__humidity.innerHTML = `${data.main.humidity}%`
        weather__wind.innerHTML = `${data.wind.speed} ${unit === "imperial" ? "mph": "m/s"}`
        weather__pressure.innerHTML = `${data.main.pressure} hPa`


    })
}

document.body.addEventListener('load', getweather())