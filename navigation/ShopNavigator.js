import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import ProductOverViewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditUserProductsScreen from '../screens/user/EditUserProductScreen';

const defaultNavOpt = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ShopNavigator = createStackNavigator({
    ProductsOverView: {
        screen: ProductOverViewScreen
    },
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: config => (<Ionicons name='ios-cart' color={config.tintColor} size={23} />)
    }
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: config => (<Ionicons name='ios-list' color={config.tintColor} size={23} />)
    }
})

const AdminNavigator = createStackNavigator({
    Admin: UserProductsScreen,
    Edit: EditUserProductsScreen
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: config => (<Ionicons name='ios-create' color={config.tintColor} size={23} />)
    }
})

const shopDrawerNavigator = createDrawerNavigator({
    Shop: ShopNavigator,
    Order: OrdersNavigator,
    Admin:AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})


export default createAppContainer(shopDrawerNavigator);