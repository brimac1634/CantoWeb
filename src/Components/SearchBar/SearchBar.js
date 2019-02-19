import React from 'react';
import './SearchBar.css';
import Icon from '../Icon/Icon';

const SearchBar = ( {searchField, searchChange, searchKey} ) => {
	return (
		<div className='search-bar'>
				<div className='search-container'>
					<input 
						className='search input-field' 
						type='search' 
						placeholder='English/Cantonese/Mandarin/Jyutping'
						value={searchKey} 
						onChange={searchChange}
					/>
				</div>
				<div className='icon-container'>
					<Icon 
						className='search-icon' 
						iconType='icon'
						iconStyle='dark' 
						icon='search' 
						width='18'
					/>
				</div>
			<div className='bottom-divider'></div>
		</div>
	);
}

export default SearchBar;