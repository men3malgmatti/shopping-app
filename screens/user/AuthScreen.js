import React, { useEffect, useReducer, useState } from 'react';
import {ActivityIndicator, Alert, Button, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import Card from '../../components/UI/Card';
import FormInput from '../../components/UI/FormInput';
import Colors from '../../constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../store/actions/auth';


const initialState= 
   {
   inputValues:{    
        email:'',
        password:''     
   },
   inputValidation:{
    email:false,
    password:false
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


const AuthScreen =({navigation})=>{


    const [state, dispatch] = useReducer(formReducer, initialState)
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(null)
    
    const dispatchRedux=useDispatch();

    const onSubmitHandler=async ()=>{
        setIsLoading(true)
        try {
            if (isSignIn) {
                await dispatchRedux(signIn(state.inputValues.email,state.inputValues.password))
            } else {
                await dispatchRedux(signUp(state.inputValues.email,state.inputValues.password))    
            } 
            setIsLoading(false)
            navigation.navigate('Shop')       
        } catch (error) { 
            setErr(error.message)
            setIsLoading(false)  
        }
            
    } 

    useEffect(() => {
        if (err) {
            Alert.alert('An error occur',err,[{text:'okay'}])            
        }
    }, [err])

    return(
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10} style={styles.container}>
        <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
           <Card style={styles.card}>
                <ScrollView>
                    <FormInput 
                    label='Email' 
                    email 
                    required 
                    onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'email',value:text, validity:isValid }})}/>
                    <FormInput 
                    label='Password' 
                    required 
                    minLength={5} 
                    onChangeInput={(text,isValid)=>dispatch({type:'update_input_field',payload:{label:'password',value:text, validity:isValid }})}/>
                    <View>
                        {isLoading? <ActivityIndicator size='small' color={Colors.primary} /> :
                        <Button title={isSignIn?'Log In': 'Sign Up' } color={Colors.primary} onPress={onSubmitHandler}/>
                        }
                        <Button title={`Switch to ${isSignIn? 'Sign Up ': 'Sign In'}` } color={Colors.accent}
                         onPress={()=>{setIsSignIn(currMode=> !currMode)}}   
                        />
                    </View>
                </ScrollView>
            </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    gradient:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    card:{
        width:'80%',
        padding:20,
        bottom:50
    },
    container:{
        flex:1
    }
})

AuthScreen.navigationOptions= {
    title: 'Log In'
}

export default AuthScreen;