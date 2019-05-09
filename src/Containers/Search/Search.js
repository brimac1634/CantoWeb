import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import { serverError, connectionError, requestToLogin } from '../../Helpers/helpers';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import { setMobileEntry, setSearchKey } from './actions';
import { setTempSearch } from '../../Components/SearchBar/actions';
import { setPrevRoute } from '../../Routing/actions';
import apiRequest from '../../Helpers/apiRequest';
import { routes } from '../../Routing/constants';

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    mobileSelectedEntry: state.search.mobileEntry,
    searchKey: state.search.searchKey,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
    search: state.router.location.search,
    tempSearchKey: state.temp.key,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		setSearchKey: (searchKey) => dispatch(setSearchKey(searchKey)),
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setTempSearch: (key) => dispatch(setTempSearch(key)),
	}
} 

class Search extends Component {
	constructor(props) {
		super()
		this.state = {
			selectedEntry: '',
			entries: [],
			previousEntries: [],
			previousSelectedEntry: '',
			tempSearchKey: '',
		}
	}

	componentDidMount() {
		let { pathName, updateURL, user: { userID } } = this.props;
		const { SEARCH, RECENT, FAVORITES, LOGIN } = routes;

		if (!userID) {
			const cachedUser = localStorage.getItem('user')
			if (cachedUser) {
				userID = cachedUser.userID;
			}
		}

		if (pathName === SEARCH) {
			this.loadSearchOnMount()
		} else if (pathName === RECENT || pathName === FAVORITES) {
			if (userID != null) {
				this.filterEntries(userID, pathName)
			} else {
				requestToLogin(()=>{
					setPrevRoute(pathName)
		        	updateURL(LOGIN)
				})
			}
		}
	}

	componentDidUpdate(prevProps) {
		const {user: {userID}, searchKey, search, pathName} = this.props;
		const { RECENT, FAVORITES, SEARCH } = routes;

		if (prevProps.searchKey !== searchKey || prevProps.search !== search) {
			this.handleSearch(searchKey);
		}

		if (prevProps.pathName !== pathName && (pathName === FAVORITES || pathName === RECENT)) {
			this.filterEntries(userID, pathName)
		} else if (prevProps.pathName !== SEARCH && pathName === SEARCH) {
			console.log('here')
			this.loadSearchOnMount()
		}
	}

	componentWillUnmount() {
		this.clearMobileEntry();
	}

	loadSearchOnMount() {
		const { search, updateURL } = this.props;
		const { TRANSITION } = routes;
		if (search) {
			const values = queryString.parse(search)
			this.handleSearchKey(values.searchkey)
		} else {
			const cachedURL = JSON.parse(sessionStorage.getItem('searchURL'))
			if (cachedURL != null) {
				setTimeout(()=>{
					updateURL(cachedURL)
				}, TRANSITION)
			}
		}
	}

	handleSearchKey = (key) => {
		const { setSearchKey, setTempSearch } = this.props;
		setTempSearch(key)
		setSearchKey(key)
	}

	handleSearch = (searchKey) => {
		if (searchKey) {
			apiRequest({
				endPoint: '/search',
				method: 'POST',
				body: {searchKey} 
			})
			.then(entries => {
				if (Array.isArray(entries)) {
					this.setState({
						entries: entries
					})
				} else {
					this.setState({
						entries: []
					})
				}
			})
		} else {
			this.setState({
				entries: []
			})
		}
	}

	filterEntries = (userID, filterType) => {
		const { updateURL } = this.props;
		const { SEARCH } = routes;
		apiRequest({
			endPoint: filterType,
			method: 'POST',
			body: {userID} 
		})
		.then(entries => {
			if (entries.error != null) {
				serverError()
			} else {
				if (Array.isArray(entries)) {
					this.setState({entries})
				} else {
					this.setState({
						entries: []
					})
				}
			}
		})
		.catch(()=>{
			connectionError()
			updateURL(SEARCH)
		})
	}

	handleEntrySelect = (entry) => {
		const {
			setMobileEntry, 
			updateURL,
			user: {userID}
		} = this.props;

		const searchURL = this.setSearchURL({entryID: entry.entryID})
		updateURL(searchURL)

		setMobileEntry(entry.entryID);
		if (userID !== '' && userID != null) {
			this.addEntryToRecent(userID, entry.entryID);
		}
	}

	addEntryToRecent = (userID, entryID) => {
		apiRequest({
			endPoint: '/recent/add',
			method: 'POST',
			body: {userID, entryID} 
		})
		.catch(() => console.log('unable to save recent'))
	}

	clearMobileEntry = () => {
	    const {setMobileEntry} = this.props;
	    setMobileEntry('');
	};

	setSearchURL = ({path, word, entryID}) => {
		let { pathName, search, hash } = this.props;
		pathName = path ? path : pathName;
		search = word ? `?searchkey=${word}` : search
		hash = entryID ? `#${entryID}` : hash
		const url = `${pathName}${search}${hash}`

		sessionStorage.setItem('searchURL', JSON.stringify(url));
		return url
	};

	render() {
		const { entries } = this.state;
		const { mobileSelectedEntry, searchKey, tempSearchKey } = this.props;
		const entryViewMobile = mobileSelectedEntry 
			? 'visible-entry-view' 
			: 'hidden-entry-view'

		return (
			<div className='page'>
				<SearchBar 
					className='search-bar' 
					searchKey={tempSearchKey}
				/>
				<MediaQuery minWidth={700}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								searchKey={searchKey}
								selectEntry={this.handleEntrySelect}
							/>
						</div>
						<div className='divider'></div>
						<div className='entry-view-container'>
							<EntryView />
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								searchKey={searchKey}
								selectEntry={this.handleEntrySelect}
							/>
						</div>
						{mobileSelectedEntry
				              ? <div className='invisible-div' onClick={this.clearMobileEntry}>&nbsp;</div>
				              : null
				        }
						<div 
							className={`entry-view-container ${entryViewMobile}`}
						>
							<EntryView />
						</div>
					</div>
				</MediaQuery>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);