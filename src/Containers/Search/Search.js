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
			entries: [],
		}
	}

	handleSearch = (event) => {
		if (event.target.value.length) {
			fetch('http://localhost:3000', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					searchKey: event.target.value
				})
			})
				.then(res => res.json())
				.then(entries => {
					console.log(entries)
					if (entries.length) {
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
		this.setState({
			selectedEntry: entry
		})
	}

	render() {
		const { selectedEntry, entries } = this.state;
		const { userID } = this.props;
		return (
			<div>
				<SearchBar 
					className='search-bar' 
					searchChange={this.handleSearch}
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