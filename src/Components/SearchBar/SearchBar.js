import React from 'react';
import './SearchBar.css';

const SearchBar = ( {searchField, searchChange} ) => {
	return (
		<div className='search-bar'>
			<input 
				className='search' 
				type='search' 
				placeholder='English/Cantonese/Mandarin/Jyutping' 
				onChange={searchChange}
			/>
		</div>
	);
}

export default SearchBar;