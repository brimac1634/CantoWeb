import React, { Component } from 'react';
import './Search.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import {entriesHolder} from '../../Components/EntriesList/EntryPlaceholder';

class Search extends Component {
	constructor() {
		super()
		this.state = {
			entries: [],
			searchField: '',
			selectedEntry: '',
		}
	}

	componentDidMount() {
		this.setState({
			entries: entriesHolder,
		})
	}

	handleSearch = (event) => {
		this.setState({
			searchField: event.target.value
		})
	}

	handleEntrySelect = (entry) => {
		this.setState({
			selectedEntry: entry
		})
	}

	render() {
		const { entries, searchField, selectedEntry } = this.state;
		const filteredEntries = entries.filter(entry => {
			return entry.englishWord.toLowerCase().includes(
				searchField.toLowerCase()
			);
		})

		return (
			<div>
				<SearchBar 
					className='search-bar' 
					searchChange={this.handleSearch}
				/>
				<div className='split-container'>
					<div className='entry-list-container'>
						<EntriesList  
							entries={filteredEntries}
							selectEntry={this.handleEntrySelect}
						/>
					</div>
					<div className='entry-view-container'>
						<EntryView 
							entry={selectedEntry}
						/>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Search;