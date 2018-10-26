import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchFilm } from '../actions/filmActions'
import './Film.css'

class Film extends Component {

	componentWillMount() {
		console.log(this.props.match.params.id)
		this.props.fetchFilm(this.props.match.params.id)
	}

  constructor(props){
    super(props);
    this.state={
      favorite:false,
      seen:false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    if ( e.target.id === 'favorite'){
      
      this.setState({favorite:!this.state.favorite});
      
    }else if (e.target.id === 'seen'){
      
      this.setState({seen:!this.state.seen});
      
    }
  }
  render() {
	  console.log(this.props)
	  console.log(this.props.film)
	  console.log(this.props.film.data)
	  console.log(this.props.film.data.films)
	  const film = this.props.film.data.films.map(film =>
	      <div className="container">
	        <img className="header-img" src={film.Poster} />
	        <img className="poster" src={film.Poster}/>
	        <div className="content">
	          <span className="title">{film.Title}</span> <span className="year">{film.Year}</span><span className="director"><span className="directed">Directed by:</span> {film.Director}</span> 
	          <hr/>
	          <div className="actors">{film.Actors}</div>
	          <div className="plot">{film.Plot}</div> 
	        </div>
	        <div className="rate">
	          <i id="favorite" onClick={this.handleClick} style={{color:this.state.favorite?"#ff5722":"#bebebe"}} className="material-icons md-48">{this.state.favorite ? "favorite":"favorite_border"}</i>
	          <i id="seen" onClick={this.handleClick} style={{color:this.state.seen?"#8bc34a":"#bebebe"}} className="material-icons md-48">visibility</i>
	        </div>
	      </div>)
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

const mapStateToProps = state => ({
	film: state.films.item
})

export default connect(mapStateToProps, { fetchFilm })(Film)
