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
			entry: 0,
		}
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.setState({
			entries: entriesHolder,
		})
	}

	handleSearch = (event) => {
		console.log(event.target.value)
		this.setState({
			searchField: event.target.value
		})
	}

	render() {
		const { entries, searchField, entry } = this.state;
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
						/>
					</div>
					<div className='entry-view-container'>
						<EntryView 
							entry={entry}
						/>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Search;