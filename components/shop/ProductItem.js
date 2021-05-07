import React from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Platform, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';


const ProductItem = ({ title, imageUrl, price, onCart, onDetail, children }) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
  

    return (
      
        <Card style={styles.itemContainer}>
        <View style={styles.rippleFix}>
            <TouchableCmp useForeground onPress={onDetail}>
                <View>
                    <View style={styles.imageContaier}>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>€{price}</Text>
                    </View>
                    <View style={styles.action}>
                        {children}
                    </View>
                </View>
            </TouchableCmp>
        </View>
        </Card>
     
    )
}

const styles = StyleSheet.create({
    
    rippleFix:{
        overflow:'hidden',
        height:'100%',
        borderRadius:10
    },
    
    itemContainer: {
        height: 300,
        margin:10,
    
    },

    imageContaier: {
        height: '60%',
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    details: {
        alignSelf: 'center',
        alignItems: 'center',
        height: '15%',
        justifyContent: 'space-around',
        marginTop: 5,

    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: '25%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'green'
    }

})

export default ProductItem;