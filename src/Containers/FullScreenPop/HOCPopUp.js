import React, {Component} from 'react';
import './FullScreenPop.css';
import ReactDOM from 'react-dom';
import Icon from '../../Components/Icon/Icon';

const presentPopUp = (WrappedComponent) => {
	class FullScreenPop extends Component {
		constructor(props) {
			super(props);
			this.state = {
				width: '',
				height: '',
				animateOut: false,
				popUpIsShowing: true,
			}
			this.content = React.createRef();
		}

		componentDidMount() {
			if (this.content.current.firstChild) {
				const rect = this.content.current.getBoundingClientRect();
				this.setState({
					width: rect.width,
					height: rect.height,
					popUpIsShowing: true,
				})
			}
		}

		handleAnimateOut = () => {
			this.setState({
					animateOut: true,
				})
			setTimeout(() => {
				this.setState({
					popUpIsShowing: false,
					animateOut: false,
				})
			}, 800)
		}

		// togglePopUp = () => {
		// 	const { popUpIsShowing } = this.props;
		// 	if (popUpIsShowing) {
		// 		this.handleAnimateOut()
		// 	} else {
		// 		presentPopUp(true);
		// 		this.setState({
		// 			animateOut: false,
		// 		})
		// 	}
		// }
		
		render() {
			const { width, height, animateOut, popUpIsShowing } = this.state;
			
			let popType = 'animate-in'
			let fadeType = 'animate-fade-in'

			if (animateOut === true) {
				popType = 'animate-out';
				fadeType = 'animate-fade-out'
			}

			console.log(popUpIsShowing);

			if (popUpIsShowing) {
				return(ReactDOM.createPortal(
							<div className={`shaded-background ${fadeType}`}>
								<div 
									className={`pop-div ${popType}`} 
									style={{width: `${width}px`, height: `${height}px`}}
								>
									<button className='close' onClick={this.handleAnimateOut}>
										<Icon 
											icon='multiply' 
											iconStyle='dark' 
											width='15'
										/>
									</button>
									<div ref={this.content}>
										<WrappedComponent 
											handleAnimateOut={this.handleAnimateOut}
											{...this.props}
										/>
									</div>
								</div>
							</div>
				        , document.body
			        ));
				} else {
					return null
				}
		}
		
	}
	return FullScreenPop;
}


export default presentPopUp;