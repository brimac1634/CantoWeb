import React, {Component} from 'react';

class Trigger extends Component {
	constructor(props) {
		super(props);
		this.selectedElement = React.createRef()
	}

	getRectandToggle = () => {
		const { togglePopOver, setPositition } = this.props;
		const rect = this.selectedElement.current.getBoundingClientRect()
		setPositition(rect);
		togglePopOver()
	}

	render() {
		const { children } = this.props;
		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { onClick: this.getRectandToggle, ref: this.selectedElement })      
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
export default Trigger;