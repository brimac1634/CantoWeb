import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import {setMobileEntry} from '../../Containers/Search/actions';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		setListType: (type) => dispatch(push(type)),
	}
}

const SearchBar = withRouter(( {setListType, searchField, searchChange, searchKey, hideInput, pathName, searchSubmit, setMobileEntry} ) => {

	const handleSearchRoute = (route) => {
		if (route === pathName) {
			setListType('/search')
		} else {
			setListType(route)
		}
	}

	return (
		<div className='search-bar' onClick={()=>setMobileEntry('')}>
			<div className='recent-container'>
				<MediaQuery maxWidth={574}>
					{(matches) => {
						return <Button 
									title={matches ? null : 'Recent'}
									buttonType='ghost' 
									icon='time' 
									isSelected={pathName === '/search/recent'
													? true
													: false}
									handleClick={()=>handleSearchRoute('/search/recent')}
								/>
					}}
				</MediaQuery>
			</div>
			<div className='search-container'>
				{hideInput || pathName === '/search/recent'
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