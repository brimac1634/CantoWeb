import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore()

ReactDOM.render((
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<Route path='/' component={App} />
			</Router>
		</ConnectedRouter>
	</Provider>
	), document.getElementById('root'));

serviceWorker.unregister();
