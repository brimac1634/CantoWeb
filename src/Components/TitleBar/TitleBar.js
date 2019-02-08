import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TitleBar.css';
import LogoFull from '../LogoFull/LogoFull';
import Icon from '../Icon/Icon';

class TitleBar extends Component {
	constructor(props) {
		super(props);
		this.settings = React.createRef();
		this.profile = React.createRef();
	}

	
	
	setupPopOver = (popOverType) => {
		const { togglePopOver } = this.props;
		const rect = ReactDOM.findDOMNode(this.refs['settings']).getBoundingClientRect();
		const point = {x: rect.x, y: rect.y + rect.height}
		togglePopOver(popOverType, point, rect.width)
	}

	render() {
		const { current, signInToggle } = this.props;
		return (
			<div className='title-bar'>
				<div className='slanted-div logo-div'></div>
				<div className='title-logo-container'>
					<LogoFull className='title-logo'/>
				</div>
				<div className='slanted-div current-div'></div>
				<div className='current-container'>
					<h3 className='current'>{current}</h3>
				</div>
				<div className='button-container'>
					<button className='button' ref='profile' onClick={signInToggle}>
						<Icon icon='user-3' className='icon' width={22}/>
					</button>
					<button className='button' ref='settings' onClick={() => this.setupPopOver('settings')}>
						<Icon icon='settings-6' className='icon' width={22}/>
					</button>
				</div>
			</div>
		);
	}
	
}

export default TitleBar;