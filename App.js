import React, { Component } from 'react';
import { ReduxNetworkProvider } from 'react-native-offline';
import { MenuProvider } from 'react-native-popup-menu';
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import MainScreen from './src/Containers/Main';
import configureStore from './src/store/configure-store';

class MainScreenWithWrappedReduxNetworkProvider extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isWaitingToInitializeStore: true,
      store: configureStore(() => this.setState({ isWaitingToInitializeStore: false })),
    };
  }

  render() {
    if (this.state.isWaitingToInitializeStore) return null;

    return (
      <Provider store={this.state.store}>
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