import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goForwards, goBackwards } from '../actions/pageinationActions.js';
import { fetchFilms } from '../actions/filmActions';

import './PageButtons.css';
class PageButtons extends Component {
    constructor( props ) {
        super( props );
        this.buttonHandler = this.buttonHandler.bind( this );
    }
    buttonHandler( e ) {
        if ( e.target.id == 'btnBck' ) {
            this.props.goBackwards();
            this.props.fetchFilms( this.props.user.user.data.user.uid, this.props.pageination.pageination * 18 - 18, 18, this.props.searchString );
        } else {
            this.props.goForwards();
            this.props.fetchFilms( this.props.user.user.data.user.uid, this.props.pageination.pageination * 18 + 18, 18, this.props.searchString );

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
    'pageination': state.pageination,
    'user': state.user
} );

export default connect( mapStateToProps, { goBackwards, goForwards, fetchFilms } )( PageButtons );
