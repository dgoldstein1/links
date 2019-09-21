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

let middleware = {}
if(process.env.REACT_APP_ENV === "development") {
	middleware = applyMiddleware(logger)
}


const store = createStore(Reducer, middleware);

export { store };
