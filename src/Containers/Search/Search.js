import React, { Component } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';

class Search extends Component {
	constructor() {
		super()
		this.state = {
			entries: [],
			searchField: '',
		}
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch = (event) => {
		console.log(event.target.value)
		this.setState({
			searchField: event.target.value
		})
	}

	render() {
		return (
			<div className='search'>
				<SearchBar searchChange={this.handleSearch}/>
				<div className='split-container'>
					<EntriesList />
					<EntryView />
				</div>
			</div>
		);
	}
	
}

export default Search;