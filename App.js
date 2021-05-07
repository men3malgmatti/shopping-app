import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import productReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import cartReducer from './store/reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';

export default function App() {

  const [isLoading, setIsLoading] = useState(true)

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }

  const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer
  })

  const store = createStore(rootReducer, composeWithDevTools(),applyMiddleware(ReduxThunk))


  if (isLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setIsLoading(false) }} onError={(err) => console.log(err)} />
  }


  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
