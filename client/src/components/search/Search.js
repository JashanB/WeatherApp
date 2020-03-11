import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
import { Button } from 'react-bootstrap'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import './Search.css';

const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}



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
      <div>
        ref={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        bounds={props.bounds}
      >
        <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} />
      {/* {(props.markers ? props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} title={marker.title} />
      ) : console.log('no marker'))} */}
    {/* // </GoogleMap> */}
    </div>
  )
}
)

export default (props) => {
  const[places, setPlaces] = useState({});

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    setPlaces(state => ({places: places}))
  }

  // useEffect(() => {
   
  // }, [])
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    const bounds = new window.google.maps.LatLngBounds(); //gets boundaries for that place

  }
  return (<>
    <SearchBox
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onPlacesChanged}
      onSearchBoxMounted={onSearchBoxMounted}
    />
  </>)
}
