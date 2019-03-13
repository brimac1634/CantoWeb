import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './App';
import { Router, Route } from 'react-router-dom'
import { rootReducer } from './rootReducer';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const history = createHistory();
const store = createStore(rootReducer, applyMiddleware(logger, routerMiddleware(history)))


ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App} />
		</Router>
	</Provider>
	), document.getElementById('root'));

serviceWorker.unregister();
