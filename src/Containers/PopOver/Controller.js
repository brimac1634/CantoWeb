import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopOver: false,
			animateOut: false,
			triggerRect: {
				x: '',
				y: '',
				width: '',
				height: ''
			},
		}
	}

	setPositition = (rect) => {
		this.setState({
			triggerRect: {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
			}
		})
	}

	togglePopOver = () => {
		const { showPopOver } = this.state;
		if (showPopOver) {
			this.setState({
				animateOut: true,
			})
			setTimeout(() => this.setPopOverState(), 800)
		} else {
			this.setPopOverState()
		}
	}

	setPopOverState = () => {
		this.setState({
			showPopOver: !this.state.showPopOver,
			animateOut: false,
		})
	}

	render() {
		const { children } = this.props;
		const { showPopOver, triggerRect, animateOut } = this.state;

		const childrenWithProps = React.Children.map(children, child => {
		      if (child.type.name === 'Trigger') {
		      	 return React.cloneElement(child, { togglePopOver: this.togglePopOver, setPositition: this.setPositition })
		      } else {
		      	if (showPopOver) {
		      		return ReactDOM.createPortal(
			            <span>
				            {React.cloneElement(child, { togglePopOver: this.togglePopOver, showPopOver: showPopOver, triggerRect: triggerRect, animateOut: animateOut })}
				        </span>
				        , document.body
			        )
		      	}
		      }
	      
	    });

	    return (
	    	<div style={{width: '100%', height: '100%'}}>
		    	{childrenWithProps}
	    	</div>
	    );
	}
}
export default Controller;