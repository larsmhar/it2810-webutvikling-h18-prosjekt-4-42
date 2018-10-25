import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchFilms } from '../actions/filmActions'

class Items extends Component {

	componentWillMount() {
		this.props.fetchFilms()
	}

	render() {
		console.log("props:", this.props)
		console.log(this.props.films)
		console.log(this.props.films.data)
		const films = this.props.films.data.films.map(film =>
			<div id={film.Id} class="Item-container">
				{/*<p>{film.Title}</p>*/}
                <img src={film.Poster} alt="poster"/>
			</div>)
		return (
            [films]
		)
	}
}

Items.propTypes = {
	fetchPosts: PropTypes.func.isRequired,
	films: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	films: state.films.items
})

export default connect(mapStateToProps, { fetchFilms })(Items)
