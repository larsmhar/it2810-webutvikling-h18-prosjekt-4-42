import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goForwards, goBackwards } from '../actions/pageinationActions.js';

class PageButtons extends Component {
    constructor( props ) {
        super( props );
        this.buttonHandler = this.buttonHandler.bind( this );
    }
    buttonHandler( e ) {
        if ( e.target.id == 'btnBck' ) {
            this.props.goBackwards();
        } else {
            this.props.goForwards();
        }
    }
    render() {
        return (
            <div className="pageButtons">
                <i id="btnBck" className="material-icons" onClick={this.buttonHandler}>arrow_back_ios</i>
                <i id="btnFwd" className="material-icons" onClick={this.buttonHandler}>arrow_forward_ios</i>
            </div>
        );
    }
}

const mapStateToProps = state => ( {
} );

export default connect( mapStateToProps, { goBackwards, goForwards } )( PageButtons );
