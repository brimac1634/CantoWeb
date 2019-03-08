import React, {Component} from 'react';
import './FullScreenPop.css';
import Icon from '../../Components/Icon/Icon';

class FullScreenPop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: '',
			height: '',
		}
		this.content = React.createRef();
	}

	componentDidMount() {
		if (this.content.current.firstChild) {
			const rect = this.content.current.getBoundingClientRect();
			this.setState({
				width: rect.width,
				height: rect.height,
			})
		}
	}
	
	render() {
		const { width, height } = this.state;
		const { togglePopUp, animateOut, children } = this.props;
		
		let popType = 'animate-in'
		let fadeType = 'animate-fade-in'

		if (animateOut === true) {
			popType = 'animate-out';
			fadeType = 'animate-fade-out'
		}

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { togglePopUp: togglePopUp})      
	    });

		return (
			<div className={`shaded-background ${fadeType}`}>
				<div 
					className={`pop-div ${popType}`} 
					style={{width: `${width}px`, height: `${height}px`}}
				>
					<button className='close' onClick={togglePopUp}>
						<Icon 
							icon='multiply' 
							iconStyle='dark' 
							width='15'
						/>
					</button>
					<div ref={this.content}>
						{childrenWithProps}
					</div>
				</div>
			</div>
		);
	}
	
}

export default FullScreenPop;