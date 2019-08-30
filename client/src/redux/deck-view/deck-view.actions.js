import { SET_DECK, SET_DECK_ENTRIES } from './deck-view.constants';

export const setDeck = (deck) => ({
	type: SET_DECK,
	payload: deck
})

export const setDeckEntries = (deckEntries) => ({
	type: SET_DECK_ENTRIES,
	payload: deckEntries
})