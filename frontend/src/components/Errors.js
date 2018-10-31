import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class Errors extends Component {
    render() {
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
