import React, { Component } from 'react';
import './Search.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';

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
		console.log(lastSearch, lastSearchEntries, lastSelectedEntry)
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
					if (entries.length) {
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
			this.setState({
				entries: []
			})
		}
	}

	handleEntrySelect = (entry) => {
		sessionStorage.setItem('lastSelectedEntry', JSON.stringify(entry));
		this.setState({
			selectedEntry: entry
		})
	}

	render() {
		const { selectedEntry, entries, searchKey } = this.state;
		const { userID } = this.props;
		return (
			<div>
				<SearchBar 
					className='search-bar' 
					searchChange={this.onSearch}
					searchKey={searchKey}
				/>
				<div className='split-container'>
					<div className='entry-list-container'>
						<EntriesList  
							entries={entries}
							selectEntry={this.handleEntrySelect}
						/>
					</div>
					<div className='entry-view-container'>
						<EntryView 
							entry={selectedEntry}
							userID={userID}
						/>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Search;