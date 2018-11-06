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
            'filterWatched': false
            'year': '1900',
        };
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onSearchChange = this.onSearchChange.bind( this );
        this.onYearChange = this.onYearChange.bind( this );
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
            'year'
         } );
=======
        this.setState( { 'searchString': this.props.searchString } );
        this.setState( { 'year': this.props.year } );
>>>>>>> frontend/src/screens/Filmspage.js
    }

    render() {
        console.log( this.props.pageination )
        return (
            <div style={{'display':'flex', 'flexDirection':'column', 'justifyContent':'center'}}>
                <div style={{'display':'flex', 'justifyContent':'center', 'padding':'10px'}}>
                    <form onSubmit={ this.onHandleSubmit }>
                        <i className="material-icons md-42 userIcon">search</i>
                        <input className="userField" type="text" value={ this.state.searchString } placeholder="search" onInput={ this.onSearchChange } autoFocus></input>
                        <input type="checkbox" value={ this.state.filterWatched } onChange={ this.onFilterChange.bind(this) } />
                        <input className="userField" type="text" value={ this.state.searchString } placeholder="search" onInput={ this.onSearchChange } autofocus></input>
                        <input className="loginBtn" type="submit" value="search" /> <br/>
                        <label for="year"> Show only movies released after: </label>
                        <input className="yearField" type="number" id="year" name="year" onInput={this.onYearChange} value={this.state.year} min="1900" max={( new Date() ).getFullYear()} />
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
<<<<<<< frontend/src/screens/Filmspage.js
    'filterWatched': state.films.filterWatched,
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { searchTitle, fetchFilms, filterWatched } )( Filmspage );
=======
    'year': state.films.year,
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { searchTitle, filterYear, fetchFilms } )( Filmspage );
>>>>>>> frontend/src/screens/Filmspage.js
