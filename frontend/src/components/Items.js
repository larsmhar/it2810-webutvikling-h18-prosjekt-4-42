import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilms } from '../actions/filmActions';
import { Link } from 'react-router-dom';

class Items extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
        this.props.fetchFilms( this.props.user.user.data.user.uid,
            this.props.pageination.pageination * 18, 18, this.props.searchString,
            this.props.year, this.props.sortMethod, this.props.filterWatched );
    }

    generateClass( film ) {
        let divClass = 'Item-container';
        divClass += film.watched ? ' watched' : '';
        return divClass += film.liked ? ' liked' : '';
    }

    render() {
        const films = this.props.films.data.films.movies.map( film =>
            <Link to={'/prosjekt4/films/' + film.id} key={film.id}>
                <div id={film.id}
                    className={ this.generateClass( film ) } >
                    <div className="hiddenTitle">{film.title}</div>
                    <img id={'img' + film.id}
                        src={film.poster}
                        alt="poster"/>
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
