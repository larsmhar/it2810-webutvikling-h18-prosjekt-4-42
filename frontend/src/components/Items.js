import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../actions/filmActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Items extends Component {

    componentWillMount() {
        this.props.fetchFilms( this.props.user.user.data.user.uid );
    }

    generateClass( id ) {
        let divClass = 'Item-container';
        divClass += this.props.films.data.userWatched.filter( item => item.id == id ).filter( item => !!item.watched ).length > 0 ? ' watched' : '';
        return divClass += this.props.films.data.userLiked.filter( item => item.id == id ).filter( item => !!item.liked ).length > 0 ? ' liked' : '';
    }

    render() {
        const films = this.props.films.data.films.map( film =>
            <Link to={'/films/' + film.id}>
                <div id={film.id} className={this.generateClass( film.id )} >
                    <div className="hiddenTitle">{film.title}</div>
                	<img src={film.poster} alt="poster"/>
                </div>
            </Link> );
        return (
 			[
                films
            ]
        );
    }
}

Items.propTypes = {
    'fetchFilms': PropTypes.func.isRequired,
    'films': PropTypes.array.isRequired,
};

const mapStateToProps = state => ( {
    'films': state.films.items,
    'user': state.user,
} );

export default connect( mapStateToProps, { fetchFilms } )( Items );
