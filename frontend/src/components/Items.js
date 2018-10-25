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
			<div>
				<p>{film.Title}</p>
			</div>)
		return (
			<div>
				<p>Items2</p>
				{films}
			</div>
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
