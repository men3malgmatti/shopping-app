import React, { useState } from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from '../shop/CartItem';
import Card from '../UI/Card';

const OrderItem = ({amount, date, items}) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <Card style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.amount}>€{amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.action}>
                <Button color={Colors.primary} title={showDetails?'Hide Details':'Show Details'} onPress={()=>{setShowDetails(!showDetails)}}/>
            </View>
            {showDetails&&<FlatList data={items} renderItem={({item})=> 
            <CartItem amount={item.quantity} sum={item.sum} title={item.title}/>}/>}
        </Card>
    )
}

const styles= StyleSheet.create({
    container:{
        margin: 20,
        padding:10
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    amount:{
        fontFamily:'open-sans-bold',
        color:Colors.primary
    },
    date:{
        fontFamily:'open-sans',
        color:'#888'
    },
    action:{
        alignSelf:'center'
    }
})

export default OrderItem;