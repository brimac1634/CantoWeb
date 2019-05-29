import React, {Component} from 'react';
import './WordOfTheDay.css';
import { connect } from 'react-redux';
import EntryView from '../../Components/EntryView/EntryView';
import Calendar from '../Calendar/Calendar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import MediaQuery from 'react-responsive';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';
import { connectionError } from '../../Helpers/helpers';

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class WordOfTheDay extends Component {
	constructor(props) {
		super()
		this.state = {
			entries: [],
			selectedEntry: {}
		}
	}

	componentDidMount() {
		this.getWordsOfDay()
	}

	getWordsOfDay() {
		const { setLoading } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/word-of-the-day'
		})
		.then(entries => {
			setLoading(false)
			console.log(entries)
			if (Array.isArray(entries)) {
				this.setState({
					entries: entries
				})
			}
		})
		.catch(()=>{
			setLoading(false)
			connectionError()
		})
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

export default connect(null, mapDispatchToProps)(WordOfTheDay);