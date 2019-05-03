import React, { Component } from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { validateUser } from '../../Helpers/helpers';
import MediaQuery from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { setPrevRoute } from '../../Routing/actions';
import { setMobileEntry } from '../../Containers/Search/actions';
import { setTempSearch } from './actions';
import { setSearchKey } from '../../Containers/Search/actions';
import { routes } from '../../Routing/constants';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import DropDown from '../../Containers/DropDown/DropDown';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname,
		hash: state.router.location.hash,
		userID: state.user.user.userID,
		tempSearchKey: state.temp.key,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		updateURL: (type) => dispatch(push(type)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setTempSearch: (key) => dispatch(setTempSearch(key)),
		setSearchKey: (searchKey) => dispatch(setSearchKey(searchKey)),
	}
}

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchList: []
		}
	}

	componentDidMount() {
		const searchList = JSON.parse(localStorage.getItem('searchList'))
		this.setState({searchList})
	}

	componentDidUpdate() {
		// const { searchList } = this.state;
		// const savedSearchList = JSON.parse(localStorage.getItem('searchList'))
		// if (searchList !== savedSearchList) {
		// 	this.setState({searchList: savedSearchList})
		// }
	}

	handleSearchRoute = (route) => {
		const { pathName, updateURL, userID } = this.props;
		const { SEARCH } = routes;
		if (route === pathName) {
			updateURL(SEARCH)
		} else {
			if (route !== SEARCH && !validateUser(userID)) {
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

	searchChange = (event) => {
		const { setTempSearch } = this.props;
		setTempSearch(event.target.value)
	}

	searchSubmit = (event) => {
		const { updateURL, hash, tempSearchKey, setSearchKey } = this.props;
		const enterPressed = (event.which === 13);
		if (enterPressed) {
			updateURL(this.setQuery(tempSearchKey, hash))
			setSearchKey(tempSearchKey);
			let searchList = JSON.parse(localStorage.getItem('searchList'))
			if (searchList !== null) {
				searchList.unshift(tempSearchKey)
				if (searchList > 5) {
					searchList.pop()
				}
			} else {
				searchList = [tempSearchKey]
			}
			
			localStorage.setItem('searchList', JSON.stringify(searchList))
		}
	}

	setQuery = (key, hash) => {
		return `/search?searchkey=${key}${hash}` 
	}

	wordSelect = (word) => {
		const { setTempSearch } = this.props;
		setTempSearch(word)
	}


	render() {
		const { 
			pathName,
			searchKey,
		 } = this.props;
		 const { searchList } = this.state;
		 const { FAVORITES, RECENT } = routes;
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
										handleClick={()=>this.handleSearchRoute(RECENT)}
									/>
						}}
					</MediaQuery>
				</div>
				<div className='search-container'>
					{pathName === RECENT || pathName === FAVORITES
						?	null
						:   <Controller>
								<Trigger>
									<div className='center-div'>
										<TextInput 
											icon='search' 
											placeHolder='English/Cantonese/Mandarin/Jyutping'
											margin='10px 0'
											value={searchKey}
											height='34px' 
											handleChange={this.searchChange}
											handleInput={this.searchSubmit}
										/>
									</div>
								</Trigger>
								<DropDown 
									list={searchList} 
									handleSelection={this.wordSelect}
									adjustY={-5}
								/>
							</Controller>
					}
					
				</div>
				<div className='bottom-divider'></div>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);