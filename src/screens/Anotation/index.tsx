import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { AppHeader } from "../../components/AppHeader";

export const Anotation = () => {
    return (
        <View style={styles.Container}>
        <AppHeader/>
        <View>                
            
        </View>
    </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EDF2FF'
    },
    

})