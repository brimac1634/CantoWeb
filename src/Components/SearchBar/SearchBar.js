import React from 'react';
import './SearchBar.css';
import TextInput from '../TextInput/TextInput';

const SearchBar = ( {searchField, searchChange, searchKey, hideInput} ) => {
	return (
		<div className='search-bar'>
			<div className='search-container'>
				{hideInput
					?	null
					:   <TextInput 
							icon='search' 
							placeHolder='English/Cantonese/Mandarin/Jyutping'
							value={searchKey}
							height='34px' 
							handleChange={searchChange}
						/>
				}
				
			</div>
			<div className='bottom-divider'></div>
		</div>
	);
}

export default SearchBar;