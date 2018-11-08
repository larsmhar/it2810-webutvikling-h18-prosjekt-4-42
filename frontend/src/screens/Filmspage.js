import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import PageButtons from '../components/PageButtons';
import { searchTitle, fetchFilms, filterWatched, filterYear } from '../actions/filmActions';
import { timingSafeEqual } from 'crypto';
import './Filmspage.css';

class Filmspage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            'searchString': '',
            'filterWatched': 0,
            'year': '1900',
        };
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onSearchChange = this.onSearchChange.bind( this );
        this.onYearChange = this.onYearChange.bind( this );
        this.onFilterChange= this.onFilterChange.bind( this );
    }

    onHandleSubmit( e ) {
        e.preventDefault();
        this.props.searchTitle( this.state.searchString );
        this.props.filterWatched( this.state.filterWatched );
        this.props.filterYear( this.state.year );
        this.props.fetchFilms( this.props.user.user.data.user.uid, 0, 18, this.state.searchString, this.state.year );
    }

    onSearchChange( e ) {
        this.setState( { 'searchString': e.target.value } );
    }

    onFilterChange( e ) {
        console.log(e.target.checked)
        this.setState( { 'filterWatched': e.target.checked } );
    
    }
    
    onYearChange( e ) {
        // console.log('year change', typeof e.target.value );
        this.setState( { 'year': e.target.value } );
    }

    componentDidMount() {
        console.log( 'searchstring:', this.props.searchString );
        this.setState( { 
            'searchString': this.props.searchString,
            'filterWatched': this.props.filterWatched,
            'year': this.props.year
         } );
    }

    render() {
        console.log( this.state.filterWatched )
        return (
            <div style={{'display':'flex', 'flexDirection':'column', 'justifyContent':'center'}}>
                <div style={{'display':'flex', 'justifyContent':'center', 'padding':'10px'}}>
                    <form onSubmit={ this.onHandleSubmit }>
                        <i className="material-icons md-42 userIcon">search</i>
                        <input className="userField" type="text" value={ this.state.searchString } placeholder="search" onChange={ this.onSearchChange } autoFocus></input>
                        <input type="checkbox" value={ this.state.filterWatched ? true : false } onChange={ this.onFilterChange } />
                        <input className="loginBtn" type="submit" value="search" /> <br/>
                        <label htmlFor="year"> Show only movies released after: </label>
                        <input className="yearField" type="number" id="year" name="year" onChange={this.onYearChange} value={this.state.year} min="1900" max={( new Date() ).getFullYear()} />
                    </form>
                </div>
                <div className="App-container" style={{'marginTop':'1em'}}>
                    <Items/>
                </div>
                <PageButtons/>
            </div>
        );
    }
}


const mapStateToProps = state => ( {
    'user': state.user,
    'searchString': state.films.searchString,
    'filterWatched': state.films.filterWatched,
    'pageination': state.pageination,
    'year': state.films.year,
} );

export default connect( mapStateToProps, { searchTitle, filterYear, fetchFilms, filterWatched } )( Filmspage );
