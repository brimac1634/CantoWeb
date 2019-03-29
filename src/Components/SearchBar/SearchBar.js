import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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

const SearchBar = withRouter(( {history, searchField, searchChange, searchKey, hideInput, clearMobileEntry, searchRoute, setRoute, searchSubmit} ) => {

	const handleSearchRoute = (route) => {
		if (route === searchRoute) {
			setRoute('');
			history.push('/Search')
		} else {
			setRoute(route);
			history.push(`/Search/${route}`)
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
							handleInput={searchSubmit}
						/>
				}
				
			</div>
			<div className='bottom-divider'></div>
		</div>
	);
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);