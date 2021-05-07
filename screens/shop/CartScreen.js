import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/order';
import Card from '../../components/UI/Card';

const CartScreen = () => {

    const totalAmount = useSelector(state => state.cart.totalAmount)

    const dispatch = useDispatch()

    const cartItems = useSelector(state => {

        const itemsList = []
        for (const key in state.cart.items) {
            itemsList.push({
                id: key,
                title: state.cart.items[key].title,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return itemsList.sort((a, b) => a.id > b.id ? 1 : -1)

    })

    return (
        <View style={styles.container}>
            <Card style={styles.summaryContainer}>
                <View style={styles.summaryDetail}>
                    <Text style={styles.total}>Total:</Text>
                    <Text style={styles.price}>€{Math.round(100*totalAmount.toFixed(2))/100}</Text>
                </View>
                <Button
                    disabled={!cartItems.length}
                    color={Colors.accent} style={styles.summaryAction}
                    title='Order Now'
                    onPress={() => {
                        dispatch(addOrder(cartItems, totalAmount))
                    }}
                />
            </Card>
            <View>
                <FlatList data={cartItems}
                    renderItem={({ item }) =>
                        <CartItem
                            title={item.title}
                            sum={item.sum}
                            amount={item.quantity}
                            deleteItem={() => { dispatch(removeFromCart(item.id)) }}
                        />} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 10

    },
    summaryDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: '25%'
    },
    total: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginRight: 5
    },
    price: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold'
    }

})

export default CartScreen;