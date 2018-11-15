import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilm, updateLiked, updateWatched } from '../actions/filmActions';
import './Film.css';

class Film extends Component {

    componentWillMount() {
        this.props.fetchFilm( this.props.match.params.id, this.props.user.user.data.user.uid, 0, 1 );
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
        if ( e.target.id === 'liked' ) {
            this.props.updateLiked( this.props.match.params.id, this.props.user.user.data.user.uid );
        } else if ( e.target.id === 'watched' ) {
            this.props.updateWatched( this.props.match.params.id, this.props.user.user.data.user.uid );
        }
    }

    render() {
        let film;
        if ( this.props.loaded ) {
            if ( this.state.liked != !!this.props.film[0]['liked'] ) {
                this.setState( { 'liked': !!this.props.film[0]['liked'] } );
            }
            if ( this.state.watched != !!this.props.film[0]['watched'] ) {
                this.setState( { 'watched': !!this.props.film[0]['watched'] } );
            }
    	    film = this.props.film.map( film =>
    	        <div className="container">
                    <img className="header-img"
                        alt="blurry header"
                        draggable="false"
                        src={film.poster} />
                    <img className="poster"
                        alt={film.title}
                        src={film.poster}/>
    	            <div className="content">
    	                <span className="title">{film.title}</span>
                        <span className="year">{film.year}</span>
                        <br/>
                        <span className="director">
                            <span className="directed">Directed by:</span>
                            {film.director}
                        </span>
    	                <hr/>
    	                <div className="actors">{film.actors}</div>
    	                <div className="plot">{film.plot}</div>
    	            </div>
    	            <div className="rate">
                        <i id="liked" onClick={this.handleClick}
                            style={{'color':this.state.liked ? '#ff5722' : '#bebebe'}}
                            className="material-icons md-48">{this.state.liked ? 'favorite' : 'favorite_border'}</i>
                        <i id="watched" onClick={this.handleClick}
                            style={{'color':this.state.watched ? '#8bc34a' : '#bebebe'}}
                            className="material-icons md-48">visibility</i>
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

const mapStateToProps = state => ( {
    'film': state.films.item.data.films.movies,
    'loaded': state.films.loaded,
    'user': state.user,
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { fetchFilm, updateLiked, updateWatched } )( Film );
