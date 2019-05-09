import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from '../Search/Search';
import WordOfTheDay from '../WordOfTheDay/WordOfTheDay';
import Learn from '../Learn/Learn';
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
		const { SEARCH, WORD_OF_THE_DAY, LEARN, TRANSITION } = routes;
		const { location, location: { key } } = this.props

		return (
			<div className='main-view' style={{position: 'absolute'}}>
				<Route 
					location={location}
					render={() => (
						<TransitionGroup>
							<CSSTransition
								key={key}
					            timeout={TRANSITION}
					            classNames="fade"
				            >
								<Switch location={location}>
									<Route 
										path={SEARCH} 
										component={Search}
									/>
									<Route 
										path={WORD_OF_THE_DAY} 
										component={WordOfTheDay}
									/>
									<Route 
										path={LEARN} 
										component={Learn}
									/>
									<Redirect 
										to={SEARCH}
									/>
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, null)(MainView);