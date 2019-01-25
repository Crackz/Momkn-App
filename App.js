
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainScreen from './src/Containers/Main';


const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreen
  }
});

export default createAppContainer(AppNavigator);