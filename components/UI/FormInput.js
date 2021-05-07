import React, {useEffect, useState} from 'react';
import {StyleSheet, View,Text,TextInput} from 'react-native';


const FormInput = (props)=>{
 
   const [inputValue, setInputValue] = useState(props.initialValue)
   const [isValid, setIsValid] = useState(props.initialValue? true:false) 
   const [isTouched, setIsTouched] = useState(false)
   
  

   const changeTextHandler=(text)=>{
        setInputValue(text)
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        setIsValid(isValid);
   }

   useEffect(() => {
        props.onChangeInput(inputValue,isValid)
   }, [inputValue,isValid])


    return(
        <View>
            <Text style={styles.controlHeader}>{props.label}</Text>
            <TextInput
            {...props} 
            style={styles.controlInput}
            value={inputValue}
            onBlur={()=>setIsTouched(true)}
            onChangeText={(text)=>changeTextHandler(text)}
           
            /> 
            {!isValid && isTouched&&<Text style={{color:'red'}}>Please enter valid text</Text>}   
        </View>
    )
}

const styles= StyleSheet.create({

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
})


export default FormInput;