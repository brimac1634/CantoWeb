import React, {Component} from 'react';
import './word-of-day.styles.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import apiRequest from '../../helpers/apiRequest';
import { yyyymmdd } from '../../helpers/helpers';
import EntryView from '../../components/entry-view/entry-view.component';
import SlideUpEntry from '../../components/slide-up-entry/slide-up-entry.component';
import Calendar from '../../components/calendar/calendar.component';
import { setMobileEntry } from '../../redux/search/search.actions';
import { setLoading } from '../../redux/loading/loading.actions';
import { connectionError } from '../../helpers/helpers';

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
		this._isMounted = false;
		this.state = {
			wods: [],
			selectedEntry: {}
		}
	}

	componentDidMount() {
		this._isMounted = true;
		this.getWordsOfDay()
	}

	componentWillUnmount() {
		this._isMounted = false;
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
				this._isMounted && this.setState({
					wods,
					selectedEntry: entries[0]
				})
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