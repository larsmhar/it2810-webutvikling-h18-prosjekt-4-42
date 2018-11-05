import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import Filmspage from './screens/Filmspage';
import Frontpage from './screens/Frontpage';
import Film from './screens/Film';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class App extends Component {

    checkLogin( component, destination ) {
        return this.props.user.user.data.user ? <Redirect to={ destination }/> : component;
    }

    checkIfLogin( component, destination = '/' ) {
        return this.props.user.user.data.user ? component : <Redirect to={ destination }/>;
    }

    render() {
        //localStorage.setItem("thing", "datum")
        console.log( localStorage.getItem( 'thing' ) );
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div> <Link to='/'> Filmlr</Link></div>
                    </header>
                    {/* Had to set margin-top here, because setting in css didn't work?*/}
                    {/*
                    <Route exact path="/" render={() =>  
                        !!this.props.user.user.data ?
                            (<Redirect to='films'/>)
                            :
                            <Login/>
                    } />
                    */}
                    {console.log( this.props.user.user.data.user )}
                    <Route exact path='/' render={() => this.checkLogin( <Frontpage/>, 'films' ) } />
                    <Route exact path="/films" render={() => this.checkIfLogin( <Filmspage/> ) } />
                    <Route path="/films/:id" component={Film} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ( {
    'user': state.user
} );

export default connect( mapStateToProps )( App );

