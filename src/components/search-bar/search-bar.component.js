import React, { Component } from 'react';
import './search-bar.styles.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { validateUser, setQueryURL, requestToLogin } from '../../helpers/helpers';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import TextInput from '../text-input/text-input.component';
import Button from '../button/button.component';
import { setPrevRoute } from '../../redux/routing/routing.actions';
import { setTempSearch, setSearchType, setSearchKey } from '../../redux/search-bar/search-bar.actions';
import { routes } from '../../redux/routing/routing.constants';
import Controller from '../compound/controller.component';
import Trigger from '../compound/trigger.component';
import DropDown from '../drop-down/drop-down.component';

const mapStateToProps = state => {
	return {
		pathName: state.router.location.pathname,
		hash: state.router.location.hash,
		search: state.router.location.search,
		userID: state.user.user.userID,
		urlSearchKey: state.temp.key,
		searchType: state.temp.searchType,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (type) => dispatch(push(type)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setTempSearch: (key) => dispatch(setTempSearch(key)),
		setSearchType: (type) => dispatch(setSearchType(type)),
		setSearchKey: (word) => dispatch(setSearchKey(word)),
	}
}

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tempSearchKey: '',
			initialSearchList: [],
			searchList: [],
		}
	}

	componentDidMount() {
		const { search, setSearchType, pathName, setTempSearch } = this.props;
		const { SEARCH, LEARN } = routes;

		const list = this.getList()
		const searchList = JSON.parse(localStorage.getItem(list))
		this.setState({
			initialSearchList: searchList,
			searchList
		})

		if (search) {
			const values = queryString.parse(search)
			if (pathName === SEARCH) {
				setSearchType(values.searchtype)
			} else if (pathName === LEARN) {
				setTempSearch(values.decksearch)
			}
		} 
	}

	componentDidUpdate(prevProps) {
		const { urlSearchKey } = this.props;
		if (prevProps.urlSearchKey !== urlSearchKey) {
			this.setState({tempSearchKey: urlSearchKey})
		}
	}

	handleSearchRoute = (e, route) => {
		const { pathName, updateURL, userID } = this.props;
		const { SEARCH, LOGIN } = routes;
		e.target.blur();
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
		const { updateURL, hash, searchType } = this.props;
		const url = setQueryURL(word, searchType, hash)
		sessionStorage.setItem('searchURL', JSON.stringify(url));
		updateURL(url)
		this.updateSearchList(word);
	}

	searchChange = (event) => {
		const word = event.target.value
		let { initialSearchList } = this.state;
		this.setState({tempSearchKey: word})
		if (initialSearchList) {
			const searchList = initialSearchList.filter(item => item.includes(word))
			this.setState({searchList})
		}
	}

	searchSubmit = (event) => {
		const { pathName, updateURL, setSearchKey } = this.props;
		const { tempSearchKey } = this.state;
		const { SEARCH, LEARN } = routes;
		const enterPressed = (event.which === 13);
		if (enterPressed) {
			event.target.blur();
			if (tempSearchKey) {
				setSearchKey(tempSearchKey)
				if (pathName === SEARCH) {
					this.handleSearch(tempSearchKey)
				} else if (pathName === LEARN) {
					this.handleDeckSearch(tempSearchKey)
				}
			} else if (pathName === LEARN) {
				updateURL(pathName)
			}
		}
	}

	handleDeckSearch = (key) => {
		const { pathName, updateURL } = this.props;
		updateURL(`${pathName}?decksearch=${key}`)
		this.updateSearchList(key);
	}

	getList = () => {
		const { pathName } = this.props;
		const { SEARCH, LEARN } = routes;
		if (pathName === SEARCH) {
			return 'searchList'
		} else if (pathName === LEARN) {
			return 'deckList'
		}
	}

	updateSearchList = (key) => {
		const list = this.getList()
		let searchList = JSON.parse(localStorage.getItem(list))
		if (searchList !== null) {
			searchList.unshift(key)
			if (searchList.length > 15) {
				searchList.pop()
			}
			let i = searchList.length
			while (i--) {
				if (searchList[i] === key && i !== 0) {
					searchList.splice(i, 1);
				}
			}
		} else {
			searchList = [key]
		}
		this.setState({
			searchList,
			initialSearchList: searchList,
		})
		localStorage.setItem(list, JSON.stringify(searchList))
	}

	handleNewDeck = (e) => {
		const { updateURL, setPrevRoute, pathName, userID } = this.props;
		const { NEW_DECK, LOGIN } = routes;
		if (!validateUser(userID)) {
			requestToLogin(()=>{
				setPrevRoute(pathName)
	        	updateURL(LOGIN)
			})
		} else {
			updateURL(`${NEW_DECK}#0`)
		}
		e.target.blur();
	}

	wordSelect = (word) => {
		const { setTempSearch, pathName } = this.props;
		const { SEARCH, LEARN, NEW_DECK } = routes;
		setTempSearch(word)
		
		if (pathName === SEARCH) {
			this.handleSearch(word)
		} else if (pathName === LEARN) {
			this.handleDeckSearch(word)
		} else if (pathName === NEW_DECK) {
			setSearchKey(word)
		}
	}
	
	render() {
		const { 
			pathName,
			searchType,
			setSearchType,
			hideSearch
		 } = this.props;
		 const { searchList, tempSearchKey } = this.state;
		 const { FAVORITES, RECENT, LEARN, SEARCH, NEW_DECK, EDIT_DECK } = routes;
		 const searchOptions = ['All', 'Can', 'Eng', 'Man', 'Jyu'];
		 const showSearch = pathName === SEARCH || pathName === NEW_DECK || pathName === EDIT_DECK;
		 const isLearn = pathName === LEARN || pathName === NEW_DECK || pathName === EDIT_DECK;
		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<div className='search-bar-container'>
						<div className='search-bar'>
							{!isLearn &&
								<div className='filter-container'>
									<Button 
										title={matches ? null : 'Recent'}
										buttonType='ghost' 
										icon='time' 
										height={matches ? '44px' : '34px'}
										iconSize={matches ? '22' : null}
										margin='10px 5px 10px 10px'
										isSelected={pathName === RECENT
														? true
														: false}
										handleClick={e=>this.handleSearchRoute(e, RECENT)}
									/>
									<Button 
										title={matches ? null : 'Favorites'}
										buttonType='ghost' 
										icon='like-2' 
										height={matches ? '44px' : '34px'}
										iconSize={matches ? '22' : null}
										margin='10px 5px'
										isSelected={pathName === FAVORITES
														? true
														: false}
										handleClick={e=>this.handleSearchRoute(e, FAVORITES)}
									/>
								</div>
							}
							{pathName === LEARN &&
								<div className='filter-container'>
									<Button 
										title={matches ? null : 'New Deck'}
										buttonType='ghost' 
										icon='add' 
										height={matches ? '44px' : '34px'}
										iconSize={matches ? '22' : null}
										margin='10px 5px 10px 10px'
										handleClick={this.handleNewDeck}
									/>
								</div>
							}
							<div className='search-container'>
								{showSearch && !hideSearch &&
									 <Controller>
										<Trigger>
											<div className='center-div'>
												<TextInput  
													button={searchType}
													buttonList={searchOptions}
													handleDropDown={type=>setSearchType(type)}
													placeholder='English/Cantonese/Mandarin/Jyutping'
													margin='10px 0'
													value={tempSearchKey ? tempSearchKey : ''}
													height={matches ? '44px' : '34px'} 
													padding='2px 5px 2px 2px'
													handleChange={this.searchChange}
													onKeyPress={this.searchSubmit}
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
								{pathName === LEARN && !hideSearch &&
									<Controller>
										<Trigger>
											<div className='center-div'>
												<TextInput 
													icon='search'
													placeholder='Search for other decks'
													margin='10px 0'
													value={tempSearchKey ? tempSearchKey : ''}
													height={matches ? '44px' : '34px'}
													handleChange={this.searchChange}
													onKeyPress={this.searchSubmit}
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
						</div>
					</div>
				)}}
			</MediaQuery>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);