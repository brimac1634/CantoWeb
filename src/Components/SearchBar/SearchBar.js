import React, { Component } from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { validateUser, setQueryURL, requestToLogin } from '../../Helpers/helpers';
import MediaQuery from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { setPrevRoute } from '../../Routing/actions';
import { setMobileEntry } from '../../Containers/Search/actions';
import { setTempSearch } from './actions';
import { setSearchKey } from '../../Containers/Search/actions';
import { setLoading } from '../../Loading/actions';
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
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
}

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			initialSearchList: [],
			searchList: []
		}
	}

	componentDidMount() {
		const searchList = JSON.parse(localStorage.getItem('searchList'))
		this.setState({
			initialSearchList: searchList,
			searchList
		})
	}

	handleSearchRoute = (route) => {
		const { pathName, updateURL, userID, setLoading } = this.props;
		const { SEARCH, LOGIN } = routes;
		setLoading(true)

		if (route === pathName) {
			updateURL(SEARCH)
		} else {
			if (route !== SEARCH && !validateUser(userID)) {
				requestToLogin(()=>{
					setPrevRoute(pathName)
		        	updateURL(LOGIN)
				})
			} else {
				updateURL(route)
			}
		}
	}

	handleSearch = (word) => {
		const { updateURL, setSearchKey, hash } = this.props;
		const url = setQueryURL(word, hash)
		sessionStorage.setItem('searchURL', JSON.stringify(url));
		updateURL(url)
		setSearchKey(word);
		this.updateSearchList(word);
	}

	searchChange = (event) => {
		const word = event.target.value
		const { setTempSearch } = this.props;
		let { initialSearchList } = this.state;
		setTempSearch(word)
		if (initialSearchList) {
			const searchList = initialSearchList.filter(item => item.includes(word))
			this.setState({searchList})
		}
	}

	searchSubmit = (event) => {
		const { hash, tempSearchKey, setLoading } = this.props;
		const enterPressed = (event.which === 13);
		if (enterPressed && tempSearchKey) {
			setLoading(true)
			this.handleSearch(tempSearchKey, hash)
		}
	}

	updateSearchList = (key) => {
		let searchList = JSON.parse(localStorage.getItem('searchList'))
			if (searchList !== null) {
				searchList.unshift(key)
				if (searchList.length > 15) {
					searchList.pop()
				}
			} else {
				searchList = [key]
			}
			this.setState({
				searchList,
				initialSearchList: searchList,
			})
			localStorage.setItem('searchList', JSON.stringify(searchList))
	}

	wordSelect = (word) => {
		const { setTempSearch } = this.props;
		setTempSearch(word)
		this.handleSearch(word)
	}


	render() {
		const { 
			pathName,
			tempSearchKey,
		 } = this.props;
		 const { searchList } = this.state;
		 const { FAVORITES, RECENT } = routes;
		return (
			<div className='search-bar' onClick={()=>setMobileEntry('')}>
				<MediaQuery maxWidth={574}>
					{(matches) => {
						return <div className='filter-container'>
									<Button 
										title={matches ? null : 'Recent'}
										buttonType='ghost' 
										icon='time' 
										height='34px'
										margin='10px 5px'
										isSelected={pathName === RECENT
														? true
														: false}
										handleClick={()=>this.handleSearchRoute(RECENT)}
									/>
									<Button 
										title={matches ? null : 'Favorites'}
										buttonType='ghost' 
										icon='like-2' 
										height='34px'
										margin='10px 5px'
										isSelected={pathName === FAVORITES
														? true
														: false}
										handleClick={()=>this.handleSearchRoute(FAVORITES)}
									/>
								</div>
					}}
				</MediaQuery>				
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
											value={tempSearchKey ? tempSearchKey : ''}
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
									maxHeight='200px'
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