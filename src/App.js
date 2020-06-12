import React , {useState} from 'react';
import './App.css';
const api = {
  key: "255dd0ca6bdab1ca645f01f0b90efd07",
  base : "http://api.openweathermap.org/data/2.5/"
}
function App() {

  const[query , setQuery] = useState('');
  const[weather , setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBiulder = (d) => {
    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main !="undefined") ? 
      ((weather.main.temp) > 16 ?
        "app warm" :
        "app")
      :"app"
    }>
      <main>
        <div className="search_box">
          <input
          type="text"
          placeholder = "Search..."
          className ="search_bar"
          onChange = {e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
           />
        </div>
        {(typeof weather.name != "undefined") ? (
          <div>
          <div className="location_box">
            <div className="location">{weather.name} , {weather.sys.country}</div>
            <div className="date" >{dateBiulder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

