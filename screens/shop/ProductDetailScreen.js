import React from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';

const ProductDetailScreen = ({ navigation }) => {

    const products = useSelector(state => state.products.avaliableProducts)

    const productId = navigation.getParam('productID');

    const product = products.find((product) => product.id === productId);

   const dispatch= useDispatch();

   
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: product.imageUrl }} />
                <View style={styles.actions}>
                    <Button color={Colors.primary} title='Add to cart' onPress={() => {dispatch(addToCart(product))}} />
                </View>
                <Text style={styles.price}>${(+product.price).toFixed(2)}</Text>
                <Text style={styles.discreption}>{product.description}</Text>
            </View>
        </ScrollView>
    )
}


ProductDetailScreen.navigationOptions = ({ navigation }) => {

    const productTitle = navigation.getParam('productTitle');

    return {
        title: productTitle
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    image: {
        height: 300,
        width: '100%'
    },

    actions: {
        marginVertical: 10
    },

    price: {
        color: 'green',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 18,
        marginVertical: 10
    },

    discreption: {
        fontSize: 16,
        marginHorizontal: 10,
        textAlign: 'center',
        fontFamily: 'open-sans'
    }

})

export default ProductDetailScreen;