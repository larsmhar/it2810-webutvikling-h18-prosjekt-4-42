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
        <div> Filmlr</div>
        </header>
        {/* Had to set margin-top here, because setting in css didn't work?*/}
        <div class="App-container" style={{marginTop:'1em'}}>
            <Items/>
        </div>
      </div>
    );
  }
}

export default App;
