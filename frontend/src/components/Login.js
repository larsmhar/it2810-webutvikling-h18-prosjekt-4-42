import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../actions/userActions';
import Errors from './Errors';

import './Login.css';

class Login extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            'username': '',
        };
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onUsernameChange = this.onUsernameChange.bind( this );
    }

    onHandleSubmit( e ) {
        e.preventDefault();
        this.props.getUser( this.state.username );
    }

    onUsernameChange( e ) {
        this.setState( { 'username': e.target.value } );
    }

    render() {
        let error;
        if ( 'errors' in this.props.user.user ) {
            error = ( <div><Errors errors={this.props.user.user.errors} /><p>PPP</p> </div> );
        }
        return (
            <form className="loginForm" onSubmit={ this.onHandleSubmit }>
                <i class="material-icons md-42 userIcon">person</i>
                <input className="userField" type="text" value={ this.state.username } placeholder="username" onChange={ this.onUsernameChange } autofocus></input>
                <input className="loginBtn" type="submit" value="Log in"/>
            </form>
        );
    }
}

const mapStateToProps = state => ( {
    'user': state.user
} );

export default connect( mapStateToProps, { getUser } )( Login );
