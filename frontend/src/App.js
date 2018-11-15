import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import Filmspage from './screens/Filmspage';
import Frontpage from './screens/Frontpage';
import Film from './screens/Film';
import Error from './screens/Error';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

import { getLocalStorageUser, logOut } from './actions/userActions'


class App extends Component {


    componentWillMount() {
        if ( window.localStorage.getItem( 'user' ) ) {
            this.props.getLocalStorageUser( JSON.parse( window.localStorage.getItem( 'user' ) ) );
        }
    }

    checkLogin( component, destination ) {
        return this.props.user.user.data.user ? <Redirect to={ destination }/> : component;
    }

    checkIfLogin( component, destination = '/prosjekt4/' ) {
        return this.props.user.user.data.user ? component : <Redirect to={ destination }/>;
    }

    render() {
        //localStorage.setItem("thing", "datum")
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div> <Link to='/prosjekt4/'> Filmlr</Link></div>
                        <button className='loginBtn' onClick={ this.props.logOut }> Log out button </button>
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
                    {/*
                        <Route exact path='/' render={() => this.checkLogin( <Frontpage/>, 'films' ) } />
                        <Route path="/films" render={() => this.checkIfLogin( <Filmspage/> ) } />
                        <Route path="/films/:id" render={( props ) => this.checkIfLogin( <Film {...props} /> ) }/>
                        */}
                    <Switch>
                        <Route path="/prosjekt4/films/:id" render={( props ) => this.checkIfLogin( <Film {...props} /> ) }/>
                        <Route exact path="/prosjekt4/films" render={() => this.checkIfLogin( <Filmspage/> ) } />
                        <Route exact path='/prosjekt4/' render={() => this.checkLogin( <Frontpage/>, '/prosjekt4/films' ) } />
                        <Route path='*' component={ Error } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ( {
    'user': state.user
} );

export default connect( mapStateToProps, { getLocalStorageUser, logOut } )( App );
