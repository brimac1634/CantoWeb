import React, {Component} from 'react';
import { connect } from 'react-redux';
import Icon from '../../Components/Icon/Icon';
import { setLoading } from '../../Loading/actions';
import { audioRequest, setupPlayBack } from '../../Helpers/audioRequest';
import { isIOS } from "react-device-detect";

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
}

class SpeakerButton extends Component {
	constructor(props) {
		super(props);
		this.playButton = React.createRef();
		this.state = {
			audioAvailable: false,
			context: {},
			decodedAudio: {}
		}
	}

	componentDidMount() {
		const { entryID } = this.props;
		this.loadAudio(entryID)
	}

	componentDidUpdate(prevProps) {
		const { entryID } = this.props;
		if (prevProps.entryID !== entryID) {
			this.loadAudio(entryID)
		}
	}

	loadAudio = (entryID) => {
		if (isIOS && this.playButton.current) {     
			this.playButton.current.removeEventListener('touchstart', this.unlockAudio, false)
		}

		if (this.playButton.current) {
			const { setLoading} = this.props;
			setLoading(true)
			audioRequest(entryID)
		        .then(({context, arrayBuffer}) => {
	        		context.decodeAudioData(arrayBuffer, decodedAudio => {
	    				this.setState({
			            	audioAvailable: true,
			            	context, 
			            	decodedAudio
			            })
			            if (isIOS) {
			             	this.playButton.current.addEventListener('touchstart', this.unlockAudio, false);
			            }
			            setLoading(false)
			        }, ()=>this.noAudio())
		        })
		        .catch(()=>this.noAudio())
		}
	}

	playAudio = () => {
		if (!isIOS) {
			this.unlockAudio()
		}
	}

	unlockAudio = () => {
		const { context, decodedAudio, audioAvailable } = this.state;
		if (audioAvailable) {
			const playSound = setupPlayBack(context, decodedAudio)
	        playSound.start(0);
		}
	}

	noAudio = () => {
		const { setLoading} = this.props;
		this.setState({audioAvailable: false})
		setLoading(false)
	}

	render() {
		const { size } = this.props;
		const { audioAvailable } = this.state

		const active = audioAvailable ? 'entry-btn-active' : 'entry-btn-disabled'

		return (
			<div>
				<button 
					className={`entry-btn ${active}`}
					onClick={this.playAudio}
					ref={this.playButton}
				>
					<Icon 
						icon='speaker-5' 
						iconSize={size || '35'} 
						color={audioAvailable
							? 'cantoDarkBlue'
							: 'cantoDarkGray'
						}
					/>
				</button>
			</div>
			
		);
	}
	
}

export default connect(null, mapDispatchToProps)(SpeakerButton);