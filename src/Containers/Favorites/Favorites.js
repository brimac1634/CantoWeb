import React, { Component } from 'react';
import '../Search/Search.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EntriesList from '../../Components/EntriesList/EntriesList';
import EntryView from '../../Components/EntryView/EntryView';
import presentPopUp from '../FullScreenPop/presentPopUp';
import SignIn from '../SignIn/SignIn';
import { setMobileEntry } from '../Search/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user,
		mobileSelectedEntry: state.search.mobileEntry,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		triggerInvDiv: (entryID) => dispatch(setMobileEntry(entryID))
	}
}

class Favorites extends Component {
	constructor() {
		super()
		this.state = {
			selectedEntry: '',
			entries: [],
		}
	}

	componentDidMount() {
		const { user: { userID } } = this.props;
		if (userID) {
			this.updateFavoritesList(userID);
		} else {
			console.log('nobody signed in')

			//ask user to sign in
		}
	}

	componentWillUnmount() {
		this.clearMobileEntry();
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

	handleEntrySelect = (entry) => {
		const {triggerInvDiv} = this.props;
		this.setState({
			selectedEntry: entry
		})
		triggerInvDiv(entry.entryID);
	}

	clearMobileEntry = () => {
	    const {triggerInvDiv} = this.props;
	    triggerInvDiv('');
	};

	render() {
		const { selectedEntry, entries } = this.state;
		const { mobileSelectedEntry, user: {userID} } = this.props;

		const entryViewMobile = mobileSelectedEntry
			? 'visible-entry-view'
			: 'hidden-entry-view'

		const renderPopUp = () => {
			if (userID === '' || userID == null) {
				const PopUp = presentPopUp(SignIn)
				console.log(PopUp);
				return <PopUp />
			}
		}

		return (
			<div>
				<SearchBar 
					className='search-bar'
					hideInput='true'
				/>
				<MediaQuery minWidth={700}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchKey=''
								isFavoritePage='true'
							/>
						</div>
						<div className='divider'></div>
						<div className='entry-view-container'>
							<EntryView 
								entry={selectedEntry}
								updateEntries={this.updateFavoritesList}
								updateSelected={this.handleEntrySelect}
								isFavoritePage='true'
							/>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div className='split-container'>
						<div className='entry-list-container'>
							<EntriesList  
								entries={entries}
								searchKey=''
								selectEntry={this.handleEntrySelect}
								isFavoritePage='true'
							/>
						</div>
						{mobileSelectedEntry
				              ? <div className='invisible-div' onClick={this.clearMobileEntry}>&nbsp;</div>
				              : null
				        }
						<div 
							className={`entry-view-container ${entryViewMobile}`}
						>
							<EntryView 
								entry={selectedEntry}
								updateEntries={this.updateFavoritesList}
								updateSelected={this.handleEntrySelect}
								isFavoritePage='true'
							/>
						</div>
					</div>
				</MediaQuery>
				{renderPopUp()}
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);