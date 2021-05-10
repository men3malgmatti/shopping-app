import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/orders/OrderItem';
import { loadOrders } from '../../store/actions/order';
import Colors from '../../constants/Colors';

const OrdersScreen = () => {

    const orders = useSelector(state => state.orders.orders)
    const [isLoading, setIsLoading] = useState(false);

    const dispatch= useDispatch();

    const fetchOrders= useCallback( async ()=>{
        await dispatch(loadOrders())
        setIsLoading(false)
    },[dispatch,loadOrders])

    useEffect(() => {
        setIsLoading(true)
        fetchOrders()
    }, [fetchOrders])

    if (isLoading) {
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>)
    }
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