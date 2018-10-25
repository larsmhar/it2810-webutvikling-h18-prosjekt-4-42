import { FETCH_FILMS } from './types'

export const fetchFilms = () => dispatch => {
	console.log("fetching")
	fetch("http://localhost:4000/graphql", {
	  method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ query: '{ films { Title } }' }),
		  })
	.then(res => res.json())
	.then(films => dispatch({
		type: FETCH_FILMS,
		payload: films
	}))
}
