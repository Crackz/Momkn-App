import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
    createNetworkMiddleware, reducer as networkReducer, checkInternetConnection, offlineActionTypes
} from 'react-native-offline';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import languageReducer from './reducers/language';
import { networkTransform } from './configure-persist';
import photosReducer from './reducers/photos';

export default function configureStore(callback) {

    const persistConfig = {
        key: 'root',
        storage,
        transforms: [networkTransform],
        blacklist: ['network']
    }

    const networkMiddleware = createNetworkMiddleware();


    const rootReducer = combineReducers({
        network: networkReducer,
        language: languageReducer,
        photos: photosReducer
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    let composeEnhancers = compose;
    if (__DEV__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
    }


    const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(networkMiddleware, thunk)));

    persistStore(store, null, () => {
        // After rehydration completes, we detect initial connection
        checkInternetConnection().then(isConnected => {
            console.log('ISCONNECT: ', isConnected, 'SS:', {
                type: offlineActionTypes.CONNECTION_CHANGE,
                payload: isConnected,
            })
            store.dispatch({
                type: offlineActionTypes.CONNECTION_CHANGE,
                payload: isConnected,
            });
            callback(); // Notify our root component we are good to go, so that we can render our app
        });
    });

    return store;
}