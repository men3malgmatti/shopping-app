import React from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({navigation})=>{

    const products= useSelector(state=> state.products.userProducts)
    
    const dispatch= useDispatch();
    
    const onDetail=(id)=>{
        navigation.navigate('Edit', { productID: id })
    }

    const deleteItemHandler=(id)=>{
        Alert.alert('Delete this item','Are you sure you want to delete this item?',
        [{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive', onPress:()=>{dispatch(deleteProduct(id))}}])
    }
    
     return (
        <FlatList
        data={products}
        renderItem={({ item }) =>
            <ProductItem
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                onDetail={()=>onDetail(item.id)}>
                    <Button color={Colors.primary} title='Edit' onPress={()=>onDetail(item.id)} />
                    <Button color={Colors.primary} title='Delete' onPress={()=>deleteItemHandler(item.id)} />
            </ProductItem>
            
            } />
    )
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Your Products",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-list' : "ios-list"} onPress={() => { navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-create' : "ios-create"} onPress={() => { navigation.navigate('Edit') }} />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({

});

export default UserProductsScreen;