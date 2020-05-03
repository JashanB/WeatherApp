import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import axios from 'axios';
import Hourly from '../hourly';
import Weekly from '../weekly';
import Graph from '../graph';
import './Place.css';

export default (props) => {
  const [weather, setWeather] = useState({});
  const [onRender, setOnRender] = useState({})
  const [historicalWeather, setHistoricalWeather] = useState({})
  const [place, setPlace] = useState({});
  const [goIntoPastByXYears, setGoIntoPastByXYears] = useState(5)
  const { id } = useParams();
  const user_id = props.match.params.user_id
  const place_id = props.match.params.id
  // const goIntoPastByXYears = 5

  useEffect(() => {
    async function fetchData() {
      try {
        const placesData = await axios.get(`http://localhost:3001/users/${user_id}/places/${place_id}`)
        console.log("get", placesData)
        const placeObject = {
          name: placesData.data.places[0].name,
          id: placesData.data.places[0].id,
          latitude: parseFloat(placesData.data.places[0].latitude),
          longitude: parseFloat(placesData.data.places[0].longitude)
        }
        setPlace(state => ({
          places: placeObject
        }))
        setOnRender(state => ({
          places: placeObject
        }))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  //gets weather data for all places in database on load
  // const hisWeatherArray = [];
  let hisWeatherObject = {};
  useEffect(() => {
    async function fetchHistorical(lat, lng, time, index) {
      try {
        const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
          latitude: lat,
          longitude: lng,
          time: time
        })
        console.log('his weather fetch')
        if (historicalWeatherResponse.status === 200 && historicalWeatherResponse.statusText === "OK") {
          const data = JSON.parse(historicalWeatherResponse.data.data)
          if (hisWeatherObject[index] && hisWeatherObject[index].length >0) {
            hisWeatherObject[index].push(data.daily.data[0])
          } else {
            hisWeatherObject[index] = []
            hisWeatherObject[index].push(data.daily.data[0])
          }
        } 
        setHistoricalWeather(state => ({
          hisWeather: hisWeatherObject
        }))
      } catch (error) {
        console.error(error)
      }
    }
    async function fetchData() {
      try {
        const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
          latitude: place.places.latitude,
          longitude: place.places.longitude
        })
        console.log('weather fetch')
        const weatherObject = {
          name: place.places.name,
          id: place.places.id,
          latitude: place.places.latitude,
          longitude: place.places.longitude,
          weatherData: JSON.parse(weekWeatherResponse.data.data)
        }
        console.log('weather!', weatherObject.weatherData)
        for (let i = 1; i <= goIntoPastByXYears; i++) {
          //where i <= is the # of years the call will go back 
          const getHistoricalWeather = weatherObject.weatherData.daily.data.map(function (day) {
            const queryTime = day.time - (31556926 * i)
            fetchHistorical(weatherObject.latitude, weatherObject.longitude, queryTime, i)
          })
        }
        setWeather(state => ({
          weather: weatherObject
        }));
      } catch (error) {
        console.error(error);
      }
    };
    if (place && place.places) {
      fetchData();
    }
  }, [onRender]);

  setTimeout(function () {
    console.log('this is his weather', historicalWeather)
  }, 5000)

  return (
    <div className="place-container">
      <h2 className="title-header">{weather.weather && weather.weather.weatherData && weather.weather.name}</h2>
      {weather.weather && weather.weather.weatherData && <Hourly weatherData={weather.weather.weatherData} />}
      {weather.weather && weather.weather.weatherData && <Weekly weatherData={weather.weather.weatherData} />}
      {/* {weather.weather && weather.weather.weatherData && <Graph setPastYears={setGoIntoPastByXYears} pastYears={goIntoPastByXYears} historicalData={historicalWeather} weatherData={weather.weather.weatherData} />} */}
    </div>
  )



}