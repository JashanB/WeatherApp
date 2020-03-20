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
  const [historicalWeather, setHistoricalWeather] = useState({hisWeather: []})
  const [place, setPlace] = useState({});
  const { id } = useParams();
  const user_id = props.match.params.user_id
  const place_id = props.match.params.id

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
  useEffect(() => {
    async function fetchData() {
      try {
        let yearOfWeather = 1
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
        // const historicalWeather = weatherObject.weatherData.daily.data.map(function (day, index) {
        //   //use index to create multiple of a year subtraction
        //   // const minusTime = index * 31556926
        //   const queryTime = day.time - 31556926

        //   const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
        //     lat: coordOfSearched.coordinates.lat,
        //     lng: coordOfSearched.coordinates.lng,
        //     time: queryTime
        //   })
        // })
        setWeather(state => ({
          weather: weatherObject
        }))
        // const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
        //   lat: coordOfSearched.coordinates.lat,
        //   lng: coordOfSearched.coordinates.lng,
        //   time: timeNow
        //   })
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
        const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
          lat: lat,
          lng: lng,
          time: time
        })
      }
      try {

      } catch (error) {
        console.error(error)
      }
    }
    if (weather && weather.weather) {
      fetchHistorical()
    }
  }, [weather])

  return (
    <>
      {weather.weather && weather.weather.weatherData && <Hourly name={weather.weather.name} weatherData={weather.weather.weatherData} />}
      {weather.weather && weather.weather.weatherData && <Weekly weatherData={weather.weather.weatherData} />}
    </>
  )



}