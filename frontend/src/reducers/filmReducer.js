import { FETCH_FILMS } from '../actions/types'

const initialState = {
	items: [],
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_FILMS:
		console.log("reducing")
			return {
				...state,
				items: action.payload
			}
		default:
			return state
	}
}
