import React,{useCallback, useEffect, useReducer} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../components/UI/FormInput';
import HeaderButton from '../../components/UI/HeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products';


const EditUserProductsScreen = ({navigation})=>{

   const pid = navigation.getParam('productID');
   
   const product= useSelector(state=> state.products.userProducts.find(prod=> prod.id===pid))
  
   const dispatchRedux= useDispatch();
   

   const initialState= pid? {
    inputValues:{  
        title:product.title,
        imageUrl:product.imageUrl,
        description:product.description,
    },
    inputValidation:{
        title:true,
        imageUrl:true,
        description:true
    }
   }:
   {
   inputValues:{    
        title:'',
        imageUrl:'',
        description:'',
        price:'',
   },
   inputValidation:{
    title:false,
    imageUrl:false,
    description:false,
    price:false
   }
   }

   const formReducer= (state, action)=>{
        switch (action.type) {
            
            case 'update_input_field':
            
                    const updatedInputValues= {...state.inputValues,[action.payload.label]: action.payload.value }
                    const updatedInputValidation={...state.inputValidation,[action.payload.label]:action.payload.validity}
                    return {...state, inputValues: updatedInputValues,inputValidation:updatedInputValidation }
                    
            default:
                return state
        }
        
   }

   const [state, dispatch] = useReducer(formReducer, initialState)
    
   const onSubmit= useCallback(()=>{
    let formIsValid=true;
    for (const key in state.inputValidation) {
        formIsValid= formIsValid && state.inputValidation[key]
    }  
    if (!formIsValid) {
        return Alert.alert("Invalid input", "Please insert correct data",[{text:'okay'}])
    }
    dispatchRedux(pid? updateProduct(pid,state.inputValues): createProduct(state.inputValues))
    navigation.goBack()  
   
},[dispatch,state]);
   
   useEffect(() => {
    navigation.setParams({onSubmit})
    
   }, [onSubmit])

  


    return (
        <View style={styles.form}>
            <FormInput
                label={'Title'}
                initialValue={state.inputValues.title} 
                onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'title',value:text, validity:isValid }})}
                autoCapitalize={'sentences'}
                returnKeyType='next'
                required
            />
            <FormInput
                label={'ImageUrl'}
                initialValue={state.inputValues.imageUrl} 
                onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'imageUrl',value:text,validity:isValid}})}
                returnKeyType='next'
                required
            />
            <FormInput
                label={'Description'}
                initialValue={state.inputValues.description} 
                onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'description',value:text,validity:isValid}})}
                autoCapitalize={'sentences'}
                required
            />
            
            {!pid && 
                <FormInput
                label={'Price'}
                initialValue={state.inputValues.price} 
                onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'price',value:text,validity:isValid}})}
                keyboardType='decimal-pad' 
                min={1} 
            />
           }
        </View>
    )
};

const styles = StyleSheet.create({
    form:{
        margin:25
    },
    controlHeader:{
        fontFamily:'open-sans-bold'
    },
    controlInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingHorizontal:5,
        paddingVertical:10,
        marginBottom:10
    }
});

EditUserProductsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('productID')? "Edit Product":"Add Product",
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-checkmark' : "ios-checkmark"} onPress={navigation.getParam('onSubmit')} />
        </HeaderButtons>

    }
}


export default EditUserProductsScreen;