import React from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { validateUser } from '../../Helpers/helpers';
import MediaQuery from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { setPrevRoute } from '../../Routing/actions';
import {setMobileEntry} from '../../Containers/Search/actions';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname,
		userID: state.user.user.userID,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		updateURL: (type) => dispatch(push(type)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
	}
}

const SearchBar = withRouter(( {userID, updateURL, searchField, searchChange, searchKey, hideInput, pathName, searchSubmit, setMobileEntry} ) => {

	const handleSearchRoute = (route) => {
		if (route === pathName) {
			updateURL('/search')
		} else {
			if (route !== '/search' && !validateUser(userID)) {
				optionAlert({
				    title: 'Please sign in.',
				    message: 'You must be signed in to keep track of recently viewed entries. Would you like to sign in or register now?',
				    buttons: [
				      {
				        label: 'Yes',
				        onClick: () => {
				        	setPrevRoute(pathName)
				        	updateURL('signin')
				        }
				      },
				      {
				        label: 'No',
				        onClick: null
				      }
				    ]
			    })
			} else {
				updateURL(route)
			}
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