import { combineReducers, createStore, compose } from 'redux';
import { reducer as networkReducer } from 'react-native-offline';
import languageReducer from './reducers/language';


const rootReducer = combineReducers({
    network: networkReducer,
    language: languageReducer
});


let composeEnhancers = compose;
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
}

const store = createStore(rootReducer, composeEnhancers());


export default store;