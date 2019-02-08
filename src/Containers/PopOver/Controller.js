import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopOver: false,
			style: '',
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
		this.setState({
			showPopOver: !this.state.showPopOver,
		})
	}

	render() {
		const { children } = this.props;
		const { showPopOver, triggerRect } = this.state;

		const childrenWithProps = React.Children.map(children, child => {
		      if (child.type.name === 'Trigger') {
		      	 return React.cloneElement(child, { togglePopOver: this.togglePopOver, setPositition: this.setPositition })
		      } else {
		      	if (showPopOver) {
		      		return ReactDOM.createPortal(
			            <span>
				            {React.cloneElement(child, { togglePopOver: this.togglePopOver, showPopOver: showPopOver, triggerRect: triggerRect })}
				        </span>
				        , document.body
			        )
		      	}
		      }
	      
	    });

	    return (
	    	<div>
		    	{childrenWithProps}
	    	</div>
	    );
	}
}
export default Controller;