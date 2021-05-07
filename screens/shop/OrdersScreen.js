import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/orders/OrderItem';

const OrdersScreen = () => {

    const orders = useSelector(state => state.orders.orders)


    return (
        <View>
            <FlatList data={orders} renderItem={({ item }) =>
             <OrderItem amount={item.amount} date={item.orderTime} items={item.items}/>} /> 
        </View>
    )
}

OrdersScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Your Orders",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-list' : "ios-list"} onPress={() => { navigation.toggleDrawer() }} />
        </HeaderButtons>

    }
}


const styles = StyleSheet.create({

})


export default OrdersScreen;