import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import WordOfTheDay from './WordOfTheDay/WordOfTheDay';
import Learn from './Learn/Learn';

const MainView = () => {
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
		</div>
	);
}

export default MainView;