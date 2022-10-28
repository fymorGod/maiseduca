import React from "react";
import { View, StyleSheet, } from 'react-native';
import { AppHeader } from "../../components/AppHeader";
import ChatApp from "./ChatApp";


export const Chats = () => {

    return (
    <View style={styles.Container}>
        <AppHeader/>
       <ChatApp/>
        
    </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    lista:{
        marginTop:10,
        alignItems: 'center'
    }
    

})