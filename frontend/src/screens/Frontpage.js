import React, { Component } from 'react';

import Items from '../components/Items';

class Frontpage extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container" style={{marginTop:'1em'}}>
            <Items/>
        </div>
      </div>
    );
  }
}

export default Frontpage;
