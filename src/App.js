import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormatedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query , setQuery] = useState({q:'delhi'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


  useEffect(()=>{

    const fetchWeather = async () =>{

      const message = query.q ? query.q : 'current location.'
      toast.info('Fetching weather for ' + message)
      await getFormatedWeatherData({...query,units}).then((data) =>{
        setWeather(data)
      });
    
    };

    setInterval(
      () =>  fetchWeather() , 
      300000
    ); // for 5 mint refresh
   
  
  
    fetchWeather();
  },[query,units]);
  
const formatBackground = () => {
  if (!weather) return 'from-cyan-700 to-blue-700'
  const threshold = units === 'metric' ? 20 : 60 
  if (weather.temp <= threshold) 
  return 'from-cyan-700 to-blue-700'
  return 'from-yellow-700 to-orange-700'
}


  return (
    <div className={`mx-auto max-w-screen mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs   setQuery={setQuery}  setUnits={setUnits} units={units}/>
      
{weather && (
<div>
      <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather} />
      <Forecast title='hourly forecast' items={weather.hourly}/>
      <Forecast title='daily forecast' items={weather.daily}/>
</div>
)}
<ToastContainer autoClose={2000} theme='colored' newestOnTop = {true}/>
    </div>
  );
}

export default App;
 