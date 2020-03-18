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
        // const timeNow = Date.now() / 1000
        //want to subtract 1 year from current time and get historical data for that - globy warming
        //can go until get no response back from api 

        //wouldnt it be cool if we made a graph using historical data for that week and the "this weeks data" and plotted it

        console.log("place places", place)
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
        const historicalWeather = weatherObject.weatherData.daily.data.map(function (day, index) {
          const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
            lat: coordOfSearched.coordinates.lat,
            lng: coordOfSearched.coordinates.lng,
            time: timeNow
          })
        })
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

  return (
    <>
      {weather.weather && weather.weather.weatherData && <Hourly name={weather.weather.name} weatherData={weather.weather.weatherData} />}
      {weather.weather && weather.weather.weatherData && <Weekly weatherData={weather.weather.weatherData} />}
    </>
  )



}