import React from 'react';
import './Deck.css';

const Deck = ({deck, handleClick}) => {
	const { name } = deck;
	return (
		<div className='deck' onClick={()=>handleClick(deck)}>
			<div className='name-container'>
		        <h1>{name}</h1>
		    </div>
		</div>
	);
}

export default Deck;