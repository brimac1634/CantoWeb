import React, {Component} from 'react';
import '../compound/compound.styles.css';
import MediaQuery from 'react-responsive';

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
		toggle,
		animateOut,
		triggerRect: {
			x,
			y,
		},
		children
		} = this.props;

		let popType = 'animate-in'

		if (animateOut === true) {
			popType = 'animate-out';
		}

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { togglePopOver: toggle })      
	    });

	    const renderPopOver = () => {
	    	return (
	    		<div 
					className={`pop-over ${popType}`} 
					style={{width: `${width}px`, height: `${height}px`, top: `${y}px`, left: `${x - width - 8}px`}}
				>
					<div ref={this.content}>
						{childrenWithProps}
					</div>
				</div>
	    	);
	    }

		return (
			<div>
				<MediaQuery minWidth={700}>
					{renderPopOver()}
				</MediaQuery>
				<MediaQuery maxWidth={699}>
					<div
			            className='back-overlay'
			            onClick={toggle}
			        >
						{renderPopOver()}
					</div>
				</MediaQuery>
			</div>
		);
	}
	
}

export default PopOver;