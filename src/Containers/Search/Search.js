import React, { Component } from 'react';
import './Search.css';
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
			<div>
				<SearchBar className='search-bar' searchChange={this.handleSearch}/>
				<div className='split-container'>
					<EntriesList className='entry-list'/>
					<EntryView className='entry-view'/>
				</div>
			</div>
		);
	}
	
}

export default Search;