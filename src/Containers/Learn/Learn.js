import React, { Component } from 'react';
import './Learn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import apiRequest from '../../Helpers/apiRequest';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Deck from '../../Components/Deck/Deck';
import { setLoading } from '../../Loading/actions';
import { setPrevRoute } from '../../Routing/actions';
import { routes } from '../../Routing/constants';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
    search: state.router.location.search,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personalDecks: [],
			officialDecks: [],
			otherDecks: [],
			selectedDeck: {}
		}
	}

	componentDidMount() {
		this.getDecks()
	}

	componentDidUpdate(prevProps) {
		const { search } = this.props;
		if (prevProps.search !== search) {
			this.getDecks()
		}
	}

	getDecks = () => {
		const { search } = this.props;
		if (search) {
			const values = queryString.parse(search)
			this.handleDeckSearch(values.decksearch)
		} else {
			this.getGeneralDecks()
		}
	}

	getGeneralDecks = () => {
		const { setLoading, user: { userID } } = this.props;
		const endPoint = userID ? '/get-decks-id' : '/get-decks'
		const method = userID ? 'POST' : 'GET' 
		setLoading(true)
		apiRequest({
			endPoint,
			method,
			body: userID ? {userID} : null 
		})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					this.filterDecks(data)
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}

	handleDeckSearch = (key) => {
		const { setLoading, user: { userID } } = this.props;
		const body = userID ? { userID, key } : { key }
		const endPoint = userID ? '/search-decks-id' : '/search-decks'
		setLoading(true)
		apiRequest({
			endPoint,
			method: 'POST',
			body
		})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					this.filterDecks(data)
				}
			})
			.catch(()=>setLoading(false))
	}

	filterDecks = (list) => {
		const { user: { userID } } = this.props;
		const officialDecks = list.filter(deck => {
			return deck.user_id === 0;
		})

		let personalDecks;
		let otherDecks;
		if (userID) {
			personalDecks = list.filter(deck => {
				return deck.user_id === userID;
			})

			otherDecks = list.filter(deck => {
				return deck.user_id !== userID && deck.user_id !== 0;
			})
		} else {
			otherDecks = list.filter(deck => {
				return deck.user_id !== 0;
			})
		}
		
		this.setState({officialDecks, personalDecks, otherDecks})
	}

	handleDeck = (deck) => {
		const { updateURL } = this.props;
		const { DECK } = routes;
		updateURL(`${DECK}#${deck.deck_id}`)
		this.setState({selectedDeck: deck})
	}


	render() {
		const { officialDecks, personalDecks, otherDecks } = this.state;
		return (
			<div className='page'>
				<div>
					<div className='deck-container'>
						{personalDecks && personalDecks.length > 0 &&
							<div className='deck-section-container'>
								<h2 className='section-headers'>Your Decks</h2>
								<div className='deck-section'>
									{ 
										personalDecks.map((deck, i) => {
											return (
												<Deck 
													key={i} 
													deck={deck} 
													handleClick={this.handleDeck} 
												/>
											)
										})
									}
								</div>
							</div>
						}
						{officialDecks && officialDecks.length > 0 &&
							<div className='deck-section-container'>
								<h2 className='section-headers'>CantoTalk Decks</h2>
								<div className='deck-section'>
									{ 
										officialDecks.map((deck, i) => {
											return (
												<Deck 
													key={i} 
													deck={deck} 
													handleClick={this.handleDeck} 
												/>
											)
										})
									}
								</div>
							</div>
						}
						{otherDecks && otherDecks.length > 0 &&
							<div className='deck-section-container'>
								<h2 className='section-headers'>Public Decks</h2>
								<div className='deck-section'>
									{ 
										otherDecks.map((deck, i) => {
											return (
												<Deck 
													key={i} 
													deck={deck} 
													handleClick={this.handleDeck} 
												/>
											)
										})
									}
								</div>
							</div>
						}
					</div>
					<SearchBar />
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);