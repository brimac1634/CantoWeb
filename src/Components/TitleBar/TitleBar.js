import React from 'react';
import './TitleBar.css';
import MediaQuery from 'react-responsive';
import LogoFull from '../LogoFull/LogoFull';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import Controller from '../../Containers/PopOver/Controller';
import Trigger from '../../Containers/PopOver/Trigger';
import PopOver from '../../Containers/PopOver/PopOver';
import Settings from '../Settings/Settings';
import PopOverNav from '../../Containers/NavBar/PopOverNav/PopOverNav';

const TitleBar = ({ current, signInToggle, userEmail, updateUser, navChange }) => {
	return (
		<div className='title-bar'>
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
							<button className='button'>
								<Icon 
									icon='menu-4' 
									className='icon' 
									width={26}
									color='cantoWhite'
								/>
							</button>
						</Trigger>
						<PopOver>
							<PopOverNav navChange={navChange} />
						</PopOver>
					</Controller>
				</MediaQuery>
				<Controller>
					<Trigger>
						<button className='button'>
							<Icon 
								icon='user-3' 
								className='icon' 
								width={26}
								color='cantoWhite'
							/>
						</button>
					</Trigger>
					<PopOver>
						<Settings 
							userEmail={userEmail} 
							signInToggle={signInToggle}
							updateUser={updateUser} 
						/>
					</PopOver>
				</Controller>
			</div>
		</div>
	);
}

export default TitleBar;