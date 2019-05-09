import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from '../Search/Search';
import WordOfTheDay from '../WordOfTheDay/WordOfTheDay';
import Learn from '../Learn/Learn';
import SignIn from '../../Containers/SignIn/SignIn';
import WhatIsCantoTalk from '../../Components/WhatIsCantoTalk/WhatIsCantoTalk';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { routes } from '../../Routing/constants';

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
			LOGIN, 
			WHAT, 
			SEARCH, 
			WORD_OF_THE_DAY, 
			LEARN, 
			TRANSITION 
		} = routes;
		const { location, location: { key } } = this.props

		return (
			<div className='main-view' style={{position: 'absolute'}}>
				<Switch location={location}>
					<Route 
						path={LOGIN} 
						render={()=>(
							<TransitionGroup>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<div className='login-background'>
					                    <SignIn />
					                </div>
					            </CSSTransition>
							</TransitionGroup>
						)}
					/>
					<Route 
						path={WHAT} 
						render={()=>(
							<TransitionGroup>
								<CSSTransition
									key={key}
						            timeout={TRANSITION}
						            classNames="fade"
					            >
					            	<div className='login-background'>
					                    <WhatIsCantoTalk />
					                </div>
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
						render={()=>(
							<Redirect to={SEARCH} />
						)}
					/>
				</Switch>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, null)(MainView);