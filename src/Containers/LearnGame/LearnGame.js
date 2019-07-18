import React, { Component } from 'react';
import './LearnGame.css';
import { connect } from 'react-redux';
import { optionAlert } from '../OptionAlert/OptionAlert';
import LinkedList from '../../Helpers/LinkedList';
import Button from '../../Components/Button/Button';
import Icon from '../../Components/Icon/Icon';
import apiRequest from '../../Helpers/apiRequest';
import { isEmptyObject } from '../../Helpers/helpers';
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
			wrongOption: '',
			listLength: 0,
			correctCount: 0,
			progress: []
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
		const generateQuestions = (cycles) => {
			while (cycles--) {
				entries.forEach((entry, i) => {
					const { entry_id, canto_word, jyutping, english_word } = entry;
					const options = [canto_word, jyutping, english_word];
					const randomQ = this.getRandomNumber(options.length, []);
					const randomA = this.getRandomNumber(options.length, [randomQ])
					let node = {
						id: i,
						entry_id,
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
					node.options = this.shuffle(node.options);
					gameList.addToHead(node);
				})
			}
		}
		generateQuestions(2);
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

	shuffle = (array) => {
	  	var currentIndex = array.length, temporaryValue, randomIndex;
	
	  	while (0 !== currentIndex) {
	  	  randomIndex = Math.floor(Math.random() * currentIndex);
	  	  currentIndex -= 1;
	
	  	  temporaryValue = array[currentIndex];
	  	  array[currentIndex] = array[randomIndex];
	  	  array[randomIndex] = temporaryValue;
	  	}
	  	return array;
	}

	checkAnswer = (answer) => {
		const { gameList, answerComplete, progress } = this.state;
		if (!answerComplete) {
			const correctAnswer = gameList.head.value.answer;
			this.setState({
				answer,
				answerComplete: true
			})
			if (correctAnswer === answer) {
				const { entry_id } = gameList.head.value;
				let i = progress.length;

				function addToProgress() {
					progress.push({
						entry_id,
						progress: 1
					})
				}
				if (i === 0) {
					addToProgress()
				} else {
					while (i--) {
						if (entry_id === progress[i].entry_id) {
							progress[i].progress += 1
							break;
						} else if (i === 0) {
							addToProgress()
						}
					}
				}
				
				this.setState({
					progress,
					correctCount: this.state.correctCount + 1,
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
		const { gameList, gameList: { head } } = this.state;
		if (head) {
			gameList.removeFromHead();
			this.setState({
				gameList,
				answerComplete: false,
				correctOption: '',
				wrongOption: '',
			})
		} else {
			const { updateURL, search, user, user: { userID } } = this.props;
			const { DECK } = routes;

			if (!isEmptyObject(user)) {
				const { progress } = this.state;
				setLoading(true)
				apiRequest({
					endPoint: '/update-progress',
					method: 'POST',
					body: {
						user_id: userID,
						entries: progress
					} 
				})
					.then(data => {
						setLoading(false)
						if (data && data.error != null) {
							const { title, message } = data.error;
							optionAlert({
							    title,
							    message
						    })
						} else {
							console.log('Progress Updated')
						}
						updateURL(`${DECK}${search}`)
					})
					.catch(err=>{
						console.log(err)
						setLoading(false)
					})
			} else {
				updateURL(`${DECK}${search}`)
			}
			
		}
	}

	render() {
		const { gameList, gameList: { head }, answerComplete, correctOption, wrongOption, answer, listLength, correctCount } = this.state;
		const { deck_name } = this.props.deck;
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
					</div>
				}
				{!head &&
					<div className='end-message'>
						<h1>{`${deck_name} Deck`}</h1>
						<h3>
							{`You got ${correctCount} correct out of ${listLength}.`}
						</h3>
					</div>
				}
				<div className='bottom-btns'>
					<h3 className='push-left'>
						{`${deck_name} Deck`}
					</h3>
					<p className='button-label'>
						{!head
							?	'Complete'
							: 	`${listLength - gameList.length + 1} / ${listLength}`
						}
					</p>
					<Button 
						title={answerComplete || !head ? 'Next' : 'Skip'}
						buttonType='ghost'
						color='var(--cantoWhite)'
						margin='10px'
						height='44px'
						width='100px'
						handleClick={()=>this.next()}
					/>
				</div>	
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnGame);