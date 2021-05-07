import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children, style})=>{

    return <View style={{...style,...styles.card}}>
        {children}
    </View>
}

const styles= StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
    }
})

export default Card;