import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import { serverError, connectionError, requestToLogin, validateUser } from '../../Helpers/helpers';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import SlideUpEntry from '../../Components/SlideUpEntry/SlideUpEntry';
import { setLoading } from '../../Loading/actions';
import { setMobileEntry } from './actions';
import { setTempSearch } from '../../Components/SearchBar/actions';
import { setPrevRoute } from '../../Routing/actions';
import apiRequest from '../../Helpers/apiRequest';
import { routes } from '../../Routing/constants';

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    mobileSelectedEntry: state.search.mobileEntry,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
    search: state.router.location.search,
    tempSearchKey: state.temp.key,
    searchType: state.temp.searchType
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setTempSearch: (key) => dispatch(setTempSearch(key)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class Search extends Component {
	constructor(props) {
		super()
		this._isMounted = false;
		this.state = {
			entries: [],
			selectedEntry: {},
			searchComplete: false
		}
	}

	componentDidMount() {
		this._isMounted = true;
		let { pathName, updateURL, user: { userID }, setPrevRoute } = this.props;
		const { SEARCH, RECENT, FAVORITES, LOGIN } = routes;

		if (pathName === SEARCH) {
			this.loadSearchOnMount()
		} else if (pathName === RECENT || pathName === FAVORITES) {
			if (validateUser(userID)) {
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
		const {user: {userID}, search, pathName, setTempSearch, updateURL, setPrevRoute } = this.props;
		const { RECENT, FAVORITES, SEARCH, LOGIN } = routes;
		
		if (prevProps.pathName !== pathName) {
			if (pathName === FAVORITES || pathName === RECENT) {
				if (validateUser(userID)) {
					this.filterEntries(userID, pathName)
				} else {
					requestToLogin(()=>{
						setPrevRoute(pathName)
			        	updateURL(LOGIN)
					})
				}
			} else if (pathName === SEARCH ) {
				this.loadSearchOnMount()
			}
		} else if (pathName === SEARCH && prevProps.search !== search) {
			if (search) {
				const values = queryString.parse(search)
				this.handleSearchKey(values.searchkey)
			} else {
				setTempSearch('')
				this.setState({entries: []})
			}
			
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		const {setMobileEntry} = this.props;
	    setMobileEntry('');
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
				}, TRANSITION + 400)
			}
		}
	}

	handleSearchKey = (key) => {
		const { setTempSearch } = this.props;
		setTempSearch(key)
		this.handleSearch(key)
	}

	handleSearch = (searchKey) => {
		const { setLoading, searchType } = this.props;
		this.setState({searchComplete: false})
		setLoading(true)
		if (searchKey) {
			apiRequest({
				endPoint: '/search',
				method: 'POST',
				body: {searchKey, searchType} 
			})
			.then(entries => {
				if (this._isMounted) {
					if (Array.isArray(entries)) {
						this.setState({
							entries: entries
						})
					} else {
						this.setState({
							entries: []
						})
					}
					this.setState({searchComplete: true})
				}
				setLoading(false)
			})
			.catch(()=>{
				setLoading(false)
				this._isMounted && this.setState({searchComplete: true})
				connectionError()
			})
		} else {
			this.setState({
				entries: []
			})
		}
	}

	filterEntries = (userID, filterType) => {
		console.log('yup')
		const { updateURL, setLoading } = this.props;
		const { SEARCH } = routes;
		setLoading(true)
		apiRequest({
			endPoint: filterType,
			method: 'POST',
			body: {userID} 
		})
		.then(entries => {
			setLoading(false)
			if (entries.error != null) {
				serverError()
			} else {
				if (Array.isArray(entries)) {
					this._isMounted && this.setState({entries})
				} else {
					this._isMounted && this.setState({entries: []})
				}
			}
		})
		.catch(()=>{
			setLoading(false)
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
		const { entry_id } = entry;
		this.setState({selectedEntry: entry})
		const searchURL = this.setSearchURL({entryID: entry_id})
		updateURL(searchURL)
		setMobileEntry(entry_id);
		if (userID !== '' && userID != null) {
			this.addEntryToRecent(userID, entry_id);
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

	setSearchURL = ({path, word, entryID}) => {
		let { pathName, search, hash } = this.props;
		const { SEARCH } = routes;
		pathName = path ? path : pathName;
		search = word ? `?searchkey=${word}` : search
		hash = entryID ? `#${entryID}` : hash
		const url = `${pathName}${search}${hash}`
		if (pathName === SEARCH) {
			sessionStorage.setItem('searchURL', JSON.stringify(url));
		}
		return url
	};

	render() {
		const { entries, selectedEntry, searchComplete } = this.state;
		const { mobileSelectedEntry } = this.props;

		
		return (
			<div className='page'>
				<MediaQuery minWidth={700}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchComplete={searchComplete}
							/>
						</div>
						<div className='entry-view-container'>
							<EntryView 
								selectedEntry={selectedEntry} 
								updateFavs={this.filterEntries}
							/>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchComplete={searchComplete}
							/>
						</div>
						<SlideUpEntry 
							isSelected={mobileSelectedEntry} 
							selectedEntry={selectedEntry}
							updateFavs={this.filterEntries}
						/> 
					</div>
				</MediaQuery>
				<SearchBar 
					className='search-bar'
				/>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);