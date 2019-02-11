import React, {Component} from 'react';
import './PopOver.css';

class PopOver extends Component {
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
		const { 
		togglePopOver,
		animateOut,
		triggerRect,
		triggerRect: {
			x,
			y,
		},
		children } = this.props;

		let popType = 'animate-pop-in'

		if (animateOut === true) {
			popType = 'animate-pop-out';
		}

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { togglePopOver: togglePopOver})      
	    });

		return (
			<div 
				className={`pop-over ${popType}`} 
				style={{width: `${width}px`, height: `${height}px`, top: `${y + triggerRect.height + 20}px`, left: `${x + triggerRect.width - width}px`}}
			>
				<div className='pop-over-arrow'/>
				<div ref={this.content}>
					{childrenWithProps}
				</div>
			</div>
		);
	}
	
}

export default PopOver;