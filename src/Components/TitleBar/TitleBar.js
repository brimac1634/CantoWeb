import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TitleBar.css';
import LogoFull from '../LogoFull/LogoFull';
import Icon from '../Icon/Icon';
import Controller from '../../Containers/PopOver/Controller';
import Trigger from '../../Containers/PopOver/Trigger';
import PopOver from '../../Containers/PopOver/PopOver';
import Settings from '../Settings/Settings';

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
					<Controller>
						<Trigger>
							<button className='button' ref='settings'>
								<Icon icon='settings-6' className='icon' width={22}/>
							</button>
						</Trigger>
						<PopOver>
							<Settings />
						</PopOver>
					</Controller>
				</div>
			</div>
		);
	}
	
}

export default TitleBar;