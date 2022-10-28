import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import Loading from './components/Loading'

function App() {

  const [weather, setWeather] = useState({})
  const [isfaren, setisfaren] = useState(true)
  const [isloading, setisLoading] = useState(false)


  useEffect(() => {
    const success = pos => {

      const lat = pos.coords.latitude
      const lon = pos.coords.longitude

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86e18c36a9a22d03decb0b0b72e2cd27`)
        .then(res => setWeather(res.data))

    }



    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(weather)

  const handleClick = () => setisfaren(!isfaren)


  const colors = ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871"];
  const randoColor = Math.floor(Math.random() * colors.length)
  document.body.style = `background: ${colors[randoColor]}`;



  if (isloading) {
    <Loading />
  } else {

    return (
      <div className="App" >
        <div className="container" style={{color: colors[randoColor]}}>

          <h1>Weather App</h1>
          <h2>{weather.name} {weather.sys?.country}</h2>
          <img src={weather && `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="hola" />

          <h3>&#34;{weather.weather?.[0].description}&#34;</h3>

          <div className="child">

            <p><b>Wind speed: </b>{weather.wind?.speed} m/s</p>
            <p><b>Clouds: </b>{weather.clouds?.all} %</p>
            <p><b>Presure: </b>{weather.main?.pressure} mb</p>
          </div>

          

          <h2>{isfaren ? "24 C" : "16F"}</h2>
          <button className='btn_submit' style={{ color: colors[randoColor] }} onClick={handleClick}>{isfaren ? 'Change to  °F' : 'Chage  to  °C'}</button>

        </div>
      </div>
    )
  }
}

export default App
