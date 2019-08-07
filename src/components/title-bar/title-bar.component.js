import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import LogoFull from '../logo-full/logo-full.component';
import Logo from '../logo/logo.component';
import Icon from '../icon/icon.component';
import Controller from '../compound/controller.component';
import Trigger from '../compound/trigger.component';
import PopOver from '../pop-over/pop-over.component';
import Settings from '../settings/settings.component';
import NavMenu from '../nav-menu/nav-menu.component';

import { routes } from '../../redux/routing/routing.constants';

import './title-bar.styles.scss';

const mapStateToProps = (state, ownProps) => {
  return {
    pathName: state.router.location.pathname,
  }
}

const TitleBar = ({ pathName }) => {

	const { 
		ROOT,
		SEARCH, 
		RECENT, 
		FAVORITES, 
		WORD_OF_THE_DAY, 
		LEARN, 
		NEW_DECK,
		DECK,
		EDIT_DECK,
		LEARN_GAME,
		LOGIN,
		REGISTER,
		VERIFY,
		RESET,
		WHAT,
		CONTACT,
		PRIVACY,
		ADD,
		PROFILE,
		HOME
	} = routes;

	const banner = ((pathName) => {
		switch (pathName) {
			case HOME:
				return 'Home'
			case SEARCH:
				return 'Search'
			case RECENT:
				return 'Recent'
			case FAVORITES:
				return 'Favorites'
			case WORD_OF_THE_DAY:
				return 'Word Of The Day'
			case LEARN:
			case DECK:
			case EDIT_DECK:
			case LEARN_GAME:
				return 'Learn'
			case NEW_DECK:
				return 'New Deck'
			case LOGIN:
			case VERIFY:
			case RESET:
				return 'Login'
			case REGISTER:
				return 'Register'
			case WHAT:
				return 'What?'
			case CONTACT:
				return 'Contact'
			case PROFILE:
				return 'Profile'
			case PRIVACY:
				return 'Privacy'
			case ADD:
				return 'New'
			default:
				return ''
		}
	})(pathName)
	
	return (
		<MediaQuery maxWidth={574}>
			{(matches) => {
				return  <div className='title-bar'>
							<div className='slanted-div logo-div'></div>
							<div className='title-logo-container'>
								<Link to={ROOT} className='center-div'>
									<MediaQuery minWidth={575}>
										<LogoFull className='title-logo'/>
									</MediaQuery>
									<MediaQuery maxWidth={574}>
										<Logo iconSize='38'/>
									</MediaQuery>
								</Link>
							</div>
							<div className='slanted-div current-div'></div>
							<div className='current-container'>
								<MediaQuery maxWidth={574}>
									{(matches) => {
										return  <h3 className='current'>
													{matches && pathName === WORD_OF_THE_DAY 
														? 'W.O.D.'
														: banner}
												</h3>
									}}
								</MediaQuery>
							</div>
							<div className='button-container'>
								<Controller>
									<Trigger>
										<div>
											<button 
												className='button' 
												style={{marginRight: '10px'}}
											>
												<Icon 
													icon='menu-4' 
													className='icon' 
													iconSize={matches ? 30 : 26}
													color='cantoWhite'
												/>
											</button>
										</div>
									</Trigger>
									<PopOver>
										<NavMenu />
									</PopOver>
								</Controller>
								<Controller>
									<Trigger>
										<div>
											<button className='button'>
												<Icon 
													icon='user-3' 
													className='icon' 
													iconSize={matches ? 30 : 26}
													color='cantoWhite'
												/>
											</button>
										</div>
									</Trigger>
									<PopOver>
										<Settings />
									</PopOver>
								</Controller>
							</div>
						</div>
			}}
		</MediaQuery>
	);
}

export default connect(mapStateToProps, null)(TitleBar);