import React, { Component } from 'react';

import Items from '../components/Items';
import PageButtons from '../components/PageButtons';

class Filmspage extends Component {
    render() {
        return (
            <div className="App-container" style={{'marginTop':'1em'}}>
                <Items/>
                <PageButtons/>
            </div>
        );
    }
}

export default Filmspage;
