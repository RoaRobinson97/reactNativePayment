import React, { Component } from 'react';
import store from './redux/store'
import { Provider } from 'react-redux'
import NavigationComponent from './components/NavigationComponent'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationComponent />
      </Provider>
    )
  }
}