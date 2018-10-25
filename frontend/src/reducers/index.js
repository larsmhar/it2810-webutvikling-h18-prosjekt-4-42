import  { combineReducers } from 'redux'
import filmReducer from './postReducer'

export default combineReducers({
	films: filmReducer
})
