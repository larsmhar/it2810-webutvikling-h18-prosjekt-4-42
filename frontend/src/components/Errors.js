import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class Errors extends Component {
    render() {
        console.log("Errors here")
        console.log(this.props.user.user.errors)
        return (
            <div>
                {this.props.user.user.errors.map( error =>
                    <div>{error.message}</div> )}
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    'user': state.user
} );

export default connect( mapStateToProps )( Errors );
