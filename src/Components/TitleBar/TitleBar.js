import React from 'react';
import './TitleBar.css';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip'
import LogoFull from '../LogoFull/LogoFull';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import Controller from '../../Containers/PopOver/Controller';
import Trigger from '../../Containers/PopOver/Trigger';
import PopOver from '../../Containers/PopOver/PopOver';
import Settings from '../Settings/Settings';
import PopOverNav from '../../Containers/NavBar/PopOverNav/PopOverNav';
import {setMobileEntry} from '../../Containers/Search/actions';

const mapDispatchToProps = (dispatch) => {
	return {
		triggerInvDiv: (entryID) => dispatch(setMobileEntry(entryID))
	}
}

const TitleBar = ({ current, signInToggle, userEmail, updateUser, navChange, triggerInvDiv }) => {
	return (
		<div className='title-bar' onClick={()=>triggerInvDiv('')}>
			<div className='slanted-div logo-div'></div>
			<div className='title-logo-container'>
				<MediaQuery minWidth={575}>
					<LogoFull className='title-logo'/>
				</MediaQuery>
				<MediaQuery maxWidth={574}>
					<Logo iconSize='30'/>
				</MediaQuery>
			</div>
			<div className='slanted-div current-div'></div>
			<div className='current-container'>
				<h3 className='current'>{current}</h3>
			</div>
			<div className='button-container'>
				<MediaQuery maxWidth={950}>
					<Controller>
						<Trigger>
							<div>
								<div data-tip='Menu' data-for='menu' data-offset="{'left': -10}" >
									<button 
										className='button' 
										style={{marginRight: '10px'}}
									>
										<Icon 
											icon='menu-4' 
											className='icon' 
											iconSize={26}
											color='cantoWhite'
										/>
									</button>
								</div>
								<ReactTooltip effect='solid' delayShow={1000} place='left' id='menu' type='light'/>
							</div>
						</Trigger>
						<PopOver>
							<PopOverNav navChange={navChange} />
						</PopOver>
					</Controller>
				</MediaQuery>
				<Controller>
					<Trigger>
						<div>
							<div data-tip='Profile Settings' data-for='user' data-offset="{'left': -10}">
								<button className='button'>
									<Icon 
										icon='user-3' 
										className='icon' 
										iconSize={26}
										color='cantoWhite'
									/>
								</button>
							</div>
							<ReactTooltip effect='solid' id='user' delayShow={1000} place='left' type='light'/>
						</div>
					</Trigger>
					<PopOver>
						<Settings />
					</PopOver>
				</Controller>
			</div>
		</div>
	);
}

export default connect(null, mapDispatchToProps)(TitleBar);