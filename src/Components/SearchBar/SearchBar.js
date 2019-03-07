import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { setSearchRoute } from '../../Containers/Search/actions';

const mapStateToProps = state => {
	return {
		searchRoute: state.search.route
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setRoute: (route) => dispatch(setSearchRoute(route)),
	}
}

const SearchBar = ( {searchField, searchChange, searchKey, hideInput, clearMobileEntry, searchRoute, setRoute} ) => {

	return (
		<div className='search-bar' onClick={clearMobileEntry}>
			<div className='recent-container'>
				<Button title='Recent' buttonType='ghost' icon='time' handleClick={()=>setRoute('recentEntries')}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);