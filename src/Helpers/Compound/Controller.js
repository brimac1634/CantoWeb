import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			animateOut: false,
			triggerRect: {
				x: '',
				y: '',
				width: '',
				height: ''
			},
		}
	}

	componentDidUpdate(){
		setTimeout(() => {
		  if(this.state.show){
		    window.addEventListener('click', this.animateOut)
		    window.addEventListener('keydown', this.handleEntryKey)
		  } else {
		    window.removeEventListener('click', this.animateOut)
		    window.removeEventListener('keydown', this.handleEntryKey)
		  }
		}, 0)
	}

	handleEntryKey = (event) => {
		if (event.which === 13) {
    		this.animateOut()
    	}
	}

	closeOnClick = () => {
		const clickEvent = new MouseEvent("click", {
		    "view": window,
		    "bubbles": true,
		    "cancelable": false
		});
		window.dispatchEvent(clickEvent)
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

	animateOut = () => {
		this.setState({
			animateOut: true,
		})
		setTimeout(() => {
			this.setState({
			show: false,
			animateOut: false,
		})
		}, 800)
	}

	toggle = () => {
		const { show } = this.state;
		if (show) {
			this.animateOut()
		} else {
			this.setState({
				show: !this.state.show,
				animateOut: false,
			})
		}
	}

	render() {
		const { children } = this.props;
		const { show, triggerRect, animateOut } = this.state;

		const childrenWithProps = React.Children.map(children, child => {
		      if (child.type.name === 'Trigger') {
		      	 return React.cloneElement(child, { toggle: this.toggle, setPositition: this.setPositition })
		      } else {
		      	if (show) {
		      		return ReactDOM.createPortal(
			            <span onClick={event => event.stopPropagation()}>
				            {React.cloneElement(child, { toggle: this.toggle, show: show, triggerRect: triggerRect, animateOut: animateOut, closeOnClick: this.closeOnClick })}
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