import React, { Component } from 'react';
import { ReduxNetworkProvider } from 'react-native-offline';
import { MenuProvider } from 'react-native-popup-menu';
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import MainScreen from './src/Containers/Main';
import store from './src/store/configuration';

class MainScreenWithWrappedReduxNetworkProvider extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Provider store={store}>
          <ReduxNetworkProvider>
            <MenuProvider>
              <MainScreen />
            </MenuProvider>
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