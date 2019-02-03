import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
    createNetworkMiddleware, reducer as networkReducer, checkInternetConnection, offlineActionTypes
} from 'react-native-offline';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import photosReducer from './reducers/photos';
import videosReducer from './reducers/videos';
import languageReducer from './reducers/language';

import { networkTransform } from './configure-persist';


const persistConfig = {
    key: 'root',
    storage,
    transforms: [networkTransform],
    blacklist: ['network']
}

const networkMiddleware = createNetworkMiddleware();

const middlewares = [networkMiddleware, thunk];

const rootReducer = combineReducers({
    network: networkReducer,
    language: languageReducer,
    photos: photosReducer,
    videos: videosReducer
});

const persistanceReducer = persistReducer(persistConfig, rootReducer);



let composeEnhancers = compose;
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(persistanceReducer, composeEnhancers(applyMiddleware(...middlewares)));


export default function configureStore(callback) {
    persistStore(store, null, async () => {
        console.log('INVOKED1: 200');
        // After rehydration completes, we detect initial connection
        let isConnected = await checkInternetConnection('https://www.google.com/', 200);
        store.dispatch({
            type: offlineActionTypes.CONNECTION_CHANGE,
            payload: isConnected,
        });
        callback(); // Notify our root component we are good to go, so that we can render our app
    });

    return store;
}