import React, { Component } from 'react';
import SearchView from '../SearchView/SearchView';
import {entriesHolder} from '../../Components/EntriesList/EntryPlaceholder';

class Search extends Component {
	constructor() {
		super()
		this.state = {
			entries: [],
		}
	}

	componentDidMount() {
		this.setState({
			entries: entriesHolder,
		})
	}

	render() {
		const { entries } = this.state;

		return (
			<SearchView entries={entries} />
		);
	}
	
}

export default Search;