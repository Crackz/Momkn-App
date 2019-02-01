import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer as networkReducer, createNetworkMiddleware } from 'react-native-offline';
import languageReducer from './reducers/language';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}


const networkMiddleware = createNetworkMiddleware();


const rootReducer = combineReducers({
    network: networkReducer,
    language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
}

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(networkMiddleware, thunk)));

const persistor = persistStore(store)

export default store;

export { persistor }


