import React, { Component } from 'react';
import './NewDeck.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import MediaQuery from 'react-responsive';
import EntriesList from '../../Components/EntriesList/EntriesList';
import apiRequest from '../../Helpers/apiRequest';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { setLoading } from '../../Loading/actions';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
  	searchKey: state.temp.searchKey,
  	searchType: state.temp.searchType,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: [],
			showEntryList: false,
			searchComplete: false
		}
	}

	componentDidUpdate(prevProps) {
		const { searchKey } = this.props;
		if (prevProps.searchKey !== searchKey) {
			this.searchEntries(searchKey)
		}
	}

	searchEntries = (searchKey) => {
		const { setLoading, searchType } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: '/search',
			method: 'POST',
			body: {searchKey, searchType}
		})
			.then(data => {
				if (Array.isArray(data)) {
					this.setState({
						entries: data
					})
				} else {
					this.setState({
						entries: []
					})
				}
				this.setState({searchComplete: true})
				setLoading(false)
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}


	render() {
		const { entries, showEntryList, searchComplete } = this.state;
		
		return (
			<div className='page brian'>
				<MediaQuery minWidth={700}>
					<div className='new-split-container'>
						<div className='new-half'>

						</div>
						<div className='new-half'>
							<EntriesList 
								entries={entries}
								selectEntry={this.handleEntrySelect}
							/>
							<div className='search-top'>
								<SearchBar />
							</div>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					{!showEntryList &&
						<div className='mobile-new-deck'>
							<EntriesList 
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchComplete={searchComplete}
							/>
							<SearchBar />
						</div>
					}
					{showEntryList &&
						<div className='mobile-new-deck'>
							<EntriesList 
								entries={entries}
								selectEntry={this.handleEntrySelect}
								searchComplete={searchComplete}
							/>
							<SearchBar />
						</div>
					}
				</MediaQuery>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);