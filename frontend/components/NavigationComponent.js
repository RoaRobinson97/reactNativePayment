import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets  } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import LoginScreen from './LoginScreenComponent';
import MainScreen from './MainScreenComponent';
import SignUpScreen from './SignUpScreenComponent';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
       headerShown: false,
       ...TransitionPresets.SlideFromRightIOS,
    })
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Main',
       headerShown: false,  
       ...TransitionPresets.SlideFromRightIOS,
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'SignUp',
       headerShown: false,
       ...TransitionPresets.SlideFromRightIOS,
    })
  },
},
{
  initialRouteName: 'Login',
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class Navigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}




