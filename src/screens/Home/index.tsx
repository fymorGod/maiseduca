import React from "react";
import { Text, View, StyleSheet } from 'react-native';

export const Home = () => {
    return (
        <View style={styles.Container}>
            <Text>Home</Text>
            <View>
                <Text>
                    Teste
                </Text>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4263EB'
    },
    text: {
        color: "#fff",
    },

})