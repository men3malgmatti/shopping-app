import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


const CartItem = ({ amount, title, sum, deleteItem }) => {

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.amount}>{amount} </Text>
                <Text style={styles.itemText}>{title}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.itemText}>€{sum.toFixed(2)}</Text>
               {deleteItem &&
                <TouchableOpacity style={styles.trash} onPress={deleteItem}>
                    <Ionicons name='ios-trash' size={21} color={Colors.primary} />
                </TouchableOpacity>
               }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,

    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    trash: {
        marginLeft: 10
    },

    itemText: {
        fontFamily: 'open-sans-bold'
    },
    amount: {
        fontWeight: 'bold',
        color: Colors.primary
    }

})

export default CartItem;