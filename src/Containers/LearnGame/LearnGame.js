import React, { Component } from 'react';
import './LearnGame.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { setLoading } from '../../Loading/actions';
import { routes } from '../../Routing/constants';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
  	hash: state.router.location.hash,
  	deck: state.deck.deck,
    deckEntries: state.deck.deckEntries,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class LearnGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		const { hash, deckEntries, updateURL } = this.props;
		if (deckEntries.length === 0) {
			const { DECK } = routes;
			updateURL(`${DECK}?deck=${hash.slice(1, hash.length)}`)
		} else {
			//make linked list 
			this.createGameList(deckEntries)
		} 
	}

	createGameList = (entries) => {
		const { setLoading } = this.props;
		setLoading(true);
		let gameList = [];
		entries.forEach((entry, i) => {
			const { canto_word, jyutping, english_word } = entry;
			const options = [canto_word, jyutping, english_word];
			const randomQ = this.getRandomNumber(options.length, []);
			const randomA = this.getRandomNumber(options.length, [randomQ])
			let node = {
				id: i,
				question: options[randomQ],
				answer: options[randomA],
				options: [options[randomA]]
			}

			let answers = 3;
			let excludes = [node.id];
			while (answers--) {
				const random = this.getRandomNumber(entries.length, excludes)
				excludes.push(random)
				const nextEntry = entries[random];
				const nextOption = [nextEntry.canto_word, nextEntry.jyutping, nextEntry.english_word];
				node.options.push(nextOption[randomA]);
			}
			gameList.push(node);
		})
		setLoading(false);
		return gameList
	}

	getRandomNumber = (max, exclude) => {
		let random = Math.floor(Math.random() * Math.floor(max));
		if (exclude) {
			if (exclude.includes(random)){
		  		return this.getRandomNumber(max, exclude);
		  	} else {
		  		return random;
		  	}
		} else { return }
	}

	render() {
		return (
			<div className='page'>
				hi
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnGame);