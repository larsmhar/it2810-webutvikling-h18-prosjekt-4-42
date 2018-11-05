import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilm, fetchFilms, updateLiked, updateWatched } from '../actions/filmActions';
import './Film.css';

class Film extends Component {

    componentWillMount() {
        //console.log( this.props.match.params.id );
        console.log( this.props );
        this.props.fetchFilms( this.props.user.user.data.user.uid );
        this.props.fetchFilm( this.props.match.params.id, this.props.user.user.data.user.uid );
    }

    constructor( props ) {
        super( props );
        this.state = {
            'liked':false,
            'watched':false,
        };
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( e ) {
        console.log( this.props.user.user.data )
        if ( e.target.id === 'liked' ) {
            this.props.updateLiked( this.props.match.params.id, this.props.user.user.data.user.uid );
            //this.setState( {'liked': !this.state.liked} );
        } else if ( e.target.id === 'watched' ) {
            this.props.updateWatched( this.props.match.params.id, this.props.user.user.data.user.uid );
            this.setState( {'watched':!this.state.watched} );

        }
    }

    //TODO GENERATE CLASS FUNCTION

    render() {
	    //console.log( this.props );
	    //console.log( this.props.film );
	    //console.log( this.props.film.data );
        //console.log( this.props.film.data.films );
        console.log( this.props.film );
        console.log( this.props );
        let film;
        if ( this.props.loaded ) {
            console.log( this.props );

            console.log( this.state.liked, !!this.props.film[0]['liked'] );
            if ( this.state.liked != !!this.props.film[0]['liked'] ) {
                this.setState( { 'liked': !!this.props.film[0]['liked'] } );
            }
            if ( this.state.watched != !!this.props.film[0]['watched'] ) {
                this.setState( { 'watched': !!this.props.film[0]['watched'] } );
            }
            /*
            this.props.userLiked.forEach( x => {
                if ( x['id'] == this.props.film[0]['id'] & this.state.favorite != true ) this.setState( { 'favorite': true }, console.log( 'Liked' ) );
            } );
            this.props.userWatched.forEach( x => {
                if ( x['id'] == this.props.film[0]['id'] && this.state.watched != true ) this.setState( { 'watched' : true }, console.log( 'watched' ) );
            } );
            */
    	    film = this.props.film.map( film =>
    	        <div className="container">
    	            <img className="header-img" alt="blurry header" draggable="false" src={film.poster} />
    	            <img className="poster" alt={film.title} src={film.poster}/>
    	            <div className="content">
    	              <span className="title">{film.title}</span> <span className="year">{film.year}</span><span className="director"><span className="directed">Directed by:</span> {film.director}</span>
    	              <hr/>
    	              <div className="actors">{film.actors}</div>
    	              <div className="plot">{film.plot}</div>
    	            </div>
    	            <div className="rate">
    	              <i id="liked" onClick={this.handleClick} style={{'color':this.state.liked ? '#ff5722' : '#bebebe'}} className="material-icons md-48">{this.state.liked ? 'favorite' : 'favorite_border'}</i>
    	              <i id="watched" onClick={this.handleClick} style={{'color':this.state.watched ? '#8bc34a' : '#bebebe'}} className="material-icons md-48">visibility</i>
    	            </div>
                </div> );
        } else {
            film = <div></div>;
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
    'user': state.user,
} );

export default connect( mapStateToProps, { fetchFilm, fetchFilms, updateLiked, updateWatched } )( Film );
