import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import {setMobileEntry, setSearchKey} from './actions';
import apiRequest from '../../Helpers/apiRequest';

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    mobileSelectedEntry: state.search.mobileEntry,
    searchKey: state.search.searchKey,
    pathName: state.router.location.pathname,
    search: state.router.location.search,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		setSearchKey: (searchKey) => dispatch(setSearchKey(searchKey)),
		updateSearchURL: (searchKey) => dispatch(push(searchKey)),
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
		const { search, hash } = this.props;
		if (search || hash) {
			// console.log(hash)
			const values = queryString.parse(search)
			this.handleSearchKey(values.searchkey)
		} else {
			const lastSearch = sessionStorage.getItem('lastSearch')
			const lastSearchEntries = sessionStorage.getItem('lastSearchEntries')
			const lastSelectedEntry = sessionStorage.getItem('lastSelectedEntry')
			if (lastSearch && lastSearchEntries) {
				this.setState({
					entries: JSON.parse(lastSearchEntries),
				})
				this.handleSearchKey(JSON.parse(lastSearch))
			}
			if (lastSelectedEntry) {
				this.setState({selectedEntry: JSON.parse(lastSelectedEntry)})
			}
		}
	}

	componentDidUpdate(prevProps) {
		const {user: {userID}, searchKey, pathName} = this.props;
		const { 
			entries, 
			selectedEntry, 
			previousEntries, 
			previousSelectedEntry } = this.state;

		if (prevProps.searchKey !== searchKey) {
			this.handleSearch(searchKey);
		}

		if (prevProps.pathName !== pathName && pathName === '/search/recent') {
			this.setState({
				previousEntries: entries,
				previousSelectedEntry: selectedEntry,
				selectedEntry: '',
			})
			this.renderRecentEntries(userID)
		} else if (prevProps.pathName !== '/search' && pathName === '/search') {
			this.setState({
				entries: previousEntries,
				selectedEntry: previousSelectedEntry,
			})
		}
	}

	componentWillUnmount() {
		this.clearMobileEntry();
	}

	handleSearchKey = (key) => {
		const { setSearchKey } = this.props;
		this.setState({tempSearchKey: key})
		setSearchKey(key)
	}
	
	onSearch = (event) => {
		const tempSearchKey = event.target.value;
		this.setState({tempSearchKey})
	}

	onSubmit = (event) => {
		const { updateSearchURL } = this.props;
		const enterPressed = (event.which === 13);
		const {tempSearchKey} = this.state;
		const query = tempSearchKey 
			? `?searchkey=${tempSearchKey}` 
			: null
		if (enterPressed) {
			updateSearchURL(`/search${query}`)
			this.handleSearchKey(tempSearchKey);
		}
	}

	handleSearch = (searchKey) => {
		if (searchKey) {
			sessionStorage.setItem('lastSearch', JSON.stringify(searchKey));
			apiRequest({
				endPoint: '/search',
				method: 'POST',
				body: {searchKey} 
			})
			.then(entries => {
				if (Array.isArray(entries)) {
					sessionStorage.setItem('lastSearchEntries', JSON.stringify(entries));
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
			sessionStorage.setItem('lastSearch', JSON.stringify(''));
			sessionStorage.setItem('lastSearchEntries', JSON.stringify([]));
			this.setState({
				entries: []
			})
		}
	}

	renderRecentEntries = (userID) => {
		apiRequest({
			endPoint: '/recent',
			method: 'POST',
			body: {userID} 
		})
		.then(recentEntries => {
			if (Array.isArray(recentEntries)) {
				this.setState({
					entries: recentEntries,
				})
			} else {
				this.setState({
					entries: []
				})
			}
		})
	}

	handleEntrySelect = (entry) => {
		const {
			setMobileEntry, 
			updateSearchURL,
			pathName,
			search, 
			user: {userID}
		} = this.props;
		updateSearchURL(`${pathName}${search}#${entry.entryID}`)
		sessionStorage.setItem('lastSelectedEntry', JSON.stringify(entry));
		this.setState({
			selectedEntry: entry,
		})
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
		.then(console.log)
	}

	clearMobileEntry = () => {
	    const {setMobileEntry} = this.props;
	    setMobileEntry('');
	};

	render() {
		const { selectedEntry, entries, tempSearchKey } = this.state;
		const { mobileSelectedEntry, searchKey } = this.props;
		const entryViewMobile = mobileSelectedEntry 
			? 'visible-entry-view' 
			: 'hidden-entry-view'

		return (
			<div>
				<SearchBar 
					className='search-bar' 
					searchChange={this.onSearch}
					searchSubmit={this.onSubmit}
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
							<EntryView 
								entry={selectedEntry}
							/>
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
							<EntryView 
								entry={selectedEntry}
							/>
						</div>
					</div>
				</MediaQuery>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);