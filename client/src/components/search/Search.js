import React, { useEffect, useState } from 'react'
import { withScriptjs } from "react-google-maps"
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import './Search.css';
import WeatherList from '../weatherList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}

const { id } = useParams();

const Input = (props) => {
  return (
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        // boxSizfaing: `border-box`,
        // border: `1px solid transparent`,
        // width: `240px`,
        // height: `32px`,
        // padding: `0 12px`,
        // borderRadius: `3px`,
        // boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        // fontSize: `14px`,
        // outline: `none`,
        // textOverflow: `ellipses`,
      }}
    // value={props.}
    />
  )
}

const SearchBox = withScriptjs((props) => {

  return (
    <div className="stand-alone-search">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        bounds={props.bounds}
      >
        <Input />
        {/* <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} /> */}
        {/* {(props.markers ? props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} title={marker.title} />
      ) : console.log('no marker'))} */}
        {/* // </GoogleMap> */}
      </StandaloneSearchBox>
    </div>
  )
}
)

export default (props) => {
  const [placesOfSearched, setPlacesOfSearched] = useState({});
  const [coordOfSearched, setCoordOfSearched] = useState({});
  const [weather, setWeather] = useState({});
  const [allPlaces, setAllPlaces] = useState({});

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    setPlacesOfSearched(state => ({ places: places }))
    setCoordOfSearched(state => ({
      coordinates: {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng()
      }
    }))

  }
  setTimeout(function () {
    console.log('this is state', placesOfSearched)
    console.log('this is coord', coordOfSearched)
  }, 5000)

  useEffect(() => {
    async function fetchData() {
      try {
        const timeNow = Date.now() / 1000
        const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
          lat: coordOfSearched.coordinates.lat,
          lng: coordOfSearched.coordinates.lng
        })
        const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
          lat: coordOfSearched.coordinates.lat,
          lng: coordOfSearched.coordinates.lng,
          time: timeNow
          })
      } catch (error) {
        console.error(error)
      }
    }
    if (coordOfSearched && coordOfSearched.coordinates && coordOfSearched.coordinates.lat) {
      fetchData()
    }
  }, [placesOfSearched])

  useEffect(() => {
    try {
      const placesDate = await axios.get(`http://localhost:3001/weather/new`)

    } catch (error) {
      console.error(error)
    }
  }, [allPlaces])

  return (<>
    <SearchBox
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onPlacesChanged}
      onSearchBoxMounted={onSearchBoxMounted}
    />
    <WeatherList 
    items={"Needs to be passed down names of places searched and weather data"}
    />
  </>)
}
