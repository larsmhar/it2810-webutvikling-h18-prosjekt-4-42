import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {
    render() {
        return (
            <div>
                <p>Error</p>
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    'user': state.user
} );

export default connect( mapStateToProps )( Error );
