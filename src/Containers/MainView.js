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
				<Route 
					path='/' 
					component={Search}
				/>
				<Route 
					path='/Favorites' 
					component={Favorites}
				/>
				<Route 
					path='/WordOfTheDay' 
					component={WordOfTheDay}
				/>
				<Route 
					path='/Learn' 
					component={Learn}
				/>
			</Switch>
		</div>
	);
}

export default MainView;