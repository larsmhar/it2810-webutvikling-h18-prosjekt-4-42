import React, { Component } from 'react';

import Items from '../components/Items';

class Filmspage extends Component {
    render() {
        return (
            <div className="App-container" style={{'marginTop':'1em'}}>
                <Items/>
            </div>
        );
    }
}

export default Filmspage;
