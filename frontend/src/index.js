import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store/store';


import { LOCAL_STORAGE_USER } from './actions/types'

const token = localStorage.getItem( 'user' );
if ( token ) {
    store.dispatch( { 
        'type': LOCAL_STORAGE_USER,
        'payload': JSON.parse( token ),

    } );
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
