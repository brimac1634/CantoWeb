import React, {Component} from 'react';
import './PopOver.css';

class PopOver extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: '',
			height: '',
		}
	}

	setPopOverSize = (contentSize) => {
		//get size of popOver child
	}
	
	

	render() {
		const { width, height } = this.state;
		const { 
		togglePopOver,
		animateOut,
		x,
		y,
		triggerWidth,
		children } = this.props;

		let popType = 'animate-pop-in'

		if (animateOut === true) {
			popType = 'animate-pop-out';
		}

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { togglePopOver: togglePopOver })      
	    });

		return (
			<div 
				className={`pop-over ${popType}`} 
				style={{width: `${width}px`, height: `${height}px`, top: `${y}px`, left: `${x}px`}}
			>
				<div className='pop-over-arrow'/>
				{childrenWithProps}
			</div>
		);
	}
	
}

export default PopOver;