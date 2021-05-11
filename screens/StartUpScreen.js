import React,{useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth';

const StartUpScreen= ({navigation})=>{
    
    const dispatch= useDispatch()

    useEffect(() => {
        const getCredential=async()=>{
        const userData= await AsyncStorage.getItem('credential')    
        if (!userData) {
            navigation.navigate('Auth')
            return
        }
        const {token, id, expiryDate }= JSON.parse(userData);
       
        const convertedData= new Date(expiryDate)
        if (!token || ! id ||  convertedData <= new Date()) {
            navigation.navigate('Auth')
            return
        } 
        dispatch(authenticate(token,id))
        navigation.navigate('Shop')
     }
        getCredential() 
     }, []) 



    return(
        <View>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    )
}


const styles = StyleSheet.create({

})

export default StartUpScreen;