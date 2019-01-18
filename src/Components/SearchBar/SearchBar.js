import React from 'react';
import './SearchBar.css';
import Icon from '../Icon/Icon';

const SearchBar = ( {searchField, searchChange} ) => {
	return (
		<div className='search-bar'>
				<div className='search-container'>
					<input 
						className='search input-field' 
						type='search' 
						placeholder='English/Cantonese/Mandarin/Jyutping' 
						onChange={searchChange}
					/>
				</div>
				<div className='icon-container'>
					<Icon className='search-icon' iconStyle='dark' icon='search' width='25'/>
				</div>
			<div className='bottom-divider'></div>
		</div>
	);
}

export default SearchBar;