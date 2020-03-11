import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from '../search'

class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     message: 'Click the button to load data!'
  //   }
  // }
  render() {
    return (
      <div className="App">
        <h1> Search box</h1>
        <Search />
      </div>
    );
  }
}

export default App;
