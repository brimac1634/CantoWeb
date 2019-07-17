import React, { Component } from 'react';
import './LearnGame.css';
import { connect } from 'react-redux';
import LinkedList from '../../Helpers/LinkedList';
import Button from '../../Components/Button/Button';
import Icon from '../../Components/Icon/Icon';
import { push } from 'connected-react-router';
import { setLoading } from '../../Loading/actions';
import { routes } from '../../Routing/constants';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
  	search: state.router.location.search,
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
			gameList: {},
			answerComplete: false,
			answer: '',
			correctOption: '',
			wrongOption: ''
		}
	}

	componentDidMount() {
		const { search, deckEntries, updateURL } = this.props;
		if (deckEntries.length === 0) {
			const { DECK } = routes;
			updateURL(`${DECK}${search}`)
		} else {
			//make linked list 
			const gameList = this.createGameList(deckEntries);
			this.setState({
				gameList,
				listLength: gameList.length
			});
		} 
	}

	createGameList = (entries) => {
		const { setLoading } = this.props;
		setLoading(true);
		let gameList = new LinkedList();
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
			gameList.addToHead(node);
		})
		console.log(gameList)
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

	checkAnswer = (answer) => {
		const { gameList, answerComplete } = this.state;
		if (!answerComplete) {
			const correctAnswer = gameList.head.value.answer;
			this.setState({
				answer,
				answerComplete: true
			})
			if (correctAnswer === answer) {
				// correct
				this.setState({
					correctOption: answer
				})
			} else {
				// wrong
				this.setState({
					correctOption: correctAnswer,
					wrongOption: answer,
				})
			}
		}
	}

	next = () => {
		const { gameList } = this.state;
		gameList.removeFromHead();
		this.setState({
			gameList,
			answerComplete: false,
			correctOption: '',
			wrongOption: '',
		})
		

	}

	render() {
		const { gameList, gameList: { head }, answerComplete, correctOption, wrongOption, answer, listLength } = this.state;
		return (
			<div className='page over-flow-y center-x'>
				{head &&
					<div className='game-container'>
						<div className='question-container centered'>
							<div className='question-card centered'>
								<h1>{head.value.question || ''}</h1>
							</div>
						</div>
						<div className='option-container'>
							{head.value.options.map(option => {
								const correctChoice = (option === correctOption && option === answer);

								const color = option === correctOption 
									? 'var(--cantoPink)'
									: 'var(--cantoGray)'
								const disable = answerComplete ? null : 'default-border'
								const style = {
									background: answerComplete 
										? color 
										: null 
								}
								return (
									<div 
										key={option}
										style={style}
										className={`option-box centered ${disable}`}
										onClick={()=>this.checkAnswer(option)}
									>
										<p>{option}</p>
										{correctChoice &&
											<div 
												style={{background: 'var(--cantoBlue'}}
												className='icon-stamp centered'
											>
												<Icon 
													icon='like'
													color='cantoWhite' 
													iconSize='18'
												/>
											</div>
										}
										{option === wrongOption &&
											<div 
												style={{background: 'var(--cantoPink'}}
												className='icon-stamp centered'
											>
												<Icon 
													icon='dislike'
													color='cantoWhite' 
													iconSize='18'
												/>
											</div>
										}
									</div>
								)
							})}
						</div>
						<div className='bottom-btns'>
							<p className='button-label'>
								{`${listLength - gameList.length} / ${listLength}`}
							</p>
							<Button 
								title={answerComplete ? 'Next' : 'Skip'}
								buttonType='ghost'
								color='var(--cantoWhite)'
								margin='10px'
								height='44px'
								width='100px'
								handleClick={()=>this.next()}
							/>
						</div>
					</div>
				}	
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnGame);