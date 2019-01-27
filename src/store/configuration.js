import { combineReducers, createStore, compose } from 'redux';
import { reducer as networkReducer } from 'react-native-offline';
// import citiesReducer from './reducers/citites';






const rootReducer = combineReducers({
    // cities: citiesReducer,
    network: networkReducer
});


let composeEnhancers = compose;
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
}

const store = createStore(rootReducer, composeEnhancers());


export default store;