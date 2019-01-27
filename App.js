import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from './src/Containers/Main';
import { ReduxNetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import store from './src/store/configuration';


class MainScreenWithWrappedReduxNetworkProvider extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Provider store={store}>
        <ReduxNetworkProvider>
          <MainScreen />
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreenWithWrappedReduxNetworkProvider
  }
});

export default createAppContainer(AppNavigator);