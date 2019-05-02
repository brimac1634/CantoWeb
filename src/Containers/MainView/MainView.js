import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import WordOfTheDay from './WordOfTheDay/WordOfTheDay';
import Learn from './Learn/Learn';
import { SwapSpinner } from "react-spinners-kit";

const mapStateToProps = (state, ownProps) => {
  return {
  	loading: state.loading.loading,
  }
}

const MainView = ({loading}) => {
	return (
		<div className='main-view'>
			<Switch>
				<Route 
					path='/search' 
					component={Search}
				/>
				<Route 
					path='/favorites' 
					component={Favorites}
				/>
				<Route 
					path='/word-of-the-day' 
					component={WordOfTheDay}
				/>
				<Route 
					path='/learn' 
					component={Learn}
				/>
				<Redirect 
					to='/search'
				/>
			</Switch>
			<div className='center-div'>
				<SwapSpinner
	                size={60}
	                color='#ff7a8a'
	                loading={loading}
	            />
            </div>
		</div>
	);
}

export default connect(mapStateToProps, null)(MainView);