import React, { Component } from 'react';
import './Search.css';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import {setMobileEntry} from './actions';

const mapStateToProps = state => {
  return {
    mobileSelectedEntry: state.invDiv.mobileEntry
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		triggerInvDiv: (entryID) => dispatch(setMobileEntry(entryID))
	}
}

class Search extends Component {
	constructor(props) {
		super()
		this.state = {
			selectedEntry: '',
			searchKey: '',
			entries: [],
		}
	}

	componentDidMount() {
		const lastSearch = sessionStorage.getItem('lastSearch')
		const lastSearchEntries = sessionStorage.getItem('lastSearchEntries')
		const lastSelectedEntry = sessionStorage.getItem('lastSelectedEntry')
		if (lastSearch && lastSearchEntries) {
			this.setState({
				searchKey: JSON.parse(lastSearch),
				entries: JSON.parse(lastSearchEntries),
			})
		}
		if (lastSelectedEntry) {
			this.setState({selectedEntry: JSON.parse(lastSelectedEntry)})
		}
	}

	componentWillUnmount() {
		this.clearMobileEntry();
	}
	
	onSearch = (event) => {
		const searchKey = event.target.value
		this.setState({searchKey: searchKey})
		this.handleSearch(searchKey)
	}

	handleSearch = (searchKey) => {
		if (searchKey.length) {
			sessionStorage.setItem('lastSearch', JSON.stringify(searchKey));
			fetch('http://localhost:3000', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					searchKey: searchKey
				})
			})
				.then(res => res.json())
				.then(entries => {
					if (entries.constructor === Array) {
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
				.catch(err => console.log('unable to retrieve entries'))
		} else {
			sessionStorage.setItem('lastSearch', JSON.stringify(''));
			sessionStorage.setItem('lastSearchEntries', JSON.stringify([]));
			this.setState({
				entries: []
			})
		}
	}

	handleEntrySelect = (entry) => {
		const {triggerInvDiv} = this.props;
		sessionStorage.setItem('lastSelectedEntry', JSON.stringify(entry));
		this.setState({
			selectedEntry: entry,
		})
		triggerInvDiv(entry.entryID);
	}

	clearMobileEntry = () => {
	    const {triggerInvDiv} = this.props;
	    triggerInvDiv('');
	};

	render() {
		const { selectedEntry, entries, searchKey } = this.state;
		const { userID, mobileSelectedEntry } = this.props;

		let entryViewMobile = 'hidden-entry-view'
		if (mobileSelectedEntry) {
			entryViewMobile = 'visible-entry-view'
		}

		return (
			<div>
				<SearchBar 
					className='search-bar' 
					searchChange={this.onSearch}
					searchKey={searchKey}
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
								userID={userID}
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
								userID={userID}
							/>
						</div>
					</div>
				</MediaQuery>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);