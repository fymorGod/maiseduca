import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { AppHeader } from "../../components/AppHeader";

export const Home = () => {
    return (
        <View style={styles.Container}>
            <AppHeader />
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
        backgroundColor: '#EDF2FF'
    },
    text: {
        color: "#fff",
    },

})