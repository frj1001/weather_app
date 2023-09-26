import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios"


function App() {
  const [weather, setWeather] = useState("")
  const [location, setLocation] = useState("Dubai")
  const [pic, setPic] = useState([])
  const [humidity, setHumidity] = useState(0)
  const [windspeed, setWindSpeed] = useState(0)

  useEffect(()=>{
    ifClicked()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function ifClicked(){
    if(location!==""){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=10ee027ab93f7e43bf9bb6b68f623ac1&units=metric`)
    .then(response => {
      setWeather(response.data.main.temp)
      setHumidity(response.data.main.humidity)
      setWindSpeed(response.data.wind.speed*60*60/1000) //To convert windspeed from m/sec to km/h
    })
    .catch((error) => {
      if(error.response.status===404){
        setWeather("City Not Found!!")
      }else{
        alert("There seems to be an unknown error! Please refresh the page and try again!")
      }
    })
    axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=7cFv2n_C5c04IUMz_frBr37u3bGB1mZ_x7ISdiYZOow`)
    .then(response => setPic(response.data.results[0].urls.raw))
    .catch((error) => console.log(error))
    }
  }

  return (
    <div className='main' style={{backgroundImage:`url(${pic})`}}>
      <div className='weather'>
        <h1 className='heading'>Weather App</h1>
        <div className='search'>
          <input type='text' placeholder='Enter City Name' value={location} onChange={(e)=>setLocation(e.target.value)} required />
          <button type='submit' onClick={ifClicked}>Search</button>
        </div>
        <div className='temp'>
          <h2>Current Temperature</h2>
          <h1>{weather}<span>{typeof(weather)==="string"? "":"°C"}</span></h1>
        </div>
        <div className='humid'>Humidity: {typeof(weather)==="string"? "":humidity+"%"}</div>
        <div className='wind'>Wind Speed: {typeof(weather)==="string"? "":Math.round(windspeed)+"km/h"} </div>
      </div>
    </div>
  );
}

export default App;
