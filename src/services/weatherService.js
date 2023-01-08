import { DateTime } from "luxon";

const APT_KEY = '34480b98aa332da53123a0ac63a4ea9d'; //MAIN API-KEY
//const APT_KEY = '70b4921b6e65c23d235e723a4d378899'; //for testing

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType , searchParams) =>{
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid: APT_KEY}
        )

        return fetch(url).then((res)=> res.json()).then((data)=>data);
};

const formatCurrentWeather = (data) => {
const {
    coord: {lat ,lon},
    main: {temp , feels_like , temp_min , temp_max , humidity },
    name,
    dt,
    sys:{
        country , sunrise , sunset
    },
    weather,
    wind: {speed}
} = data

const {main: details , icon} = weather[0]

return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details , icon, speed };
};

const formatForcastWeather = (data) => {
    let { timezone , daily , hourly}= data;
    daily = daily?.slice(1,6).map(d =>{
        return {
            title: formatToLocalTime(d.dt , timezone , 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = hourly?.slice(1,6).map((d) =>{
        return {
            title: formatToLocalTime(d.dt , timezone , "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return {timezone , daily , hourly};
};

const getFormatedWeatherData = async (searchParams) =>{
const formattedCurrentWeather = await getWeatherData ('weather' , searchParams).then(formatCurrentWeather)

const {lat , lon} = formattedCurrentWeather;

const formatedForcastWeather = await getWeatherData('onecall', {
    lat , lon , exclude: 'current,minutely,alerts' , units: searchParams.units,
}).then(formatForcastWeather)

return {...formattedCurrentWeather , ...formatedForcastWeather}
};

const formatToLocalTime = (secs , zone , format = "cccc , dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`


export default getFormatedWeatherData
export { formatToLocalTime, iconUrlFromCode };


