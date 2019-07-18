import React, { Component } from 'react';
import './Learn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import MediaQuery from 'react-responsive';
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
		const { pathName, search } = this.props;
		const { LEARN } = routes;
		if (pathName === LEARN && prevProps.search !== search) {
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
				console.log(data)
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
		updateURL(`${DECK}?deck=${deck.deck_id}`)
		this.setState({selectedDeck: deck})
	}

	renderSection = (heading, deckList, color) => {
		return (
			<MediaQuery maxWidth={699}>
				{(matches) => {
					return 	(
						<div 
							className='deck-section-container'
							style={{background: color || null}}
						>
							{matches
								?	<h3 className='section-headers'>{heading}</h3>
								: 	<h2 className='section-headers'>{heading}</h2>
							}
							<div className='deck-section'>
								{ 
									deckList.map((deck, i) => {
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
					)
				}}
			</MediaQuery>
		)
	}


	render() {
		const { officialDecks, personalDecks, otherDecks } = this.state;
		return (
			<div className='page over-flow-y'>
				<div className='deck-container'>
					{personalDecks && personalDecks.length > 0 &&
						this.renderSection('Your Decks', personalDecks, 'var(--cantoGray)')
					}
					{officialDecks && officialDecks.length > 0 &&
						this.renderSection('CantoTalk Decks', officialDecks, 'var(--cantoPink)')
					}
					{otherDecks && otherDecks.length > 0 &&
						this.renderSection('Public Decks', otherDecks, 'var(--cantoDarkGray)')
					}
				</div>
				<div className='deck-search'>
					<SearchBar />
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);