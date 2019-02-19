import React, { Component } from 'react';
import '../Search/Search.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';

class Favorites extends Component {
	constructor() {
		super()
		this.state = {
			selectedEntry: '',
			entries: [],
			searchKey: '',
		}
	}

	componentDidMount() {
		const { userID } = this.props;
		if (userID) {
			this.updateFavoritesList(userID);
		} else {
			//ask user to sign in
		}
		
	}

	updateFavoritesList = (userID) => {
		fetch('http://localhost:3000/Favorites', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: userID
			})
		})
		.then(res => res.json())
		.then(favorites => {
			this.setState({entries: favorites})
		})
		.catch(err => console.log('unable to retrieve favorites'))
	}

	onSearch = (event) => {
		const searchKey = event.target.value
		this.setState({searchKey: searchKey})
		this.handleSearch(searchKey)
	}

	handleSearch = (searchKey) => {

	}

	handleEntrySelect = (entry) => {
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
					searchChange={this.handleSearch}
					searchKey={searchKey}
				/>
				<div className='split-container'>
					<div className='entry-list-container'>
						<EntriesList  
							entries={entries}
							selectEntry={this.handleEntrySelect}
							searchKey={searchKey}
						/>
					</div>
					<div className='entry-view-container'>
						<EntryView 
							entry={selectedEntry}
							userID={userID}
							updateEntries={this.updateFavoritesList}
							updateSelected={this.handleEntrySelect}
						/>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Favorites;