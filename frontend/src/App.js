import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Items from './components/Items';

class App extends Component {
	componentWillMount() {
		console.log("test")
	}
  render() {
  console.log("App")
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
		  <Items/>
        </header>
      </div>
    );
  }
}

export default App;
