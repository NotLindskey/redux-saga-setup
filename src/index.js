import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

// my first saga
// watcher saga
function* watcherSaga() {}

const firstReducer = (state = 0, action) => {
	if (action.type === "BUTTON_ONE") {
		console.log("firstReducer state", state);
		console.log("Button 1 was clicked!");
		return state + 1;
	}
	return state;
};

const secondReducer = (state = 100, action) => {
	if (action.type === "BUTTON_TWO") {
		console.log("secondReducer state", state);
		console.log("Button 2 was clicked!");
		return state - 1;
	}
	return state;
};

const elementListReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_ELEMENTS":
			return action.payload;
		default:
			return state;
	}
};

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
	// This function is our first reducer
	// reducer is a function that runs every time an action is dispatched
	combineReducers({
		firstReducer,
		secondReducer,
		elementListReducer,
	}),
	applyMiddleware(sagaMiddleware, logger)
);

// allow watcher saga to start watching actions // configurations
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
	<Provider store={storeInstance}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
