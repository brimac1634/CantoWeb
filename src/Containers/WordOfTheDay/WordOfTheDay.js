import React, {Component} from 'react';
import './WordOfTheDay.css';
import EntryView from '../../Components/EntryView/EntryView';
import Calendar from '../Calendar/Calendar';
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

	handleSelect = (entry) => {
		this.setState({selectedEntry: entry})
	}

	render() {
		const { selectedEntry } = this.state;
		return (
			<div className='page word-of-day'>
				<MediaQuery minWidth={700}>
					<div className='wod-split'>
						<div className='half-container'>
							<Calendar selectEntry={this.handleSelect}/>
						</div>
						<div className='half-container'>
							<EntryView 
								selectedEntry={selectedEntry} 
							/>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div className='wod-split'>
						<div className='half-container'>
							<EntryView 
								selectedEntry={selectedEntry} 
							/>
						</div>
					</div>
					<SearchBar 
						className='wod-bar'
					/>
				</MediaQuery>
			</div>
		);
	}
}

export default WordOfTheDay;