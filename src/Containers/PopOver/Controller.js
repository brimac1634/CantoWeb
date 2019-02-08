import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopOver: false,
			style: '',
			animateOut: false,
			triggerRect: '',
		}
	}

	setPositition = (rect) => {
		this.setState({ triggerRect: rect})
		console.log(rect);
	}

	togglePopOver = () => {
		this.setState({
			showPopOver: !this.state.showPopOver,
		})
	}

	render() {
		const { children } = this.props;
		const { showPopOver, style } = this.state;

		const childrenWithProps = React.Children.map(children, child => {
		      if (child.type.name === 'Trigger') {
		      	 return React.cloneElement(child, { togglePopOver: this.togglePopOver, setPositition: this.setPositition })
		      } else {
		      	if (showPopOver) {
		      		return ReactDOM.createPortal(
			            <span>
				            {React.cloneElement(child, { togglePopOver: this.togglePopOver, showPopOver: showPopOver })}
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