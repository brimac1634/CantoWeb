import React, {Component} from 'react';
import './WordOfTheDay.css';
import EntryView from '../../Components/EntryView/EntryView';
import SearchBar from '../../Components/SearchBar/SearchBar';
import MediaQuery from 'react-responsive';

class WordOfTheDay extends Component {
	constructor(props) {
		super()
		this.state = {
			entries: [],
			selectedEntry: {}
		}
	}

	render() {
		const { selectedEntry } = this.state;
		return (
			<div className='page word-of-day'>
				<MediaQuery minWidth={700}>
					<div className='split-container'>
						<div className='half-container'>
							hey
						</div>
						<div className='half-container'>
							<EntryView 
								selectedEntry={selectedEntry} 
							/>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div className='split-container'>
						<div className='half-container'>
							<EntryView 
								selectedEntry={selectedEntry} 
							/>
						</div>
					</div>
					<SearchBar 
						className='search-bar'
					/>
				</MediaQuery>
			</div>
		);
	}
}

export default WordOfTheDay;