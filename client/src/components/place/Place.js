import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';

export default (props) => {
  const [weather, setWeather] = useState({ weather: [] });
  const [onRender, setOnRender] = useState({})
  const [place, setPlace] = useState({});
  const { id } = useParams();
  console.log(props.match.params)
  console.log('ID ', id)
  const user_id = props.match.params.user_id
  const place_id = props.match.params.id

  useEffect(() => {
    async function fetchData() {
      try {
        const placesData = await axios.get(`http://localhost:3001/users/${user_id}/places/${place_id}`)
        const placeObject = {
          name: placesData.data.places.name,
          id: placesData.data.places.id,
          latitude: parseFloat(placesData.data.places.latitude),
          longitude: parseFloat(placesData.data.places.longitude)
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
    fetchData()
  }, [onRender])

  return (
    <div>
      Im here
    </div>
  )



}