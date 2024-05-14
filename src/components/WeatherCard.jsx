import { useState } from 'react'
import React from 'react'
import './styles/WeatherCard.css'

const WeatherCard = ({weather, temp}) => {

        const [isCelsius, setIsCelsius] = useState(true)

        const chageTemperature = () =>{
            setIsCelsius(!isCelsius)
        
        }

  return (
    <article className='card'>
        <h1 className='card___title'> Weather App</h1>
        <h2 className='card___country'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='card___body'>
            <div className='card___image-container'> 
                <img 
                className='card__image'
                src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}  alt=""
                />     {/*   /*para hacer dinamico el scodigo, y cambiar dependiendo de la ciudad.  */ }             
               
                </div> 
            <article className='info'>
                <h3 className='info-title'>{weather?.weather[0].description}</h3>
                <ul className='info-list'>
                    <li  className='info__item'><span className='info__label'>wind speed</span><span className='info__value'>{weather?.wind.speed}m/s</span></li>
                    <li className='info__item'><span className='info__label'>Clouds</span><span className='info__value'>{weather?.clouds.all}%</span></li>
                    <li className='info__item'><span className='info__label'>Presure</span><span className='info__value'>{weather?.main.pressure}hPa</span></li>
                </ul>
            </article>  
        </section>
         <h2 className='card__temp'>{isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`}</h2> {/*Si celcius es true ? muestra la temperatura en °C, pero si es false : muestra °F */}
        <button  className='card__btn'onClick = {chageTemperature}>change to °F</button>
    </article>
  ) 
}

export default WeatherCard
