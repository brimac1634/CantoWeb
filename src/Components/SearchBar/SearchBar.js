import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setListType: (type) => dispatch(push(type)),
	}
}

const SearchBar = withRouter(( {setListType, searchField, searchChange, searchKey, hideInput, clearMobileEntry, pathName, searchSubmit} ) => {

	const handleSearchRoute = (route) => {
		console.log(route)
		if (route === pathName) {
			setListType('/search')
		} else {
			setListType(route)
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
						isSelected={pathName === '/search/recent'
										? true
										: false}
						handleClick={()=>handleSearchRoute('/search/recent')}
					/>
				</MediaQuery>
				<MediaQuery maxWidth={574}>
					<Button 
						buttonType='ghost' 
						icon='time' 
						isSelected={pathName === '/search/recent'
										? true
										: false}
						handleClick={()=>handleSearchRoute('/search/recent')}
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