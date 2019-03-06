import React from 'react';
import './SearchBar.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

const SearchBar = ( {searchField, searchChange, searchKey, hideInput, clearMobileEntry} ) => {
	return (
		<div className='search-bar' onClick={clearMobileEntry}>
			<div className='recent-container'>
				<Button title='Recent' buttonType='ghost' icon='time'/>
			</div>
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