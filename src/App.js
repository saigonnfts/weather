import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

// our application is a weather app
// what will our app do????
// 1. we want to grab data from a database somewhere of the weather
// API Call (Application Programming Interface) JSON weather data
// STATE! plain javascript object that holds the current state of information
// dynamic data 
// in our app we will be using Hooks to handle our weather data state 

// useEffect hook tells our component app to do something
// after rendering

/*
EXERICSE TIME!
FINISH THE FUNCTIONALITY OF WEATHER ALGO APP
ADD & DISPLAY THE FOLLOWING DATA POINTS
Humidity, Minimum Temp, and Weather Icons
POST YOUR SOLUTIONS IN THE #react CHANNEL ON OUR DISCORD!
*/


function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city:'New York',
    country:'US',
    temperature:'75',
    humidity:'40',
    minTemperature:'70',
    weatherIcons:'10d'
  })

  useEffect(()=> {
    // we add what we want to happen after rendering
    // fetch the database information the API call of weather
      // Weather Database
      fetchData()

  },[])

  const fetchData = async (city) => {
    // try catch error handling
    try {
    const APIKEY = 'e4a5427e935a39e8c07e2c722c835a4c'
    // axios is a library which will allow us to make requests to the backend with promises
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial
    `)
    await setAllData({
      city:result.data.name,
      country: result.data.sys.country,
      temperature:result.data.main.temp,
      humidity:result.data.main.humidity,
      minTemperature:result.data.main.temp_min,
      weatherIcons:result.data.weather[0].icon 
    })
  } catch (e) {
    console.log('API not loaded correctly or loaded for the first time')
  }
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }
  
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    // the section tag in react for sections and the main tag for the main build
    // under main we will have sections for the form and for displaying results
    <main>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
        value={search}
        type='text'
        name='city'
        placeholder='Location'
        onChange={handleChange}
        />
        <button for='city'>Search</button>
      </form>
        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
          <img src={'https://openweathermap.org/img/wn/' 
            + allData.weatherIcons +'@2x.png'}/>

        <h1 className='title'>
          {allData.city}</h1>
        <h2 className='location'>
          {allData.country}</h2> 

        <div className='weather-description'>
        <div>
        <h3>HUMIDITY</h3>
        <p>{allData.humidity}%</p>
        </div>
        <div>
        <h3>TEMPERATURE</h3>
        <p>{allData.temperature}°F</p>
        </div>
        <div>
            <h3>MIN TEMPERATURE</h3>
              <p>{allData.minTemperature}°F</p>
                 </div>
               </div>
             </div>
            </div>
          </div>
        </section>
    </div>
    </main>
  );
}

export default App;
