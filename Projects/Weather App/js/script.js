const input = document.getElementById("input")
const inputContainer = document.getElementById("input-container")
const submitButton = document.getElementById("submit-button")
const results = document.getElementById("results-container")
const errorMessage = document.getElementById("error-message")


const mainPicture = document.getElementById("main-picture")
const degrees = document.getElementById("degrees")
const descriptionMain = document.getElementById("description")
const place = document.getElementById("place")

const highLow = document.getElementById("high-low")
const feelsLike = document.getElementById("feels-like")
const currentTimeDate = document.getElementById("current-time-date")

const humidityMain = document.getElementById("humidity")
const windMain = document.getElementById("wind")
const sunriseMain = document.getElementById("sunrise")
const sunsetMain = document.getElementById("sunset")

const day2Date= document.getElementById("day-2-date")
const day2Picture= document.getElementById("day-2-picture")
const day2HighLow= document.getElementById("day-2-high-low")

const day3Date= document.getElementById("day-3-date")
const day3Picture= document.getElementById("day-3-picture")
const day3HighLow= document.getElementById("day-3-high-low")

const day4Date= document.getElementById("day-4-date")
const day4Picture= document.getElementById("day-4-picture")
const day4HighLow= document.getElementById("day-4-high-low")

const day5Date= document.getElementById("day-5-date")
const day5Picture= document.getElementById("day-5-picture")
const day5HighLow= document.getElementById("day-5-high-low")

document.getElementById('current-year').textContent = new Date().getFullYear();



const fetchData = async(input) =>{
    const apiKey = "5803bd103e5c8a41b3f2106ce45d0c0c";
    try{
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`)
        let data = await res.json();
        displayWeather(data)
        console.log(data)
        res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}&units=metric`)
        data = await res.json();
        displayForecast(data)
        results.removeAttribute("hidden")
    }   
    catch{
        errorMessage.innerText="City not found. Please try again."
    }
}

const displayWeather=(data)=>{

    const {main, name, sys, timezone, weather, wind} = data;
    const {feels_like, humidity, temp} = main;
    const {country, sunrise, sunset} = sys;
    const {description, icon} = weather[0];
    const {deg, speed} = wind

    const offsetHours = timezone / 3600
    let timeZoneString

    if(offsetHours>=0){
        timeZoneString = `Etc/GMT-${offsetHours}` 
    }
    else if(offsetHours<0){
        timeZoneString = `Etc/GMT+${offsetHours*(-1)}`
    }

    const timeOptions = {
        timeZone: timeZoneString,
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }

    const currentTime= new Date()
    const options= {
        timeZone: timeZoneString,
        weekday: "long",
        month: "long",
        day:"numeric",
        hour:"numeric",
        minute: "2-digit",
        hour12: true
    }
    currentTimeDate.innerText=`${new Intl.DateTimeFormat("en-US",options).format(currentTime)}`

    place.innerText= name;
    place.innerText+= `, ${country}`
    feelsLike.innerText= `Feels Like: ${Math.floor(feels_like)}°`
    humidityMain.innerText= `Humidity: ${humidity}%`
    degrees.innerText=`${Math.floor(temp)}°`
    windMain.innerText= `Wind: ${Math.floor(speed*3.6)} km/h`
    const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@4x.png"
    mainPicture.setAttribute("src", iconUrl)

    let newDescription = 
        description.split(" ").map((word)=> word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")

    descriptionMain.innerText=newDescription

    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);

    const formatter = new Intl.DateTimeFormat("en-US", timeOptions)

    const sunriseCurrent = formatter.format(sunriseDate);
    const sunsetCurrent = formatter.format(sunsetDate);

    sunriseMain.innerText=`Sunrise: ${sunriseCurrent}`
    sunsetMain.innerText= `Sunset: ${sunsetCurrent}`

    const clearIcons = ["01d", "02d"]
    const cloudyIcons = ["03d", "04d"]
    const precipIcons = ["09d", "10d", "11d", "13d", "50d"]
    const nightIcons = ["01n", "02n", "03n", "04n", "09n", "101n", "11n", "13n", "50n",]

    if(clearIcons.includes(icon)){
        results.style.backgroundImage = "var(--clear-day)"
        results.style.color = "var(--text-color)"
    }
    else if(cloudyIcons.includes(icon)){
        results.style.backgroundImage = "var(--cloudy-day)"
        results.style.color = "var(--text-color)"
    }
    else if(precipIcons.includes(icon)){
        results.style.backgroundImage = "var(--rainy-day)"
        results.style.color = "var(--text-color)"
    }
    else if(nightIcons.includes(icon)){
        results.style.backgroundImage = "var(--night)"
        results.style.color = "white"
    }
    else{
        results.style.backgroundImage = "var(--accent-color)"
    }

}

const displayForecast=(data)=>{
    let dailyForecasts = {}
    data.list.forEach((forecast, index)=>{
        const forecastDate = new Date(data.list[index].dt_txt)
        const forecastDatePart = forecastDate.toISOString().split('T')[0]
        if(!dailyForecasts.hasOwnProperty(forecastDatePart)){

            dailyForecasts[forecastDatePart] = []
        }
        dailyForecasts[forecastDatePart].push(forecast)
    })
    
    //getting names for forecast days
    let highsInOrder = []
    let lowsInOrder = []
    let dayNames = []
    let weatherIcons = []
    Object.entries(dailyForecasts).forEach(([dateString, forecastArray])=>{
        let dayName = new Date(dateString)
        dayName = new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(dayName)
        dayNames.push(dayName)

        //getting high and low temps
        let highForDay = forecastArray[0].main.temp
        let lowForDay = forecastArray[0].main.temp
        forecastArray.forEach((interval)=>{
            if(interval.main.temp > highForDay){
                highForDay = interval.main.temp
            }
            if(interval.main.temp < lowForDay){
                lowForDay = interval.main.temp
            }
        })
        highsInOrder.push(highForDay)
        lowsInOrder.push(lowForDay)
        
        let middayForecast = forecastArray.find(forecast =>{
            return forecast.dt_txt.includes("12:00:00")
        })
        if(middayForecast===undefined){
            middayForecast = forecastArray[0]
        }
        weatherIcons.push(middayForecast.weather[0].icon)

    })
    highLow.innerText = `H: ${Math.floor(highsInOrder[0])}° L: ${Math.floor(lowsInOrder[0])}°`
    
    const forecastDateList = [day2Date, day3Date, day4Date, day5Date]
    const forecastPictureList = [day2Picture, day3Picture, day4Picture, day5Picture]
    const forecastHighLowList = [day2HighLow, day3HighLow, day4HighLow, day5HighLow]

    forecastDateList.forEach((date, index)=>{
        date.innerText = dayNames[index+1]
    })
    forecastPictureList.forEach((picture, index)=>{
        const iconUrl = "https://openweathermap.org/img/wn/"+weatherIcons[index+1]+"@4x.png"
        picture.setAttribute("src", iconUrl)
    })
    forecastHighLowList.forEach((highLow, index)=>{
        highLow.innerText = `${Math.floor(highsInOrder[index+1])}° / ${Math.floor(lowsInOrder[index+1])}°`
    })


}




submitButton.addEventListener("click", ()=>{
    errorMessage.innerText = ""
    if(input.value===""){
        errorMessage.innerText = "Please enter a city."
        return
    }
    fetchData(input.value)
    input.value=""
})

