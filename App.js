import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from './src/Containers/Main';
import { ReduxNetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import store from './src/store/configuration';
import { MenuProvider } from 'react-native-popup-menu';


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