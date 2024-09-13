let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');

let weather_search = document.querySelector('.weather_search');
let cityInputName = document.querySelector('.city_name');


const getContryName = (code)=> {
  return  new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

const getDateTime = (dt)=> {
  const curDate = new Date(dt*1000);
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  
  const formatter = new Intl.DateTimeFormat("en-US",option);
  return formatter.format(curDate);
}

let city = "Delhi";
weather_search.addEventListener('submit',(e)=> {
  e.preventDefault();
  city = cityInputName.value;
  getWeatherData();
  cityInputName.value = "";
});

//const weatherUrl = ``
 const getWeatherData = async ()=> {
   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&APPID=dba22df8041b9e8502d98d810078828d`;
try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);
    
    const {main, name, weather, wind, sys, dt} = data;
    
    cityName.innerHTML = `${name},${getContryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    
   w_forecast.innerHTML = weather[0].main;
   w_icon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;
    
   w_temperature.innerHTML=`${Math.round(main.temp)}&#176C`;
 
    w_min.innerHTML= `Min: ${Math.round(main.temp_min)}&#176C`;
    w_max.innerHTML= `Max: ${Math.round(main.temp_max)}&#176C`;
    
    w_feelsLike.innerHTML=`${Math.round(main.feels_like)}&#176C`;
    w_humidity.innerHTML= `${main.humidity}%`;
    w_wind.innerHTML= `${wind.speed}m/s`
    w_pressure.innerHTML= `${main.pressure}hPa`
    
    
  } catch (error) {
    console.log(error);
  };
};

//document.body.addEventListener('load',getWeatherData());
getWeatherData();