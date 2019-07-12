import React from 'react';
import './Deck.css';

const Deck = ({deck, handleClick, isDisabled}) => {
	const { deck_name } = deck;
	const disable = isDisabled ? 'disabled' : 'default';
	const shouldClick = (deck) => {
		if (!isDisabled) {
			handleClick(deck)
		}
	}
	return (
		<div className={`deck ${disable}`} onClick={()=>shouldClick(deck)}>
			<div className='name-container'>
		        <h1>{deck_name}</h1>
		    </div>
		</div>
	);
}

export default Deck;