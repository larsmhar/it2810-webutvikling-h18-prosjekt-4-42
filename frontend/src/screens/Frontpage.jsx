import React, { Component } from 'react';

import Login from '../components/Login';

class Frontpage extends Component {
    render() {
        return (
            <div className="App-container" style={{'marginTop':'1em'}}>
                <Login/>
            </div>
        );
    }
}

export default Frontpage;
