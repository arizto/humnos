import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';  

import { createStore, applyMiddleware } from 'redux';  
import { Provider } from 'react-redux';  
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';  
import rootReducer from './rootReducer'


import App from './app';
//import AppIos from './appIos';
const logger = createLogger();
//const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);  
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);  
const store = createStoreWithMiddleware(rootReducer);


export default class Wrapper extends Component {  
  

  render() {

    
    return (
      
      <Provider store={store}>
        {
            (Platform.OS === 'android') ? <App /> : <App />
        }
      </Provider>
      
    );
    

  }
}
