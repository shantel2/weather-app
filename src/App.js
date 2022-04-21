import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const apiKey = "cf9d606a10fd5e8b333a11af15aeb9ee"

  const [data, setData] = useState([])
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`


  const queryLocation  = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        alert('Error! Please check your entry and try again')
      })
      setLocation('')
    }
    
    
  }

  return (
    <div className="app">
      <div className="search">
        <p>What's the weather like in your city today?</p>
        <input 
        type="text"
        value={location}
        onChange = {event => setLocation(event.target.value)} 
        onKeyPress ={queryLocation}        
        placeholder ='Enter Location or City Name'/>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p className="city-name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1 className='city-temp'>{data.main.temp.toFixed()}<span>°F</span></h1> : null }
            
          </div>
          <div className="description">
            {data.weather ? <h2>{data.weather[0].main}</h2> : null }            
          </div>
        </div>

        {(data.name !== null) && (data.name!==undefined) &&
                  <div className="bottom">
                  <div className="feels">
                    {data.main ? <p>{data.main.feels_like.toFixed()} <span>°F</span></p> : null}
                    <p className='bold'>Feels Like</p>
                  </div>
                  <div className="humidity">
                    {data.main ? <p>{data.main.humidity.toFixed()} <span>%</span></p> : null}
                    <p className='bold'>Humidity</p>
                  </div>
                  <div className="wind">
                    {data.wind ? <p>{data.wind.speed.toFixed()} <span>MPH</span></p> : null}            
                    <p className='bold'>Wind</p>            
                  </div>
                </div>
        }
      </div>

      
    </div>
  );
}

export default App;
