import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const initialState = {
    'films': {
        'items': {
            'data': {
                'films': {
                    'movies': [{
                        'title': 'Cars',
                        'id': 0,
                    }],
                    'total': 0
                },
                'userWatched': [{
                    'title': 'Cars',
                    'id': 0,
                }],
                'userLiked': [{
                    'title': 'Cars',
                    'id': 0,
                }],
            }
        },
        'item': {
            'data': {
                'films': [{
                    'Title': 'Cars'
                }]
            }
        },
        'loaded': false
    },
    'user': {
        'user': {
            'data': {
                'user': null
            },
        }
    }
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware( ...middleware ),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
