import React, {Component} from 'react';
import './EntryView.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { optionAlert } from '../../Containers/OptionAlert/OptionAlert';
import { validateUser, serverError } from '../../Helpers/helpers';
import Icon from '../Icon/Icon';
import { setPrevRoute } from '../../Routing/actions';
import { setLoading } from '../../Loading/actions';
import { setMobileEntry } from '../../Containers/Search/actions';
import { routes } from '../../Routing/constants';
import apiRequest from '../../Helpers/apiRequest';
import { setupPlayBack, audioRequest, audioNotFound, playBack } from '../../Helpers/audioRequest';
import { isIOS } from "react-device-detect";

const mapStateToProps = state => {
	return {
		userID: state.user.user.userID,
		pathName: state.router.location.pathname,
		hash: state.router.location.hash,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (path) => dispatch(push(path)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setLoading: (loading) => dispatch(setLoading(loading)),
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
	}
}

class EntryView extends Component {
	constructor(props) {
		super(props);
		this.playButton = React.createRef();
		this.state = {
			isFavorited: false,
			entry: '',
			playSound: {}
		}
	}

	componentDidMount() {
		const { hash } = this.props;
		if (hash) { 
			this.getEntry(hash)
		}
	}

	componentDidUpdate(prevProps) {
		const { selectedEntry, userID, hash, setMobileEntry, pathName } = this.props;
		const { entry: { entry_id }, entry } = this.state;
		const { WORD_OF_THE_DAY, FAVORITES } = routes;
		if (prevProps.selectedEntry !== selectedEntry) {
			this.setState({entry: selectedEntry})
			this.loadAudio(selectedEntry.entry_id)
			if (pathName === FAVORITES) {
				this.setState({isFavorited: true})
			} else if (selectedEntry !== '' && validateUser(userID)) {
				this.setState({isFavorited: false})
				this.checkIfFavorite(selectedEntry.entry_id, userID);
			}
		} else if (hash && hash !== prevProps.hash) {
			this.getEntry(hash)
		} else if (Object.entries(prevProps.selectedEntry).length === 0 && Object.entries(selectedEntry).length === 0 && hash && validateUser(userID)) {
			this.checkIfFavorite(entry_id, userID);
		} else if (pathName !== WORD_OF_THE_DAY && !hash && entry !== '') {
			this.setState({entry: ''})
			setMobileEntry('');
		} 
	}

	getEntry = (hash) => {
		const { userID, setLoading } = this.props;
		const entryID = hash.slice(1, hash.length)
		setLoading(true)
		apiRequest({
			endPoint: '/entryid',
			method: 'POST',
			body: {entryID} 
		})
		.then(entry => {
			setLoading(false)
			if (entry.error) {
				serverError()
			} else {
				this.setState({entry})
				this.loadAudio(entry.entry_id)
				if (
					entryID != null &&
					validateUser(userID)
				) {
					this.checkIfFavorite(entryID, userID);
				}
			}
		})
		.catch(() => {
			setLoading(false)
			serverError()
		})
	}

	checkIfFavorite = (entryID, userID) => {
		const { setLoading } = this.props;
		const { isFavorited } = this.state;
		setLoading(true)
		apiRequest({
			endPoint: '/favorites/isFavorited',
			method: 'POST',
			body: {entryID, userID} 
		})
		.then(favorited => {
			setLoading(false)
			if (favorited !== isFavorited) {
				this.setState({isFavorited: favorited})
			}
		})
		.catch(()=>setLoading(false))
	}

	toggleFavorite = (entryID, userID, cantoWord) => {
		const { 
			updateFavs,
			updateURL,
			pathName,
			setPrevRoute,
			setLoading,
		} = this.props;
		const { LOGIN, FAVORITES } = routes;
		if (validateUser(userID)) {
			setLoading(true)
			apiRequest({
				endPoint: '/favorites/toggle',
				method: 'POST',
				body: {entryID, userID, cantoWord} 
			})
			.then(favorited => {
				setLoading(false)
				if (favorited.error) {
					serverError()
				} else {
					this.setState({isFavorited: favorited})
					if (pathName === FAVORITES) {
						updateFavs(userID, FAVORITES)
						if (!favorited) {
							updateURL(pathName)
						}
					}
				}
			})
			.catch(() => {
				setLoading(false)
				serverError()
			})
		} else {
			optionAlert({
			    title: 'Please sign in.',
			    message: 'You must be signed in to save favorites. Would you like to sign in or register now?',
			    buttons: [
			      {
			        label: 'Yes',
			        onClick: () => {
			        	setPrevRoute(pathName)
			        	updateURL(LOGIN)
			        }
			      },
			      {
			        label: 'No',
			        onClick: null
			      }
			    ]
		    })
		}
	}

	loadAudio = (entryID) => {
		const { setLoading } = this.props;
		const { playSound } = this.state;
		if (isIOS) {
			setLoading(true)
			audioRequest(entryID)
				.then(({context, arrayBuffer}) => {
					context.decodeAudioData(arrayBuffer, decodedAudio => {
		                const playSound = setupPlayBack(context, decodedAudio)
		                this.setState({playSound})
		                console.log(playSound)
		                setLoading(false)
		            }, () => {
		            	audioNotFound()
		            	setLoading(false)
		            })
				})
				.catch(()=>{
					setLoading(false)
					serverError()
				})
			// this.playButton.current.addEventListener('touchstart', ()=>{
			// 	const { playSound } = this.state;
			// })
			this.something(playSound.context)
		}
	}

	something = (ctx) => {
		if (ctx.state === 'suspended') {
		    var resume = function () {
		    ctx.resume();

		    setTimeout(function () {
		        if (ctx.state === 'running') {
		          document.body.removeEventListener('touchend', resume,   false);
		        }
		    }, 0);
		};

		  document.body.addEventListener('touchend', resume, false);
		}
	}

	playAudio = (entryID) => {
		const { setLoading} = this.props;
		if (!isIOS) {
			setLoading(true)
			audioRequest(entryID)
				.then(() => setLoading(false))
				.catch(()=>{
					setLoading(false)
					serverError()
				})
		} else {

		}
	}

	render() {
		const { WORD_OF_THE_DAY } = routes;
		const { userID, pathName } = this.props;
		const {
			isFavorited,
			entry,
			entry: {
				entry_id,
				canto_word,
				classifier,
				jyutping,
				english_word,
				mandarin_word,
				canto_sentence,
				jyutping_sentence,
				english_sentence
			}
		} = this.state

		const clLabel = classifier ? 'cl: ' : '';
		const isWOD = (pathName === WORD_OF_THE_DAY)

		return (
			<div className={`entry-view ${isWOD ? 'wod-view' : 'non-wod-view'}`}>
				{entry !== ''
					?   <div>
							{isWOD &&
								<div className='center-div'>
									<h2 className='wod-date'>{new Date(entry.date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
									</h2>
								</div>
							}
							<div className='inner-entry-view'>
							
								<div className='entry-btn-container'>
									<button 
										className='entry-btn' 
										onClick={() => this.toggleFavorite(entry_id, userID, canto_word)}
									>
										{isFavorited
											?	<Icon 
													icon='like-2-full' 
													iconSize='35'
													color='cantoPink'
												/>
											:   <Icon 
													icon='like-2' 
													iconSize='35'
													color='cantoDarkBlue'
												/>
										}
									</button>
									<button 
										className='entry-btn'
										onClick={() => this.playAudio(entry_id)}
										ref={this.playButton}
									>
										<Icon 
											icon='speaker-5' 
											iconSize='35' 
											iconStyle='dark'
										/>
									</button>
								</div>
								<div className='top-group entry-section'>
									<div className='canto-class'>
										<h3>{canto_word}</h3>
										<p>{clLabel}{classifier}</p>
									</div>
									<div><p>{jyutping}</p></div>
								</div>
								<div className='entry-section'>
									<div><p>En: {english_word}</p></div>
									<div><p>普: {mandarin_word}</p></div>
								</div>
								<div className='entry-section'>
									<div><p>{canto_sentence}</p></div>
									<div><p>{jyutping_sentence}</p></div>
									<div><p>{english_sentence}</p></div>
								</div>
							</div>
						</div>
					:   <div className='inner-entry-view'>
							<div className='entry-btn-container'>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div className='top-group entry-section'>
								<div className='canto-class'>
									<div className='ghost-div'>&nbsp;</div>
									<div className='ghost-div'>&nbsp;</div>
								</div>
								<div>
									<div className='ghost-div'>&nbsp;</div>
								</div>
							</div>
							<div className='entry-section'>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
							<div className='entry-section'>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
								<div className='ghost-div'>&nbsp;</div>
							</div>
						</div>}

			</div>
			
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryView);