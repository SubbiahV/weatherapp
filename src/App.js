
//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


const api = {
  key: '2c3297c3c1c249a4f3ad887a7c8888f0',
  base: 'https://api.openweathermap.org/data/2.5/'
}
// ... (import statements and other code above)

function App() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState({});
  const [searched, setSearched] = useState(false);

  const Press = () => {
    if (value.trim() !== '') {
      fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        })
        .catch(() => {
          setWeather({});
        });
      setSearched(true);
    }
  };

  return (
    <div id='size' className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div>
          <input
            className='inp'
            type='text'
            placeholder='Enter city..'
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button className='buton' onClick={Press}><b>Search</b></button>
        </div>
        {searched ? (
          typeof weather.main !== "undefined" ? (
            <div>
              {/* Location  */}
              <p>{weather.name}</p>

              {/* Temperature Celsius  */}
              <p>{weather.main.temp}°C</p>

              {/* Condition (Sunny ) */}
              <p>{weather.weather[0].main}</p>
              <p>({weather.weather[0].description})</p>
            </div>
          ) : (
            <div><p>Invalid city or network error</p></div>
          )
        ) : null}
      </header>
    </div>
  );
}

export default App;
