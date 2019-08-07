import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory()

const initialState = {}
const middlewares = [routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger();
	middlewares.push(logger);
}

const store = createStore(
  createRootReducer(history),
  initialState,
  compose(
    applyMiddleware(...middlewares)
  ),
)

export default store