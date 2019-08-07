import { SET_DECK, SET_DECK_ENTRIES } from './deck-view.constants';

const initialState = {
	deck: {},
	deckEntries: []
}

export const setDeck = (state=initialState, action={}) => {
	switch (action.type) {
		case SET_DECK:
			return Object.assign({}, state, {deck: action.payload})
		case SET_DECK_ENTRIES:
			return Object.assign({}, state, {deckEntries: action.payload})
		default:
			return state
	}
}