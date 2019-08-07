import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './redux/store';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render((
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<App />
			</div>
		</ConnectedRouter>
	</Provider>
	), document.getElementById('root'));

serviceWorker.unregister();
