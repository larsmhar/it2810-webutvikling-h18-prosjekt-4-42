import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../actions/filmActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Items extends Component {

    componentWillMount() {
        this.props.fetchFilms();
    }

    generateClass(id) {
        let divClass = "Item-container";
        divClass += this.props.films.data.userWatched.filter(item => item.id == id).length > 0 ? " watched" : "";
        return divClass += this.props.films.data.userLiked.filter(item => item.id == id).length > 0 ? " liked" : "";
    }

	render() {
		console.log("props:", this.props)
		console.log(this.props.films)
		console.log(this.props.films.data)
		const films = this.props.films.data.films.map(film =>
			<Link to={"/film/" + film.id}>
				<div id={film.id} className={this.generateClass(film.id)} >
                	<img src={film.poster} alt="poster"/>
				</div>
			</Link>)
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
    'films': state.films.items
} );

export default connect( mapStateToProps, { fetchFilms } )( Items );
