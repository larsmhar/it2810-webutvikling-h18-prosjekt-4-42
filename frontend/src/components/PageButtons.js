import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goForwards, goBackwards } from '../actions/pageinationActions.js';

import './PageButtons.css';
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
        const page = this.props.pageination.pageination;
        const btnBck = page > 0 ? <i id="btnBck" className="material-icons" onClick={this.buttonHandler}>arrow_back_ios</i> : null;
        const btnFwd = page < ( 250 / 18 ) - 1 ? < i id="btnFwd" className="material-icons" onClick={this.buttonHandler}>arrow_forward_ios</i> : null;
        return (
            <div className="pageButtons">
                {btnBck}
                Page {page + 1}
                {btnFwd}
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { goBackwards, goForwards } )( PageButtons );
