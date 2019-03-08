import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import OptionAlert from '../OptionAlert/OptionAlert';
import MediaQuery from 'react-responsive';
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

	const handleSearchRoute = (route) => {
		if (route === searchRoute) {
			setRoute('');
		} else {
			setRoute(route);
		}
	}

	return (
		<div className='search-bar' onClick={clearMobileEntry}>
			<div className='recent-container'>
				<MediaQuery minWidth={575}>
					<Button 
						title='Recent' 
						buttonType='ghost' 
						icon='time' 
						isSelected={searchRoute === 'recentEntries'
										? true
										: false}
						handleClick={()=>handleSearchRoute('recentEntries')}
					/>
				</MediaQuery>
				<MediaQuery maxWidth={574}>
					<Button 
						buttonType='ghost' 
						icon='time' 
						isSelected={searchRoute === 'recentEntries'
										? true
										: false}
						handleClick={()=>handleSearchRoute('recentEntries')}
					/>
				</MediaQuery>
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