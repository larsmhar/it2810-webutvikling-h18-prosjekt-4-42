import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Frontpage from './screens/Frontpage';
import Film from './screens/Film';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="App">
                        <header className="App-header">
                            <div> <Link to='/'> Filmlr</Link></div>
                        </header>
                        {/* Had to set margin-top here, because setting in css didn't work?*/}
                    </div>
                    <Route exact path="/" component={Frontpage} />
                    <Route path="/film/:id" component={Film} />
                </div>
            </Router>
        );
    }
}

export default App;
