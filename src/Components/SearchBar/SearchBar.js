import React, { Component } from 'react';
import './SearchBar.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { validateUser, setQueryURL, requestToLogin } from '../../Helpers/helpers';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { setPrevRoute } from '../../Routing/actions';
import { setTempSearch, setSearchType } from './actions';
import { routes } from '../../Routing/constants';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import DropDown from '../../Containers/DropDown/DropDown';

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
		const { search, setSearchType } = this.props;
		const searchList = JSON.parse(localStorage.getItem('searchList'))
		this.setState({
			initialSearchList: searchList,
			searchList
		})

		if (search) {
			const values = queryString.parse(search)
			setSearchType(values.searchtype)
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
		const { hash } = this.props;
		const { tempSearchKey } = this.state;
		const enterPressed = (event.which === 13);
		if (enterPressed && tempSearchKey) {
			event.target.blur();
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
			searchType,
			setSearchType
		 } = this.props;
		 const { searchList, tempSearchKey } = this.state;
		 const { FAVORITES, RECENT } = routes;
		 const searchOptions = ['All', 'Can', 'Eng', 'Man', 'Jyu'];
		 console.log(searchType)
		return (
			<MediaQuery maxWidth={574}>
				{(matches) => {
				return (
					<div className='search-bar-container'>
						<div className='search-bar'>
							<div className='filter-container'>
								<Button 
									title={matches ? null : 'Recent'}
									buttonType='ghost' 
									icon='time' 
									height={matches ? '44px' : '34px'}
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
									margin='10px 5px'
									isSelected={pathName === FAVORITES
													? true
													: false}
									handleClick={e=>this.handleSearchRoute(e, FAVORITES)}
								/>
							</div>
							<div className='search-container'>
								{pathName === RECENT || pathName === FAVORITES
									?	null
									:   <Controller>
											<Trigger>
												<div className='center-div'>
													<TextInput  
														button={searchType}
														buttonList={searchOptions}
														handleDropDown={type=>setSearchType(type)}
														placeHolder='English/Cantonese/Mandarin/Jyutping'
														margin='10px 0'
														value={tempSearchKey ? tempSearchKey : ''}
														height={matches ? '44px' : '34px'} 
														padding='5px'
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
						</div>
					</div>
				)}}
			</MediaQuery>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);