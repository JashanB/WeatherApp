import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';
import Hourly from '../hourly'
import Weekly from '../weekly'
import Graph from '../graph'

export default (props) => {
  const [weather, setWeather] = useState({});
  const [onRender, setOnRender] = useState({})
  const [historicalWeather, setHistoricalWeather] = useState({ hisWeather: [] })
  const [place, setPlace] = useState({});
  const { id } = useParams();
  const user_id = props.match.params.user_id
  const place_id = props.match.params.id
  const goIntoPastByXYears = 2

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
  const hisWeatherArray = [];
  useEffect(() => {
    async function fetchHistorical(lat, lng, time, index) {
      try {
        const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
          latitude: lat,
          longitude: lng,
          time: time
        })
        if (historicalWeatherResponse.status === 200 && historicalWeatherResponse.statusText === "OK") {
          const data = JSON.parse(historicalWeatherResponse.data.data)
          console.log('his weather response', {data})
          const dataObject = {
            index: index,
            data: data.daily.data[0]
          }
          hisWeatherArray.push(dataObject)
        } else {
          const dataObject = {
            index: 100
          }
          hisWeatherArray.push(dataObject)
        }
        setHistoricalWeather(state => ({
          hisWeather: [...historicalWeather.hisWeather, ...hisWeatherArray]
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
        const weatherObject = {
          name: place.places.name,
          id: place.places.id,
          latitude: place.places.latitude,
          longitude: place.places.longitude,
          weatherData: JSON.parse(weekWeatherResponse.data.data)
        }
        for (let i = 1; i <= goIntoPastByXYears; i++) {
          //where i <= is the # of years the call will go back 
          const getHistoricalWeather = weatherObject.weatherData.daily.data.map(function (day) {
            const queryTime = day.time - (31556926 * i)
            fetchHistorical(weatherObject.latitude, weatherObject.longitude, queryTime, i)
          })
        }
        setWeather(state => ({
          weather: weatherObject
        }))
      } catch (error) {
        console.error(error)
      }
    }
    if (place && place.places) {
      fetchData()
    }
  }, [onRender])

  useEffect(() => {
    async function fetchHistorical(lat, lng, time) {
      try {
        const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
          lat: lat,
          lng: lng,
          time: time
        })

      } catch (error) {
        console.error(error)
      }
    }

    // if (weather && weather.weather) {
    //   fetchHistorical()
    // }
  }, [weather])

  setTimeout(function () {
    console.log('this is his weather', historicalWeather)
  }, 5000)

  return (
    <>
      {weather.weather && weather.weather.weatherData && <Hourly name={weather.weather.name} weatherData={weather.weather.weatherData} />}
      {weather.weather && weather.weather.weatherData && <Weekly weatherData={weather.weather.weatherData} />}
      {weather.weather && weather.weather.weatherData && <Graph pastYears={goIntoPastByXYears} historicalData={historicalWeather} weatherData={weather.weather.weatherData} />}
    </>
  )



}