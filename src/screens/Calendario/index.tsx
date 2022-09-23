import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { AppHeader } from "../../components/AppHeader";

export const Calendario = () => {
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