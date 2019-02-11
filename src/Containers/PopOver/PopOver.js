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

		let popType = 'animate-in'

		if (animateOut === true) {
			popType = 'animate-out';
		}

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { togglePopOver: togglePopOver})      
	    });

		return (
			<div 
				className={`pop-over ${popType}`} 
				style={{width: `${width}px`, height: `${height}px`, top: `${y + triggerRect.height + 15}px`, left: `${x + (triggerRect.width / 2) - width}px`}}
			>
				<div ref={this.content}>
					{childrenWithProps}
				</div>
			</div>
		);
	}
	
}

export default PopOver;