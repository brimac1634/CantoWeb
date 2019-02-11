import React, {Component} from 'react';

class Trigger extends Component {
	constructor(props) {
		super(props);
		this.selectedElement = React.createRef()
	}

	componentDidMount() {
		const { setPositition } = this.props;
		const rect = this.selectedElement.current.getBoundingClientRect()
		setPositition(rect);
	}

	render() {
		const { togglePopOver, children } = this.props;
		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { onClick: togglePopOver, ref: this.selectedElement })      
	    });

		return (
			<div style={{width: '100%', height: '100%'}}>{childrenWithProps}</div>
		);
	}
}
export default Trigger;