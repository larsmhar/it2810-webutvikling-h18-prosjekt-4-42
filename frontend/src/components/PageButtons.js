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
            this.props.fetchFilms( this.props.user.user.data.user.uid,
                this.props.pageination.pageination * 18 - 18, 18, this.props.searchString,
                this.props.year, this.props.sortMethod, this.props.filterWatched );
        } else {
            this.props.goForwards();
            this.props.fetchFilms( this.props.user.user.data.user.uid,
                this.props.pageination.pageination * 18 + 18, 18, this.props.searchString,
                this.props.year, this.props.sortMethod, this.props.filterWatched );

        }
    }
    render() {
        const page = this.props.pageination.pageination;
        const total = this.props.total;
        const btnBck = page > 0 ?
            <i id="btnBck"
                className="material-icons"
                onClick={this.buttonHandler}
                style={{'cursor':'pointer'}}>arrow_back_ios</i> :
            <i id="btnBck"
                className="material-icons"
                style={{'filter':'opacity(0)'}}>first_page</i>;

        const btnFwd = page < ( total / 18 ) - 1 ? < i id="btnFwd"
            className="material-icons" onClick={this.buttonHandler}
            style={{'cursor':'pointer'}}>arrow_forward_ios</i> :
            < i id="btnFwd"
                className="material-icons"
                style={{'filter':'opacity(0)'}}>last_page</i> ;
        return (
            <div className="pageButtons" style={{'userSelect':'none'}}>
                {btnBck}
                Page {page + 1} of {Math.ceil( total / 18 )}
                {btnFwd}
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    'total': state.films.items.data.films.total,
    'pageination': state.pageination,
    'user': state.user,
    'searchString': state.films.searchString,
    'filterWatched': state.films.filterWatched,
    'sortMethod': state.films.sortMethod,
    'year': state.films.year
} );

export default connect( mapStateToProps, { goBackwards, goForwards, fetchFilms } )( PageButtons );
