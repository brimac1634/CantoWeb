import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import WordOfTheDay from './WordOfTheDay/WordOfTheDay';
import Learn from './Learn/Learn';

const MainView = ({ userID }) => {
	return (
		<div className='main-view'>
			<Switch>
				<Route exact path='/' component={Search} userID={userID}/>
				<Route 
					path='/Favorites' 
					component={Favorites} 
					userID={userID}
				/>
				<Route 
					path='/WordOfTheDay' 
					component={WordOfTheDay} 
					userID={userID}
				/>
				<Route path='/Learn' component={Learn} userID={userID}/>
			</Switch>
		</div>
	);
}

export default MainView;