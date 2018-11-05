import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import PageButtons from '../components/PageButtons';
import { searchTitle, fetchFilms } from '../actions/filmActions';

class Filmspage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            'searchString': '',
        };
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onSearchChange = this.onSearchChange.bind( this );
    }

    onHandleSubmit( e ) {
        e.preventDefault();
        this.props.searchTitle( this.state.searchString );
        this.props.fetchFilms( this.props.user.user.data.user.uid, 0, 18, this.state.searchString );
    }

    onSearchChange( e ) {
        this.setState( { 'searchString': e.target.value } );
    }

    componentDidMount() {
        console.log( 'searchstring:', this.props.searchString );
        this.setState( { 'searchString': this.props.searchString } );
    }

    render() {
        console.log( this.props.pageination )
        return (
            <div style={{'display':'flex', 'flexDirection':'column', 'justifyContent':'center'}}>
                <div style={{'display':'inline-block'}}>
                    <form onSubmit={ this.onHandleSubmit }>
                        <i className="material-icons md-42 userIcon">search</i>
                        <input className="userField" type="text" value={ this.state.searchString } placeholder="search" onInput={ this.onSearchChange } autofocus></input>
                        <input className="loginBtn" type="submit" value="search" />
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
    'pageination': state.pageination
} );

export default connect( mapStateToProps, { searchTitle, fetchFilms } )( Filmspage );
