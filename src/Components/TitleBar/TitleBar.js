import React from 'react';
import './TitleBar.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip'
import LogoFull from '../LogoFull/LogoFull';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import Controller from '../../Helpers/Compound/Controller';
import Trigger from '../../Helpers/Compound/Trigger';
import PopOver from '../../Containers/PopOver/PopOver';
import Settings from '../Settings/Settings';
import PopOverNav from '../../Containers/NavBar/PopOverNav/PopOverNav';
import {setMobileEntry} from '../../Containers/Search/actions';
import { routes } from '../../Routing/constants';

const mapStateToProps = (state, ownProps) => {
  return {
    pathName: state.router.location.pathname,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID))
	}
}

const TitleBar = ({ pathName, setMobileEntry }) => {

	const { SEARCH, RECENT, FAVORITES, WORD_OF_THE_DAY, LEARN, LOGIN } = routes;

	const banner = ((pathName) => {
		switch (pathName) {
			case SEARCH:
				return 'Search'
			case RECENT:
				return 'Recent'
			case FAVORITES:
				return 'Favorites'
			case WORD_OF_THE_DAY:
				return 'Word Of The Day'
			case LEARN:
				return 'Learn'
			case LOGIN:
				return 'Login'
			default:
				return ''
		}
	})(pathName)
	
	return (
		<div className='title-bar' onClick={()=>setMobileEntry('')}>
			<div className='slanted-div logo-div'></div>
			<div className='title-logo-container'>
				<Link to='/' className='center-div'>
					<MediaQuery minWidth={575}>
						<LogoFull className='title-logo'/>
					</MediaQuery>
					<MediaQuery maxWidth={574}>
						<Logo iconSize='30'/>
					</MediaQuery>
				</Link>
			</div>
			<div className='slanted-div current-div'></div>
			<div className='current-container'>
				<h3 className='current'>{banner}</h3>
			</div>
			<div className='button-container'>
				<MediaQuery maxWidth={950}>
					<Controller>
						<Trigger>
							<div>
								<div data-tip='Menu' data-for='menu' style={{height: '28px'}}>
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
							<PopOverNav />
						</PopOver>
					</Controller>
				</MediaQuery>
				<Controller>
					<Trigger>
						<div>
							<div data-tip='Profile Settings' data-for='user' style={{height: '28px'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);