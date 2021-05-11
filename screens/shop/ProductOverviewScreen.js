import React, { useCallback, useEffect ,useState} from 'react';
import { StyleSheet, FlatList, View, Text, Platform, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import { loadProducts } from '../../store/actions/products';



const ProductOverViewScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const products = useSelector(state => state.products.avaliableProducts);
    const dispatch = useDispatch();
    
    const onDetail=(id,title)=>{
        navigation.navigate('ProductDetail', { productID: id, productTitle: title })
    }

    const fetchProducts= useCallback(async ()=>{
        
        try {
            await dispatch(loadProducts()); 
            setIsLoading(false)
            setIsRefreshing(false)
            setErrMsg(null)
        } catch (error) {
            console.log(error);
            setErrMsg('An error ocurred, please try again')
        }
        
    },[dispatch,setIsLoading])
     
    useEffect(() => {
        const listenerSub=navigation.addListener('willFocus',()=>{
            fetchProducts().then(()=> setIsLoading(false))
        })
        return () => {
            listenerSub.remove()
        }
    }, [fetchProducts])

    useEffect(() => {
       fetchProducts();
    }, [fetchProducts])


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
    
    if (!products.length) {
        return <View style={styles.centered}>
            <Text>No products found</Text>
        </View>
    }

    if (errMsg) {
        return <View style={styles.centered}>
            <Text>{errMsg}</Text>
            <Button title='Reload' onPress={()=>{
                fetchProducts()
            }} />
        </View>
    }

    return (
        <FlatList
            onRefresh={fetchProducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={({ item }) =>
            <ProductItem
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                onDetail={()=>onDetail(item.id,item.title)}>
                    <Button color={Colors.primary} title='View Details' onPress={()=>onDetail(item.id,item.title)} />
                    <Button color={Colors.primary} title='To Cart' onPress={()=>{dispatch(addToCart(item))}} />
            </ProductItem>
             } />
    )
}

ProductOverViewScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "All Products",
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : "ios-cart"} onPress={() => { navigation.navigate('Cart') }} />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-list' : "ios-list"} onPress={() => { navigation.toggleDrawer() }} />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProductOverViewScreen;