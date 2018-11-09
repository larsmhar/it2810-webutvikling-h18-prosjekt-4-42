import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../actions/filmActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Items extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
        this.props.fetchFilms( this.props.user.user.data.user.uid, this.props.pageination.pageination * 18, 18, this.props.searchString, this.props.year, this.props.sortMethod, this.props.filterWatched );
    }

    generateClass( id ) {
        let divClass = 'Item-container';
        divClass += this.props.films.data.userWatched.filter( item => item.id == id ).filter( item => !!item.watched ).length > 0 ? ' watched' : '';
        return divClass += this.props.films.data.userLiked.filter( item => item.id == id ).filter( item => !!item.liked ).length > 0 ? ' liked' : '';
    }

    render() {
<<<<<<< HEAD
        console.log(this.props.films.data);
        const films = this.props.films.data.films.movies.map( film =>
            <Link to={'/films/' + film.id} key={film.id}>
=======
        const films = this.props.films.data.films.movies.map( film =>
            <Link to={'/prosjekt4/films/' + film.id} key={film.id}>
>>>>>>> master
                <div id={film.id} className={this.generateClass( film.id )} >
                    <div className="hiddenTitle">{film.title}</div>
                	<img id={'img' + film.id} src={film.poster} alt="poster"/>
                </div>
            </Link> );
        return (
 			[
                films
            ]
        );
    }
}

const mapStateToProps = state => ( {
    'films': state.films.items,
    'searchString': state.films.searchString,
    'sortMethod': state.films.sortMethod,
    'filterWatched': state.films.filterWatched,
    'year': state.films.year,
    'user': state.user,
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { fetchFilms } )( Items );
