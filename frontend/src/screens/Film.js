import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilm, fetchFilms } from '../actions/filmActions';
import './Film.css';

class Film extends Component {

    componentWillMount() {
        //console.log( this.props.match.params.id );
        this.props.fetchFilms();
        this.props.fetchFilm( this.props.match.params.id );
    }

    constructor( props ) {
        super( props );
        this.state = {
            'favorite':false,
            'watched':false,
        };
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( e ) {
        if ( e.target.id === 'favorite' ) {

            this.setState( {'favorite':!this.state.favorite} );

        } else if ( e.target.id === 'watched' ) {

            this.setState( {'watched':!this.state.watched} );

        }
    }

    //TODO GENERATE CLASS FUNCTION

    render() {
	    //console.log( this.props );
	    //console.log( this.props.film );
	    //console.log( this.props.film.data );
        //console.log( this.props.film.data.films );
        console.log( this.state );
        let film;
        if ( this.props.loaded) {
            console.log(this.props)
            this.props.userLiked.forEach( x => {
                if ( x['id'] == this.props.film[0]['id'] & this.state.favorite != true ) this.setState( { 'favorite': true }, console.log( 'Liked' ) );
            } );
            this.props.userWatched.forEach( x => {
                if ( x['id'] == this.props.film[0]['id'] && this.state.watched != true ) this.setState( { 'watched' : true }, console.log( 'watched' ) );
            } );
    	    film = this.props.film.map( film =>
    	        <div className="container">
    	            <img className="header-img" src={film.poster} />
    	            <img className="poster" src={film.poster}/>
    	            <div className="content">
    	              <span className="title">{film.title}</span> <span className="year">{film.year}</span><span className="director"><span className="directed">Directed by:</span> {film.director}</span>
    	              <hr/>
    	              <div className="actors">{film.actors}</div>
    	              <div className="plot">{film.plot}</div>
    	            </div>
    	            <div className="rate">
    	              <i id="favorite" onClick={this.handleClick} style={{'color':this.state.favorite ? '#ff5722' : '#bebebe'}} className="material-icons md-48">{this.state.favorite ? 'favorite' : 'favorite_border'}</i>
    	              <i id="watched" onClick={this.handleClick} style={{'color':this.state.watched ? '#8bc34a' : '#bebebe'}} className="material-icons md-48">visibility</i>
    	            </div>
                </div> );
        }
        else {
            film = <div className=''>loading</div>;
        }
        return (
            [film]
        );
    }
}

/*
Film.propTypes = {
    fetchFilm: PropTypes.func.isRequired,
    film: PropTypes.array.isRequired,
}
*/

const mapStateToProps = state => ( {
    'film': state.films.item.data.films,
    'films': state.films.items.data.films,
    'userLiked': state.films.items.data.userLiked,
    'userWatched': state.films.items.data.userWatched,
    'loaded': state.films.loaded,
} );

export default connect( mapStateToProps, { fetchFilm, fetchFilms } )( Film );
