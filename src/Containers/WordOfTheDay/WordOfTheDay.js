import React, {Component} from 'react';
import './WordOfTheDay.css';
import { connect } from 'react-redux';
import EntryView from '../../Components/EntryView/EntryView';
import SlideUpEntry from '../../Components/SlideUpEntry/SlideUpEntry';
import Calendar from '../Calendar/Calendar';
import MediaQuery from 'react-responsive';
import apiRequest from '../../Helpers/apiRequest';
import { yyyymmdd } from '../../Helpers/helpers';
import { setMobileEntry } from '../Search/actions';
import { setLoading } from '../../Loading/actions';
import { connectionError } from '../../Helpers/helpers';

const mapStateToProps = (state, ownProps) => {
  return {
    mobileSelectedEntry: state.search.mobileEntry,
    hash: state.router.location.hash,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class WordOfTheDay extends Component {
	constructor(props) {
		super()
		this.state = {
			wods: [],
			selectedEntry: {}
		}
	}

	componentDidMount() {
		this.getWordsOfDay()
	}

	componentWillUnmount() {
		const {setMobileEntry} = this.props;
	    setMobileEntry('');
	}

	getWordsOfDay() {
		const { setLoading } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/word-of-the-day'
		})
		.then(entries => {
			setLoading(false)
			if (Array.isArray(entries)) {
				let wods = {}
				entries.forEach(entry => {
					const date = yyyymmdd(entry.date)
					wods[date] = entry
				})
				this.setState({wods})
			}
		})
		.catch(()=>{
			setLoading(false)
			connectionError()
		})
	}

	handleSelect = (entry) => {
		const { setMobileEntry } = this.props;
		this.setState({selectedEntry: entry ? entry : ''})
		setMobileEntry(entry ? entry.entry_id : '');
	}

	render() {
		const { selectedEntry, wods } = this.state;
		const { mobileSelectedEntry } = this.props;

		return (
			<div className='page word-of-day'>
				<MediaQuery minWidth={700}>
					<div className='wod-split'>
						<div className='half-container'>
							<Calendar 
								wods={wods} 
								selectEntry={this.handleSelect}
							/>
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
							<Calendar 
								wods={wods} 
								selectEntry={this.handleSelect}
							/>
						</div>
						<SlideUpEntry 
							isSelected={mobileSelectedEntry} 
							selectedEntry={selectedEntry}
						/>
					</div>
				</MediaQuery>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WordOfTheDay);