import React from 'react';
import './deck.styles.css';
import MediaQuery from 'react-responsive';

const Deck = ({deck, handleClick, isDisabled, margin}) => {
	let { deck_name } = deck;
	deck_name = deck_name.charAt(0).toUpperCase() + deck.deck_name.slice(1);
	const disable = isDisabled ? 'disabled' : 'default';
	const marg = margin ? margin : '10px';
	const shouldClick = (deck) => {
		if (!isDisabled) {
			handleClick(deck)
		}
	}
	return (
		<MediaQuery maxWidth={699}>
			{(matches) => {
				return 	(
					<div 
						className={`deck ${disable}`}
						style={{margin: marg}} 
						onClick={()=>shouldClick(deck)}
					>
						<div className='name-container'>
							{matches 	
								? 	<h2>{deck_name}</h2>
								: 	<h1>{deck_name}</h1>
							}
					    </div>
					</div>
				)
			}}
		</MediaQuery>
	);
}

export default Deck;