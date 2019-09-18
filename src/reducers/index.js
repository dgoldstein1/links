// redux utils
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// reducers in this directory
import appState from'./appStateReducer';

const Reducer = combineReducers({
	appState,
});

const logger = createLogger({
  collapsed : true,
  diff : true
})

const store = createStore(Reducer, applyMiddleware(logger));

export { store };
