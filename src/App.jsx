import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard.jsx'

function App() {

  const[coords, setCoords] = useState() 
  const [weather, setWeather] = useState() 
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setMessage] = useState(false)
  useEffect(() => {

    document.title = "Weather" // <Esta function se utiliza para cambiar el titul de la pestaña

    //cambiar la imagen de la pestaña
    const favicon = document.querySelector('link[rel="icon"]')
    if(favicon){
      favicon.href = "./components/sol.png"
    }
    
    setTimeout(() => {
      setMessage(true)
    }, 3000)

    const success = pos => { // Este lo useEffect lo usamos para guardar nuestras cordenadas.
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    } 
  
    navigator.geolocation.getCurrentPosition(success, error)
  }, []) 

  useEffect(() => { // Este useEffect se ejecute en el primer renderizado y ademas cada que coords cabmbie.
    
    if(coords){
      const API_KEY = '6e9a57cc6fd59173d75542bfc8a6a667'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`  //recibe la url
      
      axios.get(url)
      .then(res => {
        setWeather(res.data) //Aqui se recibe toda la información del back
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 +32).toFixed(1) 
        setTemp({celsius, fahrenheit})
    })

    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }
  }, [coords]) // se ejecuta cuando cambia el estado de coords y en el primer renderizado

  

  return (
    <div className='app'>
      {
        isLoading
        ?(
          <div>
            <h1 className='img_loading'></h1>

            {
              showMessage && <p>Por favor, activa la ubicación.</p>
            }
          </div>
        ) 
        :(
          hasError
          ? <h1 className='img__error'>Para obtener el clima de tu ciudad, por favor no bloquies la ubicación</h1>
          :(
          <WeatherCard
      weather={weather}
      temp = {temp}
      />
        )
      )
      }
      
    </div>
  )
}

export default App
