import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Search from '../../pages/search/search.component';
import WordOfTheDay from '../../pages/word-of-day/word-of-day.component';
import Learn from '../../pages/learn/learn.component';
import NewDeck from '../../pages/new-deck/new-deck.component';
import DeckView from '../../pages/deck-view/deck-view.component';
import SignIn from '../../pages/sign-in/sign-in.component';
import LearnGame from '../../pages/learn-game/learn-game.component';
import Home from '../../pages/home/home.component';
import WhatIsCantoTalk from '../../pages/what-is-cantotalk/what-is-cantotalk.component';
import Profile from '../../pages/profile/profile.component';
import Contact from '../../pages/contact/contact.component';
import PrivacyPolicy from '../../pages/privacy-policy/privacy-policy.component';
import AddNewEntry from '../../pages/add-new-entry/add-new-entry.component'

import { routes } from '../../redux/routing/routing.constants';

import './main-view.styles.scss';

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.router.location,
  }
}

class MainView extends Component {

	shouldComponentUpdate(newProps) {
		const pathName = this.props.location.pathname
		const newPathName = newProps.location.pathname
		if (pathName === newPathName) {
			return false
		} else {
			return true
		}
	}

	render() {
		const { 
			HOME,
			LOGIN, 
			REGISTER,
			VERIFY,
			RESET,
			WHAT, 
			CONTACT,
			SEARCH, 
			WORD_OF_THE_DAY, 
			LEARN,
			LEARN_GAME,
			DECK,
			EDIT_DECK,
			NEW_DECK, 
			PROFILE,
			PRIVACY,
			ADD,
			TRANSITION 
		} = routes;
		const { location, location: { key } } = this.props

		return (
			<div className='main-view'>
				<Switch location={location}>
					<Route 
						path={[LOGIN, REGISTER, VERIFY, RESET]} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
				                    <SignIn />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={PROFILE} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
				                    <Profile />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={WHAT} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
				                    <WhatIsCantoTalk />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={CONTACT} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
				                    <Contact />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={SEARCH} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<Search />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={WORD_OF_THE_DAY} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<WordOfTheDay />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={[NEW_DECK, EDIT_DECK]} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<NewDeck />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={DECK} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<DeckView />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={LEARN_GAME} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<LearnGame />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={LEARN} 
						render={()=>(
							<TransitionGroup className='page'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<Learn />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={PRIVACY} 
						render={()=>(
							<TransitionGroup className='page over-flow'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<PrivacyPolicy />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={ADD} 
						render={()=>(
							<TransitionGroup className='page over-flow'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<AddNewEntry />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={HOME} 
						render={()=>(
							<TransitionGroup className='page-trans over-flow'>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<Home />
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						render={()=>(
							<Redirect to={HOME} />
						)}
					/>
				</Switch>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, null)(MainView);