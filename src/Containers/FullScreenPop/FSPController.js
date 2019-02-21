import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class FSPController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popUpIsShowing: false,
			animateOut: false,
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

	togglePopUp = () => {
		const { popUpIsShowing } = this.state;
		if (popUpIsShowing) {
			this.handleAnimateOut()
		} else {
			this.setState({
				popUpIsShowing: true,
				animateOut: false,
			})
		}
	}

	render() {
		const { children } = this.props;
		const { popUpIsShowing, animateOut } = this.state;

		const childrenWithProps = React.Children.map(children, child => {
		      if (child.type.name === 'FSPTrigger') {
		      	 return React.cloneElement(child, { togglePopUp: this.togglePopUp })
		      } else {
		      	if (popUpIsShowing) {
		      		return ReactDOM.createPortal(
			            <span>
				            {React.cloneElement(child, { togglePopUp: this.togglePopUp, popUpIsShowing: popUpIsShowing, animateOut: animateOut })}
				        </span>
				        , document.body
			        )
		      	}
		      }
	      
	    });

	    return (
	    	<div 
	    		style={{width: '100%', height: '100%'}} 
	    		className='center-div'
	    	>
		    	{childrenWithProps}
	    	</div>
	    );
	}
}
export default FSPController;