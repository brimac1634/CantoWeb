import React from 'react';
import './SearchBar.css';
import Icon from '../Icon/Icon';

const SearchBar = ( {searchField, searchChange} ) => {
	return (
		<div className='search-bar'>
				<div className='search-container'>
					<input 
						className='search' 
						type='search' 
						placeholder='English/Cantonese/Mandarin/Jyutping' 
						onChange={searchChange}
					/>
					<div className='icon-container'>
						<Icon className='search-icon' iconStyle='dark' icon='search' width='30'/>
					</div>
				</div>
			<div className='bottom-divider'></div>
		</div>
	);
}

export default SearchBar;